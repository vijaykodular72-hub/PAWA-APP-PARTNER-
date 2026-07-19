import React from 'react';
import { ShieldAlert } from 'lucide-react';

const terms = [
  "No salary guarantee.",
  "No fake earning promise.",
  "Commission only on verified active shops.",
  "Commission only on successful Nexora platform revenue.",
  "Refunded, fraudulent, or cancelled transactions are not payable.",
  "Company can hold payouts for fraud review.",
  "Partner must follow brand policy.",
  "Company decision final for dispute and reward approval."
];

export default function GrowthPartnerTerms() {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Important Growth Share Terms</h2>
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {terms.map((term, i) => (
            <li key={i} className="text-sm font-semibold text-slate-700 flex items-start gap-3">
              <span className="text-slate-400 mt-1">●</span>
              {term}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
