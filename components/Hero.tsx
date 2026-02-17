import React from 'react';
import { motion } from 'framer-motion';
import { GlowingBorder } from './ui/glowing-effect';

interface HeroProps {
  onAnalyzeClick: () => void;
  onViewSample: () => void;
  credits: number;
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any }
  }
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onViewSample, credits }) => {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15; // Max 15 degree tilt
    const y = (clientY / innerHeight - 0.5) * 15;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[80vh] flex items-center justify-center px-6 py-20 overflow-hidden text-center"
      style={{ perspective: '1000px' }}
    >
      {/* Background Static Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full flex flex-col items-center"
        style={{
          rotateY: rotate.x,
          rotateX: -rotate.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase space-grotesk leading-none">
            <span className="text-white block">Authenticity</span>
            <span className="text-emerald-500 block">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Evaluate writing patterns through an ethical, transparent lens.
            <span className="text-emerald-400 font-bold block mt-2">
              Shift from detection to insight with biological precision.
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full justify-center items-center"
        >
          <GlowingBorder className="w-full sm:w-auto">
            <button
              onClick={onAnalyzeClick}
              className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-2xl transition-all uppercase tracking-widest w-full shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95"
            >
              Analyze Now
            </button>
          </GlowingBorder>

          <button
            onClick={onViewSample}
            className="px-12 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-2xl border border-slate-800 transition-all uppercase tracking-widest w-full sm:w-auto hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] active:scale-95"
          >
            View Sample Report
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 inline-flex items-center gap-3 px-6 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-full shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-400 mono tracking-[0.2em] uppercase">
            {credits} Free Credits Available
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
