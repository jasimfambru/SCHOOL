import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Calculator } from 'lucide-react';

interface FeePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeePaymentModal: React.FC<FeePaymentModalProps> = ({ isOpen, onClose }) => {
  const [selectedGrade, setSelectedGrade] = useState('Class I - V (Primary)');
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const feeStructures: Record<string, { tuition: string; lab: string; sports: string; total: string }> = {
    'Nursery / LKG / UKG': { tuition: '₹12,500', lab: '₹2,000', sports: '₹2,500', total: '₹17,000 / Term' },
    'Class I - V (Primary)': { tuition: '₹16,000', lab: '₹3,500', sports: '₹3,000', total: '₹22,500 / Term' },
    'Class VI - VIII (Middle)': { tuition: '₹19,500', lab: '₹5,000', sports: '₹3,500', total: '₹28,000 / Term' },
    'Class IX - X (Secondary)': { tuition: '₹24,000', lab: '₹6,500', sports: '₹4,000', total: '₹34,500 / Term' },
    'Class XI - XII (STEM & AI Track)': { tuition: '₹32,000', lab: '₹10,000', sports: '₹4,500', total: '₹46,500 / Term' },
  };

  const currentFee = feeStructures[selectedGrade] || feeStructures['Class I - V (Primary)'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-lg p-6 sm:p-8 text-slate-800 shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Fee Structure & Online Gateway
            </h3>
            <p className="text-xs text-slate-500">
              Transparent term fees with zero hidden charges
            </p>
          </div>
        </div>

        {isPaid ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">
              Fee Payment Successful!
            </h4>
            <p className="text-xs text-slate-600">
              Receipt No: <strong className="text-amber-600 font-mono">REC-2026-9901</strong>. A digital tax invoice has been sent to your registered parent email.
            </p>
            <button
              onClick={() => {
                setIsPaid(false);
                onClose();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-2xl shadow-md shadow-blue-500/20"
            >
              Download Receipt PDF
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Select Academic Grade / Class
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
              >
                {Object.keys(feeStructures).map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-slate-200/60 space-y-2.5 shadow-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tuition & Smart Classroom Fee</span>
                <span className="text-slate-900 font-semibold">{currentFee.tuition}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Robotics, AI & Computer Lab Fee</span>
                <span className="text-slate-900 font-semibold">{currentFee.lab}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Sports Complex & Activity Fee</span>
                <span className="text-slate-900 font-semibold">{currentFee.sports}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex justify-between text-sm font-bold">
                <span className="text-slate-800">Total Term Installment:</span>
                <span className="text-emerald-600 font-black text-base">{currentFee.total}</span>
              </div>
            </div>

            <button
              onClick={() => setIsPaid(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Pay Online via UPI / Credit Card / NetBanking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
