import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: '0.5rem'
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            backgroundColor: t.type === 'success' ? '#10B981' : 'var(--primary-color)',
            color: 'white', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)', fontWeight: '500', fontSize: '0.875rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {t.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
