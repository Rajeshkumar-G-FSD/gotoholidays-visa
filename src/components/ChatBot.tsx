import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, CheckCheck, Plane } from 'lucide-react';
import { CONTACT_INFO } from '../data/contact';
import {
  DESTINATION_PACKAGES,
  GLOBAL_PACKAGES,
  THAILAND_PACKAGES,
  VISA_SERVICES,
  VISA_DATA,
} from '../data/travelData';
import { buildRecord, saveEnquiry } from '../lib/enquiryStore';

/**
 * "Goto Holidays - Nishanth Chat" — a WhatsApp-styled guided assistant.
 *
 * Flow: time-based greeting -> Visa or Travel -> country / location ->
 * shares all relevant package / visa info from the site data -> collects
 * name, number, date & travellers -> hands the summary to the business
 * WhatsApp number and mirrors it into the enquiry store (admin console).
 *
 * Free-typed questions are always answered via a lightweight keyword
 * responder so every message gets a reply.
 */

const WA_NUMBER = CONTACT_INFO.whatsapp.replace(/\D/g, ''); // e.g. 919840454061

type Step =
  | 'category'
  | 'visaCountry'
  | 'travelLocation'
  | 'name'
  | 'phone'
  | 'date'
  | 'travellers'
  | 'done';

interface QuickReply {
  label: string;
  value: string;
}

interface Msg {
  id: string;
  from: 'bot' | 'user';
  text: string;
  time: string;
  options?: QuickReply[];
  wa?: string; // if set, render a "Continue on WhatsApp" button
}

const clock = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const timeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const uniqueLocations = Array.from(
  new Set([
    ...DESTINATION_PACKAGES.map((d) => d.name),
    ...GLOBAL_PACKAGES.map((g) => g.title),
  ])
);

/** Build one-or-more chat bubbles describing every package angle for a place. */
const describeLocation = (name: string): string[] => {
  const key = name.trim().toLowerCase();
  const dp = DESTINATION_PACKAGES.find((d) => d.name.toLowerCase() === key);
  const gp = GLOBAL_PACKAGES.find((g) => g.title.toLowerCase() === key);
  const out: string[] = [];

  if (dp) {
    out.push(`✨ *${dp.name}* ${dp.flag} — ${dp.tagline}\n\n${dp.description}`);
    out.push(
      `💰 Package Price: ${inr(dp.price)} per person  (was ${inr(dp.originalPrice)})\n` +
        `🗓️ Duration: ${dp.nights} Nights / ${dp.days} Days\n` +
        `🌤️ Best Time: ${dp.bestTime}\n` +
        `🛂 Visa: ${dp.visa}`
    );
    out.push(
      `🧭 Suggested Day-by-Day Plan:\n` +
        dp.roadmap.map((r) => `• ${r.day} — ${r.title}: ${r.desc}`).join('\n')
    );
  } else if (gp) {
    out.push(
      `✨ *${gp.title}* — ${gp.meta}\n\n💰 Starting from ${inr(gp.priceFrom)} per person, fully customisable.`
    );
  }

  if (key === 'thailand') {
    out.push(
      `🇹🇭 Popular Thailand Packages:\n` +
        THAILAND_PACKAGES.map(
          (p) =>
            `• ${p.title} (${p.duration}) — from ${inr(p.priceFrom)}\n   Includes: ${p.inclusions.join(', ')}`
        ).join('\n')
    );
  }

  if (!out.length) {
    out.push(
      `Great choice! We craft fully custom trips to *${name}* — flights, hand-picked stays, transfers, guided tours and 24/7 on-trip support. Share your details and our expert will send a tailored quote.`
    );
  }

  out.push(
    `Every package covers stay + daily breakfast, airport transfers, sightseeing and visa guidance. Flights, upgrades & add-on tours are optional. EMI / part-payment available.`
  );
  return out;
};

