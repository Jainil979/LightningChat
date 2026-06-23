// src/components/chat/VoiceCallOverlay.jsx
import { useEffect, useRef, useState } from 'react';

const VoiceCallOverlay = ({ localStream, remoteStream, contactName, onHangUp }) => {
  const remoteAudioRef = useRef(null);
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  useEffect(() => {
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMic = () => {
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleSpeaker = () => {
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !remoteAudioRef.current.muted;
      setSpeakerOn(!remoteAudioRef.current.muted);
    }
  };

  // Determine connection status
  const isConnected = !!remoteStream;
  const statusText = isConnected ? 'Connected' : 'Calling…';
  const statusColor = isConnected ? 'text-green-400' : 'text-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
      <audio ref={remoteAudioRef} autoPlay playsInline />

      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-phone text-dark-bg text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-white">{contactName}</h2>
        <p className={`${statusColor} mt-2`}>{statusText}</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <i className={`fas ${micOn ? 'fa-microphone' : 'fa-microphone-slash'} text-white text-lg`}></i>
        </button>

        <button
          onClick={toggleSpeaker}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            speakerOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <i className={`fas ${speakerOn ? 'fa-volume-up' : 'fa-volume-mute'} text-white text-lg`}></i>
        </button>

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

export default VoiceCallOverlay;