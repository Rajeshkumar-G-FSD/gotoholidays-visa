import React, { useEffect, useState } from 'react';
import { ActiveTab } from '../types';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminPageProps {
  onNavigate: (tab: ActiveTab) => void;
}

const SESSION_KEY = 'gh_admin_session';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === '1');
    } catch {
      /* ignore */
    }
  }, []);

  const login = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setAuthed(true);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onSuccess={login} onExit={() => onNavigate('home')} />;
  return <AdminDashboard onLogout={logout} />;
};
