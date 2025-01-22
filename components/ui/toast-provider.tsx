// components/ui/toast-provider.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  // Define the functions or states you'll use in your toast context
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<string[]>([]);

  const addToast = (message: string) => {
    setToasts((prevToasts) => [...prevToasts, message]);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Render your toasts here */}
      <div>
        {toasts.map((toast, index) => (
          <div key={index}>{toast}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