/** Build bubbles describing a country's visa service from the site data. */
const describeVisa = (country: string): string[] => {
  const key = country.trim().toLowerCase();
  const v = VISA_DATA.find(
    (x) =>
      x.country.toLowerCase().includes(key) ||
      key.includes(x.country.toLowerCase().split(' ')[0])
  );
  const s = VISA_SERVICES.find(
    (x) => x.title.toLowerCase().replace(' visa', '') === key
  );
  const out: string[] = [];

  if (v) {
    out.push(`🛂 *${v.country} Visa* — ${v.badgeType}\n\n${v.requirementSummary}`);
    out.push(
      `⏱️ Processing: ${v.processingTime}\n` +
        `💵 Fee: ${v.fee}\n` +
        `🗓️ Max Stay: ${v.maxStay}\n` +
        `📄 Documents: ${v.documentsNeeded.join(', ')}`
    );
    if (v.statusNotes) out.push(`⚠️ ${v.statusNotes}`);
  } else if (s) {
    out.push(
      `🛂 *${s.title}* — ${s.subtitle}\n✅ ${s.feature}\n\nOur team handles the full application: form filling, appointment booking, document review and submission.`
    );
  } else {
    out.push(
      `We process *${country}* visas end-to-end — document checklist, application, appointment booking and follow-up, with doorstep document pickup. Share your details for exact fees & timeline.`
    );
  }

  out.push(
    `We handle Tourist, Business, Student & Visit visas for 100+ countries with a 98%+ approval rate.`
  );
  return out;
};

/** Keyword responder so every free-typed message gets a useful reply. */
const answerFree = (text: string): string | null => {
  const t = text.toLowerCase();
  if (/\b(hi|hii|hello|hey|namaste|vanakkam|good (morning|afternoon|evening))\b/.test(t))
    return `${timeGreeting()}! 😊 How can I help — *Visa* or *Travel Package* information?`;
  if (/price|cost|cheap|budget|rate|fees|fee|quote|expensive/.test(t))
    return `Tour packages start from ${inr(10999)} per person (Andaman) and visa services from ₹1,999. Tell me the destination or country and I'll share exact pricing.`;
  if (/best time|when.*(go|visit|travel)|season|weather|climate/.test(t))
    return `Best travel window depends on the destination — Maldives & Dubai: Nov–Mar, Thailand & Bali: Nov–Apr, Sri Lanka: Dec–Mar, Kashmir: Mar–Oct. Which place are you planning?`;
  if (/document|docs|paper|checklist|require|proof/.test(t))
    return `For most tourist visas: passport (6 months validity + 2 blank pages), photos, 3–6 months bank statements, ITR, confirmed tickets & hotel booking. We share an exact checklist once you pick a country.`;
  if (/passport/.test(t))
    return `Passport must have at least 6 months validity and 2 blank pages. We also assist with fresh passport & renewal (Tatkal available).`;
  if (/honeymoon/.test(t))
    return `💑 Popular honeymoon picks: Maldives, Bali, Thailand (Honeymoon Special from ${inr(42999)}), Andaman & Lakshadweep — candle-light dinners, private tours & resort stays included.`;
  if (/emi|installment|instalment|pay later|part ?payment/.test(t))
    return `Yes — easy EMI & part-payment options are available on most international packages. Our expert will share the plan on WhatsApp.`;
  if (/office|address|located|branch|reach you/.test(t))
    return `📍 Chennai HQ: No 2/305, Puzhal Anthi Salai, J.J Nagar East, Mugappair East, Chennai 600037.\n📍 Nagercoil: 23-80A East Street, Kakamoor, Suchindrum, Kanyakumari 629704.`;
  if (/contact|phone|call|mobile|number|email|whatsapp/.test(t))
    return `☎️ ${CONTACT_INFO.phones.join(' / ')}\n📧 ${CONTACT_INFO.emails[0]}\n💬 WhatsApp: ${CONTACT_INFO.whatsapp}\n🕘 ${CONTACT_INFO.hours}`;
  if (/refund|cancel/.test(t))
    return `Cancellation & refunds follow the package terms — usually flexible up to 30 days before travel. Share your booking details and we'll help.`;
  if (/flight|air ?ticket|ticket|airfare/.test(t))
    return `Flights, visa, hotels & transfers can all be bundled. We also do stand-alone international air ticketing at the best fares.`;
  if (/insurance/.test(t))
    return `Travel insurance (medical + baggage + COVID, €30,000+ cover) is included on Schengen packages and optional elsewhere at low cost.`;
  if (/group|family|kids|children|couple/.test(t))
    return `We arrange family, group & corporate tours with child-friendly itineraries and connecting rooms. Group discounts apply for 6+ travellers.`;
  if (/visa/.test(t))
    return `We provide visa assistance for USA, UK, Schengen/Europe, Canada, Australia, Dubai, Singapore, Thailand & 100+ countries. Which country's visa do you need?`;
  if (/package|tour|trip|holiday|destination|travel/.test(t))
    return `We cover ${uniqueLocations.slice(0, 8).join(', ')} and more. Which destination are you interested in?`;
  if (/thank/.test(t))
    return `You're welcome! 🙏 Our expert will reach out shortly. Have a wonderful day!`;
  return null;
};

