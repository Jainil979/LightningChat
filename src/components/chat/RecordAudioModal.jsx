// // src/components/chat/RecordAudioModal.jsx
// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const RecordAudioModal = ({ isOpen, onClose, onSend }) => {
//   const [recording, setRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [elapsed, setElapsed] = useState(0);

//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const chunksRef = useRef([]);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       stopTimer();
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(t => t.stop());
//       }
//     };
//   }, []);

//   const startTimer = () => {
//     stopTimer();
//     setElapsed(0);
//     timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
//   };

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;
//       const recorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = recorder;
//       chunksRef.current = [];

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) chunksRef.current.push(e.data);
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//         setAudioBlob(blob);
//         setAudioUrl(URL.createObjectURL(blob));
//         stream.getTracks().forEach(t => t.stop());
//         streamRef.current = null;
//       };

//       recorder.start();
//       setRecording(true);
//       setAudioBlob(null);
//       setAudioUrl(null);
//       startTimer();
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//       stopTimer();
//     }
//   };

//   const handleDelete = () => {
//     if (audioUrl) URL.revokeObjectURL(audioUrl);
//     setAudioBlob(null);
//     setAudioUrl(null);
//     setElapsed(0);
//   };

//   const handleSend = () => {
//     if (audioBlob) {
//       onSend(audioBlob);
//       onClose();
//       handleDelete();
//     }
//   };

//   const handleClose = () => {
//     if (recording) stopRecording();
//     handleDelete();
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           onClick={handleClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//             className="glass-effect rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl w-full max-w-sm text-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
//               <i className="fas fa-microphone text-dark-bg text-2xl"></i>
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-2">Voice Message</h2>
//             <p className="text-color text-sm mb-6">
//               {recording ? 'Recording…' : audioBlob ? 'Preview your message' : 'Tap to start recording'}
//             </p>

//             {recording && (
//               <div className="text-3xl font-mono text-primary mb-6">{formatTime(elapsed)}</div>
//             )}
//             {audioUrl && !recording && (
//               <div className="mb-6">
//                 <audio src={audioUrl} controls className="w-full" />
//               </div>
//             )}

//             <div className="flex justify-center gap-4">
//               {!recording && !audioBlob && (
//                 <button
//                   onClick={startRecording}
//                   className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition"
//                 >
//                   <i className="fas fa-microphone text-dark-bg text-xl"></i>
//                 </button>
//               )}
//               {recording && (
//                 <button
//                   onClick={stopRecording}
//                   className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition"
//                 >
//                   <i className="fas fa-stop text-white text-xl"></i>
//                 </button>
//               )}
//               {audioBlob && !recording && (
//                 <>
//                   <button
//                     onClick={handleDelete}
//                     className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 flex items-center justify-center transition"
//                   >
//                     <i className="fas fa-trash text-red-400"></i>
//                   </button>
//                   <button
//                     onClick={handleSend}
//                     className="w-12 h-12 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition"
//                   >
//                     <i className="fas fa-paper-plane text-dark-bg"></i>
//                   </button>
//                 </>
//               )}
//             </div>

//             <button onClick={handleClose} className="mt-6 text-gray-text hover:text-white transition-colors text-sm">
//               Cancel
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default RecordAudioModal;