import React from 'react';
import { motion } from 'framer-motion';
import { GlowingCard } from './ui/glowing-effect';

// Define the interface for StepCard props to include step data and index
interface StepCardProps {
  step: any;
  idx: number;
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

const StepCard: React.FC<StepCardProps> = ({ step, idx }) => {
  return (
    <motion.div variants={itemVariants}>
      <GlowingCard
        className="h-full group p-8 flex flex-col items-center text-center space-y-6 transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
        variant="default"
        glowIntensity={1.2}
      >
        <div
          className="relative w-24 h-24 rounded-2xl bg-slate-800/80 flex items-center justify-center text-5xl shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-500"
          style={{
            animation: `float-gentle 4s ease-in-out infinite`,
            animationDelay: `${idx * 0.8}s`
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{step.icon}</span>
        </div>
        <div className="space-y-3 transform transition-transform duration-500 group-hover:translate-z-10">
          <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mono opacity-70 group-hover:opacity-100">Step {idx + 1}</span>
          <h3 className="text-white font-black text-xl space-grotesk tracking-tight">{step.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
        </div>
      </GlowingCard>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Choose Your Context", desc: "Select HR, Marketing, or Academic to tailor the scan logic.", icon: "🎯" },
    { title: "Upload or Paste Text", desc: "Securely input document data or raw process logs.", icon: "📄" },
    { title: "AI Analyzes Patterns", desc: "Triangulating authorship signals through statistical archaeology.", icon: "🔍" },
    { title: "Review Insights", desc: "Download full forensic report with granular alignment data.", icon: "📊" }
  ];

  return (
    <section id="how-it-works-section" className="px-6 lg:px-16 max-w-7xl mx-auto space-y-20 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-6"
      >
        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase space-grotesk">How It Works</motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></motion.div>
        <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">Forensic auditing of authorship through a multi-layered signal triangulation framework.</motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {steps.map((step, idx) => (
          <StepCard key={idx} step={step} idx={idx} />
        ))}
      </motion.div>
    </section>
  );
};
