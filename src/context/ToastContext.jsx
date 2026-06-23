
import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

// Simple ID generator – no library required
let nextId = 0;
const generateId = () => `toast-${nextId++}`;

const ToastItem = ({ message, type, onDismiss }) => (
  <div
    className={`toast ${type} show`}
    onClick={onDismiss}
  >
    <i className={`fas fa-${
      type === 'success' ? 'check-circle' :
      type === 'error' ? 'exclamation-circle' : 'info-circle'
    }`}></i>
    <span>{message}</span>
  </div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div id="toastContainer">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onDismiss={() => dismissToast(toast.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};