// src/components/chat/VideoCallOverlay.jsx
import { useEffect, useRef, useState } from 'react';

const VideoCallOverlay = ({ localStream, remoteStream, onHangUp }) => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  // ---------- control states ----------
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  // Attach streams to video elements
  useEffect(() => {
    if (localRef.current && localStream) localRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (remoteRef.current && remoteStream) remoteRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  // ---------- toggle helpers ----------
  const toggleMic = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  const toggleSpeaker = () => {
    if (remoteRef.current) {
      remoteRef.current.muted = !remoteRef.current.muted;
      setSpeakerOn(!remoteRef.current.muted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Remote video (full‑screen background) */}
      <video
        ref={remoteRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Local video (picture‑in‑picture) */}
      <video
        ref={localRef}
        autoPlay
        muted
        playsInline
        className="absolute top-4 right-4 w-32 h-48 sm:w-48 sm:h-64 rounded-xl object-cover border-2 border-primary shadow-lg"
      />

      {/* Control bar (bottom center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {/* Mic toggle */}
        <button
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <i className={`fas ${micOn ? 'fa-microphone' : 'fa-microphone-slash'} text-white text-lg`}></i>
        </button>

        {/* Speaker toggle */}
        <button
          onClick={toggleSpeaker}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            speakerOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <i className={`fas ${speakerOn ? 'fa-volume-up' : 'fa-volume-mute'} text-white text-lg`}></i>
        </button>

        {/* Video toggle */}
        <button
          onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            videoOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <i className={`fas ${videoOn ? 'fa-video' : 'fa-video-slash'} text-white text-lg`}></i>
        </button>

        {/* Hang up */}
        <button
          onClick={onHangUp}
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition"
        >
          <i className="fas fa-phone-slash text-white text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCallOverlay;