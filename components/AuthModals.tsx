import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthMode } from '../App';
import { supabase } from '../supabase';
import { GlowingCard } from './ui/glowing-effect';

interface AuthModalsProps {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

const formVariants: any = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const AuthModals: React.FC<AuthModalsProps> = ({ mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (!loading) setMode(AuthMode.NONE);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === AuthMode.SIGNUP) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");

        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          // Initialize credits (e.g., 30 free credits)
          await supabase.from('user_credits').insert({
            user_id: authData.user.id,
            credits: 30
          });
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (signInError) throw signInError;
      }
      setMode(AuthMode.NONE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md relative"
      >
        <GlowingCard className="p-8 relative overflow-hidden" variant="default" glowIntensity={1.2}>
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-8 relative z-10">
            <h2 className="text-3xl font-black text-center text-white uppercase space-grotesk tracking-tight">
              {mode === AuthMode.LOGIN ? 'Welcome Back' : 'Create Account'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {mode === AuthMode.SIGNUP && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === AuthMode.LOGIN ? '........' : 'Min 6 characters'}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  {mode === AuthMode.SIGNUP && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-tight"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] text-lg mt-4 disabled:opacity-50 uppercase tracking-widest active:scale-95"
              >
                {loading ? 'Processing...' : (mode === AuthMode.LOGIN ? 'Log In' : 'Create Account')}
              </button>
            </form>

            <div className="text-center space-y-4">
              {mode === AuthMode.SIGNUP && (
                <p className="text-slate-500 text-[10px] mono uppercase tracking-wider px-6">
                  Forensic integrity & secure access guaranteed.
                </p>
              )}
              <p className="text-slate-400 text-sm">
                {mode === AuthMode.LOGIN ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)}
                  className="text-emerald-500 font-black hover:underline"
                >
                  {mode === AuthMode.LOGIN ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </GlowingCard>
      </motion.div>
    </div>
  );
};
