import React, { useMemo, useState } from 'react';
import { FileText, Plane, ChevronRight, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';
import { COUNTRIES, flagOf } from '../data/countries';
import BlurText from './BlurText';
import SplitText from './SplitText';

export type EnquiryTab = 'visa' | 'travel';

interface EnquiryPageProps {
  initialTab?: EnquiryTab;
  prefill?: string;
  onNavigate: (tab: ActiveTab) => void;
  onSubmit: (tab: EnquiryTab, data: Record<string, string | string[]>) => void;
}

const todayISO = () => new Date().toISOString().split('T')[0];

/* ---------- small field primitives ---------- */
const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100';

const Field: React.FC<{ label: string; required?: boolean; hint?: string; children: React.ReactNode; full?: boolean }> = ({
  label,
  required,
  hint,
  children,
  full,
}) => (
  <label className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
      {label} {required && <span className="text-[#1e40af]">*</span>}
    </span>
    {children}
    {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
  </label>
);

const Section: React.FC<{ title: string; desc?: string; children: React.ReactNode }> = ({ title, desc, children }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.25)]">
    <h3 className="text-lg font-bold text-[#0f172a] font-playfair">{title}</h3>
    {desc && <p className="mt-1 text-xs text-slate-500">{desc}</p>}
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

export const EnquiryPage: React.FC<EnquiryPageProps> = ({ initialTab = 'travel', prefill = '', onNavigate, onSubmit }) => {
  const [tab, setTab] = useState<EnquiryTab>(initialTab);
  const [v, setV] = useState<Record<string, string | string[]>>({});
  const today = useMemo(todayISO, []);
  const set = (name: string, val: string | string[]) => setV((p) => ({ ...p, [name]: val }));
  const str = (name: string) => (typeof v[name] === 'string' ? (v[name] as string) : '');
  const arr = (name: string) => (Array.isArray(v[name]) ? (v[name] as string[]) : []);

  const toggle = (name: string, option: string) => {
    const cur = arr(name);
    set(name, cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option]);
  };

  const switchTab = (t: EnquiryTab) => {
    setTab(t);
    setV((p) => ({ ...p })); // keep shared answers, forms read what they need
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tab, v);
  };

  const Radio: React.FC<{ name: string; options: string[] }> = ({ name, options }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = str(name) === o;
        return (
          <button
            type="button"
            key={o}
            onClick={() => set(name, o)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              active
                ? 'border-[#1e40af] bg-[#1e40af] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );

  const Checks: React.FC<{ name: string; options: string[] }> = ({ name, options }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((o) => {
        const active = arr(name).includes(o);
        return (
          <button
            type="button"
            key={o}
            onClick={() => toggle(name, o)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold text-left transition ${
              active ? 'border-[#1e40af] bg-blue-50 text-[#1e40af]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <span
              className={`grid h-4 w-4 place-items-center rounded border ${
                active ? 'border-[#1e40af] bg-[#1e40af] text-white' : 'border-slate-300'
              }`}
            >
              {active && <ChevronRight className="h-3 w-3 rotate-90" />}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full bg-[#faf5f3]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a192f] to-[#0f2b5c] pt-32 pb-20 px-4 sm:px-6 lg:px-12 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#93c5fd] mb-3">Goto Holidays · Get in Touch</p>
        <BlurText
          as="h1"
          text="Get in Touch"
          animateBy="words"
          direction="top"
          delay={100}
          className="justify-center text-4xl sm:text-5xl lg:text-6xl font-playfair italic text-white drop-shadow-xl"
        />
        <SplitText
          tag="p"
          text="Tell us what you need — a visa filed end-to-end, or a holiday planned around you. One form, one dedicated specialist."
          splitType="words"
          delay={14}
          duration={0.8}
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
          className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-200 !block"
        />
      </section>

      {/* Tab switch */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.4)]">
          {(
            [
              { id: 'visa' as const, label: 'Visa Enquiry', Icon: FileText, note: 'Tourist · Business · Student · Work' },
              { id: 'travel' as const, label: 'Travel Enquiry', Icon: Plane, note: 'Packages · Custom trips · Groups' },
            ]
          ).map(({ id, label, Icon, note }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => switchTab(id)}
                className={`flex flex-col items-center gap-1 rounded-xl px-4 py-4 transition ${
                  active ? 'bg-[#1e40af] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]">
                  <Icon className="h-4 w-4" /> {label}
                </span>
                <span className={`text-[11px] ${active ? 'text-blue-100' : 'text-slate-400'}`}>{note}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* ---------- shared: who is enquiring ---------- */}
        <Section title="Your Details" desc="Who should we get back to?">
          <Field label="Full Name" required>
            <input required className={inputCls} value={str('fullName')} onChange={(e) => set('fullName', e.target.value)} placeholder="As per passport / ID" />
          </Field>
          <Field label="Email Address" required>
            <input required type="email" className={inputCls} value={str('email')} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Phone / WhatsApp" required hint="Include country code, e.g. +91 98765 43210">
            <input required className={inputCls} value={str('phone')} onChange={(e) => set('phone', e.target.value)} placeholder="+91 …" />
          </Field>
          <Field label="City & Country of Residence" required>
            <input required className={inputCls} value={str('residence')} onChange={(e) => set('residence', e.target.value)} placeholder="Chennai, India" />
          </Field>
          <Field label="Preferred Contact Method" required>
            <Radio name="contactMethod" options={['Email', 'Phone Call', 'WhatsApp']} />
          </Field>
          <Field label="Best Time to Contact You">
            <Radio name="contactTime" options={['Morning', 'Afternoon', 'Evening', 'Anytime']} />
          </Field>
        </Section>

        {/* ================= VISA ================= */}
        {tab === 'visa' && (
          <>
            <Section title="Visa Requirement" desc="The visa you want us to process.">
              <Field label="Destination Country (visa needed for)" required>
                <input required className={inputCls} value={str('visaCountry') || prefill} onChange={(e) => set('visaCountry', e.target.value)} placeholder="USA, UK, Schengen, Canada…" />
              </Field>
              <Field label="Visa Type / Purpose" required>
                <select required className={inputCls} value={str('visaType')} onChange={(e) => set('visaType', e.target.value)}>
                  <option value="">Select purpose…</option>
                  {['Tourist / Visitor', 'Business', 'Student', 'Work / Employment', 'Family / Dependent', 'Transit', 'Medical', 'Conference / Event', 'Other'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Nationality (passport country)" required>
                <select
                  required
                  className={inputCls}
                  value={str('nationality')}
                  onChange={(e) => set('nationality', e.target.value)}
                >
                  <option value="">Select country…</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {flagOf(c.code)} {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Passport Number" hint="Optional at enquiry stage">
                <input className={inputCls} value={str('passportNo')} onChange={(e) => set('passportNo', e.target.value)} placeholder="e.g. Z1234567" />
              </Field>
              <Field label="Passport Expiry Date">
                <input type="date" min={today} className={inputCls} value={str('passportExpiry')} onChange={(e) => set('passportExpiry', e.target.value)} />
              </Field>
              <Field label="Applicants" required hint="e.g. 2 adults, 1 child">
                <input required className={inputCls} value={str('visaApplicants')} onChange={(e) => set('visaApplicants', e.target.value)} placeholder="2 adults, 1 child" />
              </Field>
            </Section>

            <Section title="Travel & History" desc="Helps us assess eligibility and timelines.">
              <Field label="Intended Date of Travel" required hint="First entry date">
                <input required type="date" min={today} className={inputCls} value={str('visaTravelDate')} onChange={(e) => set('visaTravelDate', e.target.value)} />
              </Field>
              <Field label="Planned Duration of Stay" required>
                <input required className={inputCls} value={str('visaStay')} onChange={(e) => set('visaStay', e.target.value)} placeholder="e.g. 10 days" />
              </Field>
              <Field label="Any previous visa refusal?" required>
                <Radio name="visaRefusal" options={['No', 'Yes']} />
              </Field>
              {str('visaRefusal') === 'Yes' && (
                <Field label="Refusal details" full>
                  <input className={inputCls} value={str('visaRefusalDetails')} onChange={(e) => set('visaRefusalDetails', e.target.value)} placeholder="Country, year, reason if known" />
                </Field>
              )}
              <Field label="Travelled internationally before?" required>
                <Radio name="visaTravelledBefore" options={['Yes', 'No']} />
              </Field>
              <Field label="Do you have travel medical insurance?">
                <Radio name="visaInsurance" options={['Yes', 'No', 'Need help arranging']} />
              </Field>
              <Field label="Current Employment / Occupation">
                <input className={inputCls} value={str('occupation')} onChange={(e) => set('occupation', e.target.value)} placeholder="Software Engineer, Business Owner, Student…" />
              </Field>
            </Section>

            <Section title="Service You Need" desc="How much of the process should we handle?">
              <Field label="Assistance Level" required>
                <select required className={inputCls} value={str('visaService')} onChange={(e) => set('visaService', e.target.value)}>
                  <option value="">Select…</option>
                  {['End-to-end (forms, documents, appointment, interview prep)', 'Documentation review only', 'Appointment / slot booking only', 'Not sure — advise me'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred Submission / VFS City">
                <input className={inputCls} value={str('visaSubmitCity')} onChange={(e) => set('visaSubmitCity', e.target.value)} placeholder="Chennai, Bengaluru, Mumbai…" />
              </Field>
              <Field label="Anything else we should know?" full>
                <textarea rows={3} className={inputCls} value={str('visaMessage')} onChange={(e) => set('visaMessage', e.target.value)} placeholder="Group travel, urgent timeline, specific consulate, etc." />
              </Field>
            </Section>
          </>
        )}

        {/* ================= TRAVEL ================= */}
        {tab === 'travel' && (
          <>
            <Section title="Trip Details" desc="Where and when you want to go.">
              <Field label="Destination(s)" required>
                <input required className={inputCls} value={str('destination') || prefill} onChange={(e) => set('destination', e.target.value)} placeholder="Maldives, Dubai, Thailand…" />
              </Field>
              <Field label="Trip Type" required>
                <select required className={inputCls} value={str('tripType')} onChange={(e) => set('tripType', e.target.value)}>
                  <option value="">Select…</option>
                  {['Honeymoon', 'Family holiday', 'Friends / Group', 'Solo', 'Corporate / MICE', 'Adventure', 'Pilgrimage', 'Leisure / Getaway'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Departure City" required>
                <input required className={inputCls} value={str('departureCity')} onChange={(e) => set('departureCity', e.target.value)} placeholder="Chennai" />
              </Field>
              <Field label="Duration (nights)">
                <input className={inputCls} value={str('nights')} onChange={(e) => set('nights', e.target.value)} placeholder="e.g. 5" inputMode="numeric" />
              </Field>
              <Field label="Travel Start Date" required>
                <input required type="date" min={today} className={inputCls} value={str('startDate')} onChange={(e) => set('startDate', e.target.value)} />
              </Field>
              <Field label="Return Date" required>
                <input required type="date" min={str('startDate') || today} className={inputCls} value={str('endDate')} onChange={(e) => set('endDate', e.target.value)} />
              </Field>
              <Field label="Are your dates flexible?" required>
                <Radio name="flexibleDates" options={['Yes, ± a few days', 'No, fixed']} />
              </Field>
            </Section>

            <Section title="Travellers & Rooms" desc="Who is going?">
              <Field label="Adults (12+)" required>
                <input required className={inputCls} value={str('adults')} onChange={(e) => set('adults', e.target.value)} placeholder="2" inputMode="numeric" />
              </Field>
              <Field label="Children (2–11)">
                <input className={inputCls} value={str('children')} onChange={(e) => set('children', e.target.value)} placeholder="0" inputMode="numeric" />
              </Field>
              <Field label="Infants (under 2)">
                <input className={inputCls} value={str('infants')} onChange={(e) => set('infants', e.target.value)} placeholder="0" inputMode="numeric" />
              </Field>
              <Field label="Rooms Required" required>
                <input required className={inputCls} value={str('rooms')} onChange={(e) => set('rooms', e.target.value)} placeholder="1" inputMode="numeric" />
              </Field>
            </Section>

            <Section title="Preferences & Budget" desc="So we quote the right options first time.">
              <Field label="Budget per person" required>
                <select required className={inputCls} value={str('budget')} onChange={(e) => set('budget', e.target.value)}>
                  <option value="">Select range…</option>
                  {['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000+', 'Flexible / advise me'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Hotel Category" required>
                <Radio name="hotelCategory" options={['3★', '4★', '5★', 'Luxury / Resort']} />
              </Field>
              <Field label="Flights Required?" required>
                <Radio name="flightsNeeded" options={['Yes', 'No, land only']} />
              </Field>
              {str('flightsNeeded') === 'Yes' && (
                <Field label="Cabin Class">
                  <Radio name="cabinClass" options={['Economy', 'Premium Economy', 'Business']} />
                </Field>
              )}
              <Field label="Meal Plan" full>
                <Radio name="mealPlan" options={['Room only', 'Breakfast only', 'Half board', 'Full board', 'All-inclusive']} />
              </Field>
            </Section>

            <Section title="Add-ons & Interests" desc="Pick anything you'd like included.">
              <Field label="Include" full>
                <Checks
                  name="addOns"
                  options={[
                    'Airport transfers',
                    'Sightseeing tours',
                    'Adventure activities',
                    'Cruise / day trips',
                    'Local guide',
                    'Travel insurance',
                    'Visa assistance',
                    'SIM / Wi-Fi',
                  ]}
                />
              </Field>
              <Field label="Special requests" full hint="Dietary needs, accessibility, honeymoon / anniversary, celebrations, connecting rooms…">
                <textarea rows={3} className={inputCls} value={str('travelMessage')} onChange={(e) => set('travelMessage', e.target.value)} placeholder="Tell us anything that will make the trip perfect." />
              </Field>
            </Section>
          </>
        )}

        {/* consent + submit */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7">
          <label className="flex items-start gap-3 text-xs text-slate-600">
            <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#1e40af]" />
            <span>
              I agree that Goto Holidays may contact me about this enquiry by email, phone or WhatsApp. We never share your
              details with third parties.
            </span>
          </label>

          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold uppercase tracking-[0.12em] px-8 py-4 transition-colors cursor-pointer"
            >
              Submit {tab === 'visa' ? 'Visa' : 'Travel'} Enquiry <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <span className="sm:ml-auto flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Response within 24 hours
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
