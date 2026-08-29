import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  LogOut,
  FileText,
  Plane,
  Users,
  CalendarDays,
  ChevronDown,
  X,
  Inbox,
} from 'lucide-react';
import { EnquiryRecord } from '../types';
import { subscribeEnquiries } from '../lib/enquiryStore';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TypeFilter = 'all' | 'visa' | 'travel';

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};
const fmtDay = (v: string) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Kpi: React.FC<{ icon: React.ElementType; label: string; value: number; tint: string }> = ({
  icon: Icon,
  label,
  value,
  tint,
}) => (
  <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.25)]">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tint}`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="mt-3 text-2xl font-bold text-[#0f172a] font-playfair tabular-nums">{value}</p>
    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
  </div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [rows, setRows] = useState<EnquiryRecord[]>([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => subscribeEnquiries(setRows), []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (type !== 'all' && r.type !== type) return false;
      if (from && r.createdAt.slice(0, 10) < from) return false;
      if (to && r.createdAt.slice(0, 10) > to) return false;
      if (!needle) return true;
      return [r.name, r.email, r.phone, r.subject, r.residence, r.travellers]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, q, type, from, to]);

  const counts = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    return {
      total: rows.length,
      visa: rows.filter((r) => r.type === 'visa').length,
      travel: rows.filter((r) => r.type === 'travel').length,
      week: rows.filter((r) => new Date(r.createdAt).getTime() >= weekAgo).length,
    };
  }, [rows]);

  const hasFilters = q || type !== 'all' || from || to;

  return (
    <div className="min-h-screen w-full bg-[#faf5f3]">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#0a192f] to-[#0f2b5c] px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#93c5fd]">Goto Holidays</p>
            <h1 className="text-2xl sm:text-3xl font-playfair italic text-white">Enquiry Console</h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.12em] px-5 py-2.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi icon={Inbox} label="Total Enquiries" value={counts.total} tint="bg-blue-50 text-[#1e40af]" />
          <Kpi icon={FileText} label="Visa" value={counts.visa} tint="bg-indigo-50 text-indigo-600" />
          <Kpi icon={Plane} label="Travel" value={counts.travel} tint="bg-emerald-50 text-emerald-600" />
          <Kpi icon={CalendarDays} label="Last 7 Days" value={counts.week} tint="bg-amber-50 text-amber-600" />
        </div>

        {/* Filters */}
        <div className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.25)] flex flex-col lg:flex-row lg:items-end gap-4">
          <label className="flex-1 flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Search</span>
            <span className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, email, phone, destination…"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100"
              />
            </span>
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Type</span>
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
              {(['all', 'visa', 'travel'] as TypeFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.1em] transition ${
                    type === t ? 'bg-white text-[#1e40af] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">From</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">To</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {hasFilters && (
            <button
              onClick={() => {
                setQ('');
                setType('all');
                setFrom('');
                setTo('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 pb-3"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 font-semibold">
          Showing {filtered.length} of {rows.length} enquiries
        </p>

        {/* Table */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.25)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Guest</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Subject</th>
                  <th className="px-5 py-3.5">Travel Date</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center text-slate-400">
                      No enquiries match your filters yet.
                    </td>
                  </tr>
                )}
                {filtered.map((r) => (
                  <React.Fragment key={r.id}>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">{fmtDate(r.createdAt)}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
                            r.type === 'visa' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          {r.type === 'visa' ? <FileText className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
                          {r.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-[#0f172a]">{r.name || '—'}</p>
                        <p className="text-xs text-slate-400">{r.residence || '—'}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-slate-700">{r.email || '—'}</p>
                        <p className="text-xs text-slate-400">{r.phone || '—'}</p>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-[#0f172a]">{r.subject || '—'}</td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">{fmtDay(r.travelDate)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setOpen(open === r.id ? null : r.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.1em] text-[#1e40af] hover:text-[#1d4ed8]"
                        >
                          View <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === r.id ? 'rotate-180' : ''}`} />
                        </button>
                      </td>
                    </tr>
                    {open === r.id && (
                      <tr className="bg-slate-50/60">
                        <td colSpan={7} className="px-5 py-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                            {Object.entries(r.raw).map(([k, v]) => (
                              <div key={k} className="flex gap-2 text-xs">
                                <span className="font-bold uppercase tracking-[0.08em] text-slate-400 shrink-0">
                                  {k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}:
                                </span>
                                <span className="text-slate-700 break-words">
                                  {Array.isArray(v) ? v.join(', ') || '—' : v || '—'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Users className="w-3.5 h-3.5" /> Data syncs from Firestore when reachable, with a local cache fallback.
        </p>
      </div>
    </div>
  );
};