/** Render *bold* markers inside a bubble. */
const renderText = (text: string) =>
  text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.length > 1 && part.startsWith('*') && part.endsWith('*') ? (
      <strong key={i}>{part.slice(1, -1)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const DOODLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42'%3E%3Cg fill='%23d9d0c4' fill-opacity='0.45'%3E%3Ccircle cx='5' cy='6' r='1.6'/%3E%3Ccircle cx='26' cy='19' r='1.6'/%3E%3Ccircle cx='15' cy='34' r='1.6'/%3E%3Ccircle cx='37' cy='31' r='1.6'/%3E%3C/g%3E%3C/svg%3E\")";

export const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<Step>('category');

  const form = useRef({
    category: '' as '' | 'visa' | 'travel',
    subject: '',
    name: '',
    phone: '',
    date: '',
    travellers: '',
  });

  const queue = useRef<Msg[]>([]);
  const running = useRef(false);
  const started = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<Step>('category');
  stepRef.current = step;

  useEffect(() => {
    const id = window.setTimeout(() => setShowTip(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const flush = () => {
    if (running.current) return;
    if (!queue.current.length) {
      setTyping(false);
      return;
    }
    running.current = true;
    setTyping(true);
    const step = () => {
      const next = queue.current.shift();
      if (!next) {
        running.current = false;
        setTyping(false);
        return;
      }
      const delay = Math.min(1200, 450 + next.text.length * 9);
      window.setTimeout(() => {
        setMessages((m) => [...m, next]);
        step();
      }, delay);
    };
    step();
  };

  const botSay = (
    items: Array<{ text: string; options?: QuickReply[]; wa?: string }>
  ) => {
    const msgs: Msg[] = items.map((it, idx) => ({
      id: `${Date.now()}-b${idx}-${Math.random().toString(36).slice(2, 6)}`,
      from: 'bot',
      text: it.text,
      time: clock(),
      options: it.options,
      wa: it.wa,
    }));
    queue.current.push(...msgs);
    flush();
  };

  const userSay = (text: string) => {
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-u-${Math.random().toString(36).slice(2, 6)}`, from: 'user', text, time: clock() },
    ]);
  };

  const greet = () => {
    botSay([
      { text: `${timeGreeting()}! 👋` },
      {
        text: `Welcome to *Goto Holidays & Visa*. I'm *Nishanth*, your travel & visa assistant.`,
      },
      {
        text: `What information are you looking for today?`,
        options: [
          { label: '🛂 Visa Information', value: 'visa' },
          { label: '✈️ Travel / Package Info', value: 'travel' },
        ],
      },
    ]);
  };

  const openChat = () => {
    setOpen(true);
    setShowTip(false);
    if (!started.current) {
      started.current = true;
      greet();
    }
  };

  const chooseVisa = () => {
    form.current.category = 'visa';
    setStep('visaCountry');
    botSay([
      { text: `Great! ✅ We offer visa assistance for 100+ countries with a 98%+ success rate.` },
      {
        text: `Which country's visa do you need?`,
        options: [
          ...VISA_SERVICES.map((v) => {
            const n = v.title.replace(' Visa', '');
            return { label: n, value: n };
          }),
          { label: 'Other country', value: '__other__' },
        ],
      },
    ]);
  };

  const chooseTravel = () => {
    form.current.category = 'travel';
    setStep('travelLocation');
    botSay([
      { text: `Awesome! 🌍 We design custom holidays — flights, stays, transfers, tours & 24/7 support.` },
      {
        text: `Which destination are you interested in?`,
        options: [
          ...uniqueLocations.map((l) => ({ label: l, value: l })),
          { label: 'Other', value: '__other__' },
        ],
      },
    ]);
  };

  const askName = () => {
    setStep('name');
    botSay([{ text: `To prepare a personalised quote, may I have your *full name*?` }]);
  };

  const finish = () => {
    const f = form.current;
    const isVisa = f.category === 'visa';
    const first = f.name.split(' ')[0] || 'there';

    const summary =
      `✅ Thank you, ${first}! Here's your enquiry summary:\n\n` +
      `• Service: ${isVisa ? 'Visa Assistance' : 'Travel Package'}\n` +
      `• ${isVisa ? 'Country' : 'Destination'}: ${f.subject}\n` +
      `• Travel Date: ${f.date}\n` +
      `• Travellers: ${f.travellers}\n` +
      `• WhatsApp: ${f.phone}`;

    const waText =
      `Hello Goto Holidays & Visa! Enquiry via Nishanth Chat:\n\n` +
      `Service: ${isVisa ? 'Visa Assistance' : 'Travel Package'}\n` +
      `${isVisa ? 'Country' : 'Destination'}: ${f.subject}\n` +
      `Travel Date: ${f.date}\n` +
      `Travellers: ${f.travellers}\n` +
      `Name: ${f.name}\n` +
      `Mobile: ${f.phone}`;

    void saveEnquiry(
      buildRecord(isVisa ? 'visa' : 'travel', {
        fullName: f.name,
        phone: f.phone,
        email: '',
        residence: '',
        contactMethod: 'WhatsApp — Nishanth Chat',
        ...(isVisa
          ? { visaCountry: f.subject, visaTravelDate: f.date, visaApplicants: f.travellers }
          : { destination: f.subject, startDate: f.date, adults: f.travellers }),
        source: 'Nishanth Chatbot',
      })
    );

    botSay([
      { text: summary },
      {
        text: `Tap below to send this to our team on WhatsApp and get your detailed ${
          isVisa ? 'visa checklist & fees' : 'itinerary & quote'
        } in minutes 👇`,
        wa: waLink(waText),
      },
      {
        text: `Meanwhile, ask me anything — price, best time to visit, documents, inclusions, EMI options…`,
      },
    ]);
  };

  const route = (text: string) => {
    const t = text.toLowerCase();
    switch (stepRef.current) {
      case 'category': {
        if (/visa|passport/.test(t)) return chooseVisa();
        if (/travel|package|trip|tour|holiday|honeymoon|destination/.test(t))
          return chooseTravel();
        return botSay([
          { text: answerFree(text) ?? `I can help with two things 👇` },
          {
            text: `Please choose one:`,
            options: [
              { label: '🛂 Visa Information', value: 'visa' },
              { label: '✈️ Travel / Package Info', value: 'travel' },
            ],
          },
        ]);
      }
      case 'visaCountry': {
        form.current.subject = text.trim();
        botSay(describeVisa(text).map((x) => ({ text: x })));
        return askName();
      }
      case 'travelLocation': {
        form.current.subject = text.trim();
        botSay(describeLocation(text).map((x) => ({ text: x })));
        return askName();
      }
      case 'name': {
        if (!/[a-z]/i.test(text))
          return botSay([{ text: `Please type your name so our expert can address you correctly 🙂` }]);
        form.current.name = text.trim();
        setStep('phone');
        return botSay([
          {
            text: `Thanks ${form.current.name.split(' ')[0]}! 📱 What's your *WhatsApp number*? (add country code if outside India)`,
          },
        ]);
      }
      case 'phone': {
        if (text.replace(/\D/g, '').length < 8)
          return botSay([{ text: `That doesn't look right. Please re-enter your *mobile / WhatsApp number*.` }]);
        form.current.phone = text.trim();
        setStep('date');
        return botSay([
          { text: `📅 When are you planning to travel? (e.g. "15 Dec 2026", "Next month", or "Not decided")` },
        ]);
      }
      case 'date': {
        form.current.date = text.trim();
        setStep('travellers');
        return botSay([{ text: `👥 How many travellers? (e.g. "2 adults", "2 adults + 1 child")` }]);
      }
      case 'travellers': {
        form.current.travellers = text.trim();
        setStep('done');
        return finish();
      }
      case 'done': {
        const ans = answerFree(text);
        if (ans) return botSay([{ text: ans }]);
        return botSay([
          {
            text: `Good question! Our travel expert will answer that in detail — tap below to continue on WhatsApp 👇`,
            wa: waLink(`Hi, I have a question: ${text}`),
          },
        ]);
      }
    }
  };

  const handleQuick = (value: string, label: string) => {
    if (typing) return;
    if (value === 'visa') {
      userSay(label);
      return chooseVisa();
    }
    if (value === 'travel') {
      userSay(label);
      return chooseTravel();
    }
    if (value === '__other__') {
      userSay('Other');
      return botSay([
        {
          text:
            stepRef.current === 'visaCountry'
              ? `No problem — please *type the country name* you need a visa for.`
              : `Sure — please *type the destination* you'd like to visit.`,
        },
      ]);
    }
    userSay(label);
    route(value);
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput('');
    userSay(text);
    route(text);
  };

  const lastId = messages[messages.length - 1]?.id;

  return (
    <>
      {/* Launcher */}
      <div className="fixed z-50 right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col items-end gap-3">
        {showTip && !open && (
          <div className="animate-fade-in relative bg-white rounded-2xl rounded-br-sm shadow-xl border border-slate-100 px-4 py-3 max-w-[220px] text-[13px] text-slate-700">
            <button
              type="button"
              onClick={() => setShowTip(false)}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 text-slate-600 grid place-items-center text-[11px] hover:bg-slate-300"
            >
              <X className="w-3 h-3" />
            </button>
            👋 {timeGreeting()}! Need help with a <strong>visa</strong> or <strong>holiday package</strong>? Chat with Nishanth.
          </div>
        )}

        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/30 grid place-items-center hover:scale-105 active:scale-95 transition-transform"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
          )}
          <span className="relative">
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
          </span>
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed z-50 inset-x-3 bottom-3 top-3 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[600px] sm:max-h-[82vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-black/10 animate-fade-in">
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#128C7E] grid place-items-center shrink-0 ring-2 ring-white/20">
              <Plane className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                Goto Holidays - Nishanth Chat
              </p>
              <p className="text-[11px] text-emerald-100/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                {typing ? 'typing…' : 'online'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto p-1.5 rounded-full hover:bg-white/10 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5"
            style={{ backgroundColor: '#efeae2', backgroundImage: DOODLE }}
          >
            {messages.map((m) => {
              const isUser = m.from === 'user';
              const isLast = m.id === lastId;
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`animate-fade-in max-w-[82%] rounded-lg px-3 py-2 text-[13px] leading-snug shadow-sm whitespace-pre-wrap break-words ${
                      isUser
                        ? 'bg-[#dcf8c6] text-slate-800 rounded-br-sm'
                        : 'bg-white text-slate-800 rounded-bl-sm'
                    }`}
                  >
                    {renderText(m.text)}
                    <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                      {m.time}
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-sky-500" />}
                    </span>

                    {m.wa && (
                      <a
                        href={m.wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-lg py-2 text-[13px] font-semibold hover:brightness-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Continue on WhatsApp
                      </a>
                    )}
                  </div>

                  {isLast && !typing && m.options && (
                    <div className="mt-2 flex flex-wrap gap-2 justify-start">
                      {m.options.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => handleQuick(o.value, o.label)}
                          className="bg-white border border-[#075E54]/40 text-[#075E54] rounded-full px-3 py-1 text-xs font-medium shadow-sm hover:bg-[#075E54] hover:text-white transition-colors"
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {typing && (
              <div className="flex items-start">
                <div className="bg-white rounded-lg rounded-bl-sm px-3 py-2.5 shadow-sm flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={submit}
            className="bg-[#f0f0f0] px-2.5 py-2 flex items-center gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              aria-label="Type a message"
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-full bg-[#075E54] text-white grid place-items-center shrink-0 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
