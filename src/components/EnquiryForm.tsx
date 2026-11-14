import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const CLASS_OPTIONS = [
  'Nursery', 'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
];

const field =
  'w-full text-sm bg-slate-100 border border-transparent rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

interface EnquiryFormProps {
  onDone?: () => void;
}

// There is no server behind this form. Pressing the button opens WhatsApp with the
// enquiry already typed to the school's number, so the school really receives it.
export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onDone }) => {
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState(CLASS_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      `Parent / Guardian: ${parentName.trim()}`,
      `Phone: ${phone.trim()}`,
      studentName.trim() ? `Student name: ${studentName.trim()}` : '',
      `Class applying for: ${grade}`,
      message.trim() ? `Message: ${message.trim()}` : '',
    ].filter(Boolean);
    const lines = [`Hello ${SCHOOL_INFO.name}, I would like to enquire about admission.`, '', ...details];
    const url = `https://wa.me/${SCHOOL_INFO.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    setLink(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (link) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-black text-slate-900">Almost done: press Send in WhatsApp</h4>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
          We opened WhatsApp with your enquiry already written. Press <strong>Send</strong> there so it reaches the school office.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-3 rounded-full"
        >
          <MessageCircle className="w-4 h-4" /> Open WhatsApp again
        </a>
        <div>
          <button
            type="button"
            onClick={() => {
              setLink(null);
              onDone?.();
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
          >
            {onDone ? 'Close' : 'Write another enquiry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className={field} placeholder="Parent / guardian name *" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
      <input className={field} type="tel" inputMode="tel" placeholder="Phone number *" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input className={field} placeholder="Student name (optional)" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      <select className={field} value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Class applying for">
        {CLASS_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <textarea className={`${field} min-h-[90px]`} placeholder="Your question (optional)" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        type="submit"
        className="w-full bg-[#c8202f] hover:bg-[#a81a27] text-white font-bold text-sm py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span>Send Enquiry on WhatsApp</span>
      </button>
      <p className="text-[11px] text-slate-500 text-center">Opens WhatsApp with your message ready to send to {SCHOOL_INFO.phone}.</p>
    </form>
  );
};
