import React from 'react';
import { motion } from 'framer-motion';
import { AuthMode } from '../App';
import { cn } from '../lib/utils';

interface HeaderProps {
  scrollToSection: (id: string) => void;
  setAuthMode: (mode: AuthMode) => void;
  isLoggedIn: boolean;
  userName: string;
  credits: number;
  onLogout: () => void;
}

const navVariants: any = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const Header: React.FC<HeaderProps> = ({
  scrollToSection,
  setAuthMode,
  isLoggedIn,
  userName,
  credits,
  onLogout
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      // Threshold to hide navbar (e.g. 50px from top)
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] px-4 flex justify-center pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -40,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        className="flex items-center gap-2 sm:gap-4 bg-slate-900/40 backdrop-blur-2xl border border-emerald-500/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-emerald-500/40 hover:bg-slate-900/60 max-w-full relative group"
      >
        {/* Glow behind header */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Logo & Beta Group - Always Visible */}
        <motion.div
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 cursor-pointer group/logo shrink-0 relative z-10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black text-xs sm:text-lg font-black transition-transform group-hover/logo:rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.5)]">V</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black tracking-tighter text-white whitespace-nowrap">Verify AI</span>
            <span className="text-[8px] sm:text-[10px] font-bold bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-full border border-white/5 tracking-widest uppercase">BETA</span>
          </div>
        </motion.div>

        {/* Navigation Group - Hidden on Mobile */}
        <div className="hidden md:flex items-center shrink-0 relative z-10">
          <div className="w-px h-4 sm:h-6 bg-white/10 mx-2 shrink-0"></div>
          <nav className="flex items-center gap-4 lg:gap-6">
            <motion.button
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-widest whitespace-nowrap"
              onClick={() => scrollToSection('how-it-works-section')}
            >
              How it Works
            </motion.button>
            <motion.button
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-widest whitespace-nowrap"
              onClick={() => scrollToSection('analysis-section')}
            >
              Workspace
            </motion.button>
          </nav>
        </div>

        {/* Credits Pill - Hidden on Mobile */}
        <div className="hidden md:flex items-center shrink-0 relative z-10">
          <div className="w-px h-4 sm:h-6 bg-white/10 mx-2 shrink-0"></div>
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full group transition-all hover:bg-emerald-500/20 cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-emerald-400 mono tracking-widest uppercase whitespace-nowrap">{credits} Credits</span>
          </motion.div>
        </div>

        <div className="w-px h-4 sm:h-6 bg-white/10 mx-1 sm:mx-2 shrink-0 relative z-10"></div>

        {/* Auth Group - Always Visible */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 relative z-10">
          {isLoggedIn ? (
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 sm:gap-3 group/user cursor-pointer"
              onClick={onLogout}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-xs text-slate-400 border border-slate-700 transition-transform group-hover/user:scale-110 group-hover/user:border-emerald-500/50">
                {userName[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:block text-[10px] font-black text-slate-300 hover:text-red-400 uppercase tracking-widest transition-colors">Logout</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-5">
              <motion.button
                variants={navVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                onClick={() => setAuthMode(AuthMode.LOGIN)}
                className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Login
              </motion.button>
              <motion.button
                variants={navVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                onClick={() => setAuthMode(AuthMode.SIGNUP)}
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-emerald-500 text-black text-[10px] sm:text-xs font-black rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/40 active:scale-95 uppercase tracking-widest"
              >
                Join
              </motion.button>
            </div>
          )}
        </div>
      </motion.header>
    </div>
  );
};