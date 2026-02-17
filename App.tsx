import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "./components/ui/background-paper-shaders";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { HowItWorks } from './components/HowItWorks';
import { TeamsSection } from './components/TeamsSection';
import { StatsSection } from './components/StatsSection';
import { AnalysisTool } from './components/AnalysisTool';
import { History } from './components/History';
import { AuthModals } from './components/AuthModals';
import { LimitReachedModal } from './components/LimitReachedModal';
import { supabase } from './supabase';

export enum AuthMode {
  NONE = 'NONE',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  LIMIT_REACHED = 'LIMIT_REACHED'
}

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.NONE);
  const [credits, setCredits] = useState<number>(0);
  const [guestCredits, setGuestCredits] = useState<number>(0);
  const analysisToolRef = useRef<any>(null);

  // Load guest credits on mount
  useEffect(() => {
    const storedGuestCredits = localStorage.getItem('guest_credits');
    if (storedGuestCredits) {
      setGuestCredits(parseInt(storedGuestCredits, 10));
    } else {
      localStorage.setItem('guest_credits', '2');
      setGuestCredits(2);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserCredits(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserCredits(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      const { data: newData } = await supabase
        .from('user_credits')
        .insert([{ user_id: userId, credits: 30 }])
        .select()
        .single();
      if (newData) setCredits(newData.credits);
    } else if (data) {
      setCredits(data.credits);
    }
  };

  const currentDisplayCredits = user ? credits : guestCredits;

  const scrollToSection = (id: string) => {
    if (id === 'analysis-section') {
      // Check credits before scrolling
      if (currentDisplayCredits < 2 && !user) {
        setAuthMode(AuthMode.LIMIT_REACHED);
        return;
      }
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthMode(AuthMode.NONE);
    setUser(null);
  };

  const handleUpdateCredits = () => {
    if (user) fetchUserCredits(user.id);
  };

  const handleUpdateGuestCredits = (newCredits: number) => {
    setGuestCredits(newCredits);
    localStorage.setItem('guest_credits', newCredits.toString());
  };

  const handleViewSample = () => {
    // Scroll to analysis section first
    scrollToSection('analysis-section');

    // Use the ref to trigger the sample report
    if (analysisToolRef.current) {
      analysisToolRef.current.runSample();
    }
  };

  const handleViewReport = (reportData: any, originalText: string) => {
    scrollToSection('analysis-section');
    if (analysisToolRef.current) {
      analysisToolRef.current.loadReport(reportData, originalText);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald-500/30 text-white flex flex-col">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: '#020617' }}
          dpr={[1, 2]}
        >
          <ShaderPlane
            position={[0, 0, 0]}
            color1="#020617" // Primary Base
            color2="#10b981" // Primary Glow
            color3="#064e3b" // Secondary Glow
            color4="#34d399" // Highlight
          />
        </Canvas>
      </div>

      <Header
        scrollToSection={scrollToSection}
        setAuthMode={setAuthMode}
        isLoggedIn={!!user}
        userName={user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''}
        credits={currentDisplayCredits}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col pt-8">
        <Hero onAnalyzeClick={() => scrollToSection('analysis-section')} onViewSample={handleViewSample} credits={currentDisplayCredits} />

        <div className="space-y-40 pb-32">
          <HowItWorks />
          <Manifesto />
          <TeamsSection />
          <StatsSection />

          <div id="analysis-section" className="px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-32">
            <AnalysisTool
              ref={analysisToolRef}
              user={user}
              credits={currentDisplayCredits}
              onUpdateCredits={handleUpdateCredits}
              guestCredits={guestCredits}
              onUpdateGuestCredits={handleUpdateGuestCredits}
              showLimitModal={() => setAuthMode(AuthMode.LIMIT_REACHED)}
            />
          </div>

          <div id="history-section" className="px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-32">
            <History user={user} onViewReport={handleViewReport} />
          </div>
        </div>
      </main>

      {(authMode === AuthMode.LOGIN || authMode === AuthMode.SIGNUP) && (
        <AuthModals mode={authMode as AuthMode.LOGIN | AuthMode.SIGNUP} setMode={setAuthMode} />
      )}
      {authMode === AuthMode.LIMIT_REACHED && (
        <LimitReachedModal onContinue={() => setAuthMode(AuthMode.SIGNUP)} onClose={() => setAuthMode(AuthMode.NONE)} />
      )}
    </div>
  );
};

export default App;