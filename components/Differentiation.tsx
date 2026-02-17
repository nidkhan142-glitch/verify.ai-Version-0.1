import React from 'react';
import { motion } from 'framer-motion';
import { GlowingCard } from './ui/glowing-effect';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const Differentiation: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-12"
    >
      <motion.section variants={itemVariants}>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase space-grotesk">
          Categorical Differentiation
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          Existing tools are "guessers." Verify AI is an "auditor." We address the fundamental flaws of the first generation of detectors.
        </p>
      </motion.section>

      <motion.div variants={itemVariants} className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-6 px-6 text-slate-500 font-medium uppercase text-xs tracking-widest mono">Feature</th>
              <th className="py-6 px-6 text-red-400 font-medium uppercase text-xs tracking-widest mono bg-red-400/5">Generic Detectors</th>
              <th className="py-6 px-6 text-emerald-400 font-medium uppercase text-xs tracking-widest mono bg-emerald-500/5">Verify AI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[
              { f: "Core Metric", old: "Perplexity & Burstiness", new: "Forensic Artifacts & Behavioral Origin" },
              { f: "Vulnerability", old: "Easily bypassed by style prompts", new: "Resistant to stylistic manipulation" },
              { f: "Evidence Output", old: "A single AI % score", new: "Multi-signal audit trail" },
              { f: "Human Process", old: "Ignored completely", new: "Integrated (History, key-flow)" },
              { f: "High Stakes Use", old: "Dangerous (High FP)", new: "Optimized for Academic/Legal" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-300">{row.f}</td>
                <td className="py-4 px-6 text-slate-500">{row.old}</td>
                <td className="py-4 px-6 text-white font-medium">{row.new}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { title: "Heuristic vs. Forensic", desc: "Detectors look at *what* was said. We look at *how* it came to exist." },
          { title: "Static vs. Dynamic", desc: "Detectors analyze a snapshot. We analyze the trajectory of authorship." },
          { title: "Probabilistic vs. Deterministic", desc: "Detectors gamble on vibes. We provide structural proof of machine DNA." }
        ].map((item, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <GlowingCard className="p-6 h-full" variant="default">
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </GlowingCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
