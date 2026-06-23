// src/components/layout/ProvidersLayout.jsx
// import { Outlet } from 'react-router-dom';
// import { ToastProvider } from '../../context/ToastContext';
// import { AuthProvider } from '../../context/AuthContext';

// const ProvidersLayout = () => {
//   return (
//     <ToastProvider>
//       <AuthProvider>
//         <Outlet />
//       </AuthProvider>
//     </ToastProvider>
//   );
// };

// export default ProvidersLayout;






// import { Outlet } from 'react-router-dom';
// import { ToastProvider } from '../../context/ToastContext';
// import { AuthProvider } from '../../context/AuthContext';
// import useWebSocket from '../../hooks/useWebSocket';

// const ProvidersLayout = () => {
//   useWebSocket();   // starts/stops automatically with auth state

//   return (
//     <ToastProvider>
//       <AuthProvider>
//         <Outlet />
//       </AuthProvider>
//     </ToastProvider>
//   );
// };

// export default ProvidersLayout;






// src/components/layout/ProvidersLayout.jsx
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../../context/ToastContext';
import { AuthProvider } from '../../context/AuthContext';
import useWebSocket from '../../hooks/useWebSocket';

// Inner component that runs AFTER AuthProvider is mounted
const WebSocketManager = () => {
  useWebSocket();
  return null;   // no UI, just side effects
};

const ProvidersLayout = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <WebSocketManager />   {/* 👈 inside AuthProvider, so useAuth() works */}
        <Outlet />
      </AuthProvider>
    </ToastProvider>
  );
};

export default ProvidersLayout;