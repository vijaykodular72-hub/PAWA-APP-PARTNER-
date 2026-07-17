import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trophy, 
  Share2, 
  Download, 
  Copy, 
  Check,
  PartyPopper,
  QrCode
} from 'lucide-react';
import { cn } from '../lib/utils';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  referralCode: string;
}

export default function WelcomeModal({ isOpen, onClose, partnerName, referralCode }: WelcomeModalProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nexora Growth Partner',
          text: `I've just joined Nexora as a Growth Partner! Use my code ${referralCode} to join.`,
          url: window.location.origin
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header / Celebration */}
            <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30"
              >
                <PartyPopper className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-black text-white tracking-tight">Welcome to the Team!</h2>
              <p className="text-indigo-100 text-sm mt-1 font-medium">You are now an official Nexora Growth Partner</p>
            </div>

            <div className="p-8">
              {/* Partner Card Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner ID Card</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{partnerName}</h3>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
                    Verified Partner
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Referral Code</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-indigo-600 tracking-tighter">{referralCode}</span>
                        <button 
                          onClick={handleCopy}
                          className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  Share Code
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                >
                  Go to Dashboard
                </button>
              </div>

              <button
                className="w-full mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-bold hover:text-indigo-600 transition-colors py-2"
                onClick={() => alert('Download feature would generate a high-res PNG of your ID card.')}
              >
                <Download className="w-3 h-3" />
                SAVE PARTNER CARD
              </button>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
