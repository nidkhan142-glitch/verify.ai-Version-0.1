import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingCard } from './ui/glowing-effect';

interface LimitReachedModalProps {
  onContinue: () => void;
  onClose: () => void;
}

export const LimitReachedModal: React.FC<LimitReachedModalProps> = ({ onContinue, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <GlowingCard className="p-10 text-center space-y-8 relative overflow-hidden" variant="emerald" glowIntensity={1.5}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              🔒
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white tracking-tight uppercase space-grotesk">Analysis Limit Reached</h2>
              <p className="text-slate-400 leading-relaxed">
                Login or sign up to continue analyzing and access your full suite of forensics.
              </p>
            </div>

            <button
              onClick={onContinue}
              className="w-full mt-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] text-lg uppercase tracking-widest active:scale-95"
            >
              Continue Analysing
            </button>
          </div>

          {/* Decorative glow line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
        </GlowingCard>
      </motion.div>
    </div>
  );
};
