import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../lib/firebase';
import BlurText from './BlurText';
import SplitText from './SplitText';

interface AdminLoginProps {
  onSuccess: () => void;
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onExit }) => {
  // Pre-filled for quick console access.
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect email or password.');
    }
  };

  const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#0a192f] to-[#0f2b5c] px-4 py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/images/goto_holidays.png"
            alt="Goto Holidays"
            className="mx-auto h-20 w-auto object-contain mb-5"
          />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-100">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Access
          </span>
          <BlurText
            as="h1"
            text="Goto Holidays Console"
            animateBy="words"
            direction="top"
            delay={90}
            className="justify-center mt-4 text-3xl sm:text-4xl font-playfair italic text-white"
          />
          <SplitText
            tag="p"
            text="Sign in to review visa and travel enquiries."
            splitType="words"
            delay={16}
            duration={0.7}
            from={{ opacity: 0, y: 14 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mt-2 text-sm text-slate-300 !block"
          />
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-white p-7 shadow-2xl space-y-4">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Email</span>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={inputCls}
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Password</span>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={inputCls}
              />
            </div>
          </label>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold uppercase tracking-[0.12em] py-3.5 transition-colors cursor-pointer"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExit}
            className="w-full text-center text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 transition-colors"
          >
            Back to site
          </button>
        </form>
      </div>
    </div>
  );
};
