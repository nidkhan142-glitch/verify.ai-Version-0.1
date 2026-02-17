import React from 'react';
import { motion } from 'framer-motion';
import { GlowingCard } from './ui/glowing-effect';

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

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Manifesto: React.FC = () => {
  return (
    <section className="px-6 lg:px-16 max-w-5xl mx-auto py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <GlowingCard className="p-1 md:p-1 overflow-hidden" variant="default" glowIntensity={0.8}>
          <div className="bg-[#020617]/40 backdrop-blur-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 rounded-[calc(1.5rem-1px)]">
            <motion.div variants={itemVariants} className="flex-1 space-y-6">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mono block">The Ethics Manifesto</span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase space-grotesk tracking-tighter leading-none">
                Transparency <br /> Over <br /> <span className="text-emerald-500">Authority</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-[1.5] space-y-8">
              <p className="text-slate-400 leading-relaxed text-lg font-medium italic">
                "Verify AI is built on the principle that AI analysis should assist humans, not replace them. We never present conclusions as facts."
              </p>

              <ul className="space-y-6">
                {[
                  { t: "Probabilistic Reporting", d: "Patterns, not proof. We highlight structural artifacts." },
                  { t: "Context-Aware", d: "Tailored for HR, Education, and Creative sectors." },
                  { t: "Non-Accusatory", d: "Professional, objective language that avoids bias." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="text-emerald-500 mt-1 font-black group-hover:translate-x-1 transition-transform">→</span>
                    <div>
                      <h4 className="text-white font-black uppercase text-xs tracking-widest mono">{item.t}</h4>
                      <p className="text-slate-500 text-sm mt-1">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </GlowingCard>
      </motion.div>
    </section>
  );
};
