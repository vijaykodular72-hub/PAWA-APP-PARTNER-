import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert,
  ArrowRight,
  Coins,
  Building2,
  TreeDeciduous,
  ArrowDown
} from 'lucide-react';

const ladderSteps = [
  { months: "1-6", rate: "10%", desc: "Initial Growth Phase" },
  { months: "7-12", rate: "5%", desc: "Maturity Phase" },
  { months: "12+", rate: "2%", desc: "Long-Term Passive" }
];

export default function RecurringGrowthShare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8" id="recurring-growth-share">
      <div className="max-w-[1400px] mx-auto space-y-24">
        
        {/* HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Recurring Growth Share Commission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold max-w-2xl mx-auto">
            Continue earning a share of Nexora Platform Revenue from the verified shops you onboard, following a transparent long-term commission ladder.
          </p>
        </motion.div>

        {/* COMMISSION LADDER */}
        <div className="grid md:grid-cols-3 gap-8">
          {ladderSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-4 hover:shadow-2xl hover:shadow-slate-300 transition-shadow"
            >
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider">{step.desc}</div>
              <div className="text-4xl font-black">{step.rate}</div>
              <div className="text-sm font-bold">Months {step.months}</div>
            </motion.div>
          ))}
        </div>

        {/* COMPARISON */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-rose-50 p-8 rounded-3xl border border-rose-100"
          >
            <XCircle className="w-8 h-8 text-rose-500 mb-4" />
            <h4 className="font-black text-slate-900 mb-2">Incorrect Understanding</h4>
            <p className="text-sm text-slate-600">Calculated from total customer bill or shop turnover.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
            <h4 className="font-black text-slate-900 mb-2">Correct Understanding</h4>
            <p className="text-sm text-slate-600">Calculated ONLY from Nexora Platform Revenue.</p>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8">Frequently Asked Questions</h3>
          {[
            { q: "Why does percentage reduce over time?", a: "To incentivize early activation and rapid platform onboarding." },
            { q: "Why isn't it based on customer bill?", a: "Commission is based on platform revenue, ensuring sustainability and fair sharing of earnings." }
          ].map((faq, i) => (
             <motion.div 
               key={i} 
               whileHover={{ scale: 1.01 }}
               className="bg-slate-50 p-6 rounded-2xl cursor-pointer"
             >
               <h4 className="font-bold">{faq.q}</h4>
               <p className="text-sm text-slate-600 mt-2">{faq.a}</p>
             </motion.div>
          ))}
        </motion.div>

        {/* POLICY BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-900 text-white p-8 rounded-3xl text-center"
        >
          <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
          <h4 className="text-xl font-black mb-2">Important Growth Share Policy</h4>
          <p className="text-sm opacity-80">Calculated ONLY from Nexora Platform Revenue. NEVER calculated from Customer Bill, Shop Revenue, or Shop Profit.</p>
        </motion.div>
      </div>
    </section>
  );
}