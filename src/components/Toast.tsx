import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-panel border border-[#b8cbbc]/30 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="text-[#b8cbbc] mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-[#ffb4ab]" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#f4bb92]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#b8cbbc]" />
            )}
          </div>
          <div className="flex-1 space-y-0.5">
            <h5 className="text-sm font-bold text-white">{toast.title}</h5>
            <p className="text-xs text-[#c3c8c2] leading-relaxed">{toast.description}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
