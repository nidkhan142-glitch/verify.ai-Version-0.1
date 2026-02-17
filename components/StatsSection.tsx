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

export const StatsSection: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="px-6 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <motion.div variants={itemVariants}>
        <GlowingCard className="p-8 flex items-center gap-6" variant="default">
          <div className="text-3xl">👥</div>
          <div>
            <h4 className="text-2xl font-bold text-white">Used by Early Testers</h4>
          </div>
        </GlowingCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlowingCard className="p-8 flex items-center gap-6" variant="cyan">
          <div className="text-3xl text-yellow-500">⚡</div>
          <div>
            <h4 className="text-2xl font-bold text-white">500+ Analyses Completed</h4>
          </div>
        </GlowingCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlowingCard className="p-8 flex items-center gap-6" variant="emerald">
          <div className="text-3xl text-red-500">🛡️</div>
          <div>
            <h4 className="text-2xl font-bold text-white">Designed for Ethical Use</h4>
          </div>
        </GlowingCard>
      </motion.div>
    </motion.section>
  );
};
