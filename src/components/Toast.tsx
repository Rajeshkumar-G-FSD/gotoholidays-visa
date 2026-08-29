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
          className="pointer-events-auto bg-white border border-blue-200 rounded-2xl p-4 shadow-2xl shadow-blue-950/20 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300 ring-1 ring-blue-500/10"
        >
          <div className="mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-500" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-amber-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#1e40af]" />
            )}
          </div>
          <div className="flex-1 space-y-0.5">
            <h5 className="text-sm font-bold text-[#0f172a]">{toast.title}</h5>
            <p className="text-xs text-[#475569] leading-relaxed">{toast.description}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
