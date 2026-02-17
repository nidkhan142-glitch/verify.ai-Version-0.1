import React from 'react';
import { motion } from 'framer-motion';
import { GlowingCard, GlowingBorder } from './ui/glowing-effect';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Engineering: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-16"
    >
      <motion.section variants={itemVariants}>
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mono mb-4">
          Phase 02: Component Engineering
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase space-grotesk">
          Process Evidence Engine (PEE)
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          The PEE is Verify AI's most critical forensic layer. It separates actual authorship from content generation by analyzing the temporal and behavioral artifacts of the creation event.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The 20% Deterministic Rule-Base */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <GlowingCard className="p-8" variant="emerald">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-emerald-400 font-black uppercase tracking-wider text-xs mono">Deterministic Layer (20%)</h3>
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20 mono font-bold">HARD-CODED LOGIC</span>
            </div>

            <div className="space-y-8">
              {[
                { t: "Instantaneous Payload Detection", d: "Identifies paste behavior where >50 characters appear in <10ms." },
                { t: "Biological Bound Validation", d: "Filters against the Human Maximum (approx. 150 WPM)." },
                { t: "Temporal Complexity Correlation", d: "Mapping inter-word pauses against word frequency (Zipf's Law)." },
                { t: "Jitter Integrity Audit", d: "Detects non-linear human jitter vs periodic machine signals." }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-white text-sm font-black flex items-center gap-2 uppercase tracking-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></span>
                    {item.t}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </GlowingCard>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3 mono">Evidence Integrity</h4>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              This layer is non-generative. Every flag raised must be accompanied by timestamp-validated deltas for third-party audit.
            </p>
          </div>
        </motion.div>

        {/* Right Column: The 80% Generative Intelligence */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <GlowingCard className="p-8" variant="default">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-blue-400 font-black uppercase tracking-wider text-xs mono">API-Assisted Analysis (80%)</h3>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 mono font-bold">LLM-POWERED ENGINE</span>
            </div>

            <div className="space-y-8">
              {[
                { n: "01", t: "Rhythm-Persona Alignment", d: "Determines if typing cadence matches linguistic complexity. Does a legal tone emerge with a novice rhythm?" },
                { n: "02", t: "Cognitive Revision Mapping", d: "Distinguishes between superficial typos and structural Rethinking of logic." },
                { n: "03", t: "Adversarial Log Verification", d: "Internal simulations to see if known bypass techniques can replicate the author's pattern." },
                { n: "04", t: "Cross-Model Consistency Audit", d: "Statistical interpretation of 'Model DNA' markers from state-of-the-art LLMs." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 font-black group-hover:border-blue-500/30 transition-colors">
                    {item.n}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1 group-hover:text-blue-200 transition-colors">{item.t}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlowingCard>

          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4 backdrop-blur-sm">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-blue-200 font-black text-xs uppercase tracking-tight mb-1">The Hybrid Advantage</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                By combining biological physical limits with linguistic reasoning, the PEE identifies even jittered AI content.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Internal Data Flow Visualizer */}
      <motion.div variants={itemVariants}>
        <GlowingCard className="p-10" variant="default" glowIntensity={0.5}>
          <h3 className="text-white font-black text-lg flex items-center gap-2 tracking-tight uppercase space-grotesk mb-10">
            PEE Logic Flow
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-500 mono font-bold">DATA_TRAJECTORY</span>
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between relative">
            <div className="z-10 bg-slate-900 border border-slate-700 p-5 rounded-xl w-full md:w-48 text-center shadow-2xl">
              <span className="block text-[8px] text-slate-500 mb-2 mono font-bold uppercase tracking-widest">RAW_INPUT</span>
              <span className="text-xs font-black text-white uppercase tracking-tight">Event Stream</span>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-slate-700 via-emerald-500/50 to-slate-700 animate-pulse"></div>
            <div className="z-10 bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl w-full md:w-48 text-center shadow-2xl">
              <span className="block text-[8px] text-emerald-500 mb-2 mono font-bold uppercase tracking-widest">VALIDATOR</span>
              <span className="text-xs font-black text-white uppercase tracking-tight">Rule-Base (20%)</span>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-slate-700 via-blue-500/50 to-slate-700 animate-pulse"></div>
            <div className="z-10 bg-blue-500/10 border border-blue-500/30 p-5 rounded-xl w-full md:w-48 text-center shadow-2xl">
              <span className="block text-[8px] text-blue-500 mb-2 mono font-bold uppercase tracking-widest">INTERPRETER</span>
              <span className="text-xs font-black text-white uppercase tracking-tight">LLM-Base (80%)</span>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-slate-700 via-emerald-500/50 to-slate-700 animate-pulse"></div>
            <div className="z-10 bg-emerald-500 border border-emerald-400 p-5 rounded-xl w-full md:w-48 text-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <span className="block text-[8px] text-black/60 mb-2 mono font-bold uppercase tracking-widest">OUTPUT</span>
              <span className="text-xs font-black text-black uppercase tracking-tight">Audit Trail</span>
            </div>
          </div>
        </GlowingCard>
      </motion.div>
    </motion.div>
  );
};
