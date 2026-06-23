// src/router.jsx

import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ProvidersLayout from './components/layout/ProvidersLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    // This is the top‑level wrapper that provides auth + toast contexts
    element: <ProvidersLayout />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          // other authenticated/layout routes go here
        ],
      },
      // Routes without Navbar/Footer (signup, login, etc.)
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/chat', element: <Chat /> },
        ],
      }
    ],
  },
]);

export default router;