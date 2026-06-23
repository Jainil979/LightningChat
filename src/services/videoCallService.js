// src/services/videoCallService.js
import {
  encodeVideoSignalToTarget,
  VIDEO_OFFER, VIDEO_ANSWER, VIDEO_ICE, VIDEO_HANGUP,
} from '../utils/binaryProtocol.js';

export class VideoCallManager {
  constructor(sendFn, myUserId) {
    this.sendFn = sendFn;
    this.myUserId = myUserId;
    this.peerId = null;
    this.pc = null;
    this.localStream = null;
    this.onRemoteStream = null;   // callback: (stream) => void
    this.onLocalStream = null;    // callback: (stream) => void
    this.onCallEnded = null;      // callback: () => void
    this.onError = null;          // callback: (error) => void
    this.pendingOffer = null;     // stored when incoming call arrives
  }

  // ---------- Caller side ----------
  async startCall(peerId, myName = '', mediaType = 'video') {
    if (this.pc) return;
    this.peerId = peerId;
    try {
      const constraints = mediaType === 'voice'
        ? { audio: true, video: false }
        : { audio: true, video: true };
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.onLocalStream){
        this.onLocalStream(this.localStream);
      } 

      this.pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      for (const track of this.localStream.getTracks()) {
        this.pc.addTrack(track, this.localStream);
      }

      this.pc.ontrack = (event) => {
        if (this.onRemoteStream) this.onRemoteStream(event.streams[0]);
      };
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          const icePayload = JSON.stringify({
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          });
          this.sendFn(encodeVideoSignalToTarget(this.peerId, VIDEO_ICE, icePayload));
        }
      };

      const offer = await this.pc.createOffer();

      await this.pc.setLocalDescription(offer);

      // Include caller info and call type in the offer payload
      const offerPayload = JSON.stringify({
        sdp: offer,
        name: myName,
        userId: this.myUserId,
        callType: mediaType,            // 👈 voice or video
      });

      this.sendFn(encodeVideoSignalToTarget(this.peerId, VIDEO_OFFER, offerPayload));
    } catch (err) {
      this._cleanup();
      if (this.onError) this.onError(err);
    }
  }

  // ---------- Callee side ----------
  /** Receive an incoming offer – store it and return caller info */
  receiveOffer(senderId, payload) {
    if (this.pc || this.pendingOffer) return null; // already busy
    try {
      const data = JSON.parse(payload);
      this.pendingOffer = {
        senderId,
        sdp: data.sdp,
        name: data.name,
        userId: data.userId,
        callType: data.callType || 'video',   // 👈 default to video for backwards compatibility
      };
      return { name: data.name, userId: data.userId, callType: data.callType || 'video' };
    } catch {
      return null;
    }
  }

  /** Accept the pending offer – starts media and sends answer */
  async acceptIncomingCall() {
    if (!this.pendingOffer) return;
    const { senderId, sdp, callType } = this.pendingOffer;
    this.peerId = senderId;
    try {
      const constraints = callType === 'voice'
        ? { audio: true, video: false }
        : { audio: true, video: true };
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (this.onLocalStream) this.onLocalStream(this.localStream);

      this.pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      for (const track of this.localStream.getTracks()) {
        this.pc.addTrack(track, this.localStream);
      }

      this.pc.ontrack = (event) => {
        if (this.onRemoteStream) this.onRemoteStream(event.streams[0]);
      };
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          const icePayload = JSON.stringify({
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          });
          this.sendFn(encodeVideoSignalToTarget(this.peerId, VIDEO_ICE, icePayload));
        }
      };

      const offerDesc = new RTCSessionDescription(sdp);
      await this.pc.setRemoteDescription(offerDesc);
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      this.sendFn(encodeVideoSignalToTarget(this.peerId, VIDEO_ANSWER, JSON.stringify(answer)));

      this.pendingOffer = null;
    } catch (err) {
      this._cleanup();
      if (this.onError) this.onError(err);
    }
  }

  /** Decline the incoming call */
  declineIncomingCall() {
    if (this.pendingOffer) {
      this.sendFn(encodeVideoSignalToTarget(this.pendingOffer.senderId, VIDEO_HANGUP, '{}'));
      this.pendingOffer = null;
    }
    if (this.onCallEnded) this.onCallEnded();
  }

  // ---------- Existing handleSignal (for ICE, answer, hangup) ----------
  async handleSignal(senderId, subType, payload) {
    if (subType === VIDEO_ANSWER) {
      if (!this.pc) return;
      const answerDesc = JSON.parse(payload);
      await this.pc.setRemoteDescription(new RTCSessionDescription(answerDesc));
    } else if (subType === VIDEO_ICE) {
      if (!this.pc) return;
      const iceData = JSON.parse(payload);
      const candidate = new RTCIceCandidate({
        candidate: iceData.candidate,
        sdpMid: iceData.sdpMid,
        sdpMLineIndex: iceData.sdpMLineIndex,
      });
      await this.pc.addIceCandidate(candidate).catch(console.error);
    } else if (subType === VIDEO_HANGUP) {
      this._cleanup();
      if (this.onCallEnded) this.onCallEnded();
    }
  }

  hangUp() {
    if (this.pc && this.peerId) {
      this.sendFn(encodeVideoSignalToTarget(this.peerId, VIDEO_HANGUP, '{}'));
    }
    this._cleanup();
    if (this.onCallEnded) this.onCallEnded();
  }

  _cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    this.pendingOffer = null;
    this.peerId = null;
  }
}