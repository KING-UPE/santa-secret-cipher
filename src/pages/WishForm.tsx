import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Calendar, X, Sparkles, Snowflake, Volume2, VolumeX } from 'lucide-react';
import { SnowEffect } from '../components/SnowEffect';
import { HeroSection } from '../components/HeroSection';
import { CountdownTimer } from '../components/CountdownTimer';
import { ProgressTimeline } from '../components/ProgressTimeline';
import { PhoneInput } from '../components/PhoneInput';
import { WishTextarea } from '../components/WishTextarea';
import { SuccessView } from '../components/SuccessView';
import { supabase } from '../lib/supabaseClient';

export function WishForm() {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [formData, setFormData] = useState({
    countryCode: '+94',
    phoneNumber: '',
    message: '',
    deliverAtMidnight: true
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08; 
      audioRef.current.play().catch(() => console.log("Music waiting for interaction."));
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    if (audioRef.current) audioRef.current.play();
  };

  // --- NEW VALIDATION LOGIC ---
  const validatePhoneNumber = () => {
    const cleanNumber = formData.phoneNumber.replace(/\D/g, ''); // Remove non-digits
    
    if (formData.countryCode === '+94') {
      // Sri Lankan mobile numbers are 9 digits (e.g., 771234567)
      if (cleanNumber.length !== 9) {
        alert("Sri Lankan phone numbers must be exactly 9 digits (e.g., 77XXXXXXX).");
        return false;
      }
    } else if (cleanNumber.length < 5) {
      alert("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic check
    if (!formData.phoneNumber || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    // 2. Sri Lanka specific validation
    if (!validatePhoneNumber()) return;
    
    setStatus('sending');

    try {
      const { error } = await supabase
        .from('wishes')
        .insert([
          { 
            phone_number: formData.phoneNumber.replace(/\D/g, ''), // Save clean digits
            country_code: formData.countryCode, 
            message: formData.message,
            delivered: false 
          },
        ]);

      if (error) throw error;

      setTimeout(() => {
        setStatus('success');
        setShowModal(false);
      }, 2500);

    } catch (error: any) {
      console.error('Error saving wish:', error.message);
      alert("Failed to send wish. Please try again.");
      setStatus('idle');
    }
  };

  if (status === 'success') return <SuccessView />;

  return (
    <div className="h-screen w-full bg-gradient-to-b from-christmas-red-dark via-christmas-red to-christmas-red-light relative overflow-hidden flex flex-col">
      <SnowEffect />
      
      <audio 
        ref={audioRef}
        loop 
        preload="auto"
        src="https://assets.mixkit.co/music/preview/mixkit-winter-forest-ambience-1215.mp3" 
      />

      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-2xl"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none select-none">
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1, duration: 1.5 }} className="absolute bottom-4 left-4 text-6xl md:text-8xl">🛷</motion.div>
        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1, duration: 1.5 }} className="absolute bottom-4 right-4 text-7xl md:text-9xl">🎄</motion.div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 flex-1 flex flex-col justify-between items-center max-w-4xl">
        <div className="w-full flex-1 flex flex-col justify-center">
          <HeroSection />
          <CountdownTimer />
        </div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-12">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenModal} 
            className="group relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl flex flex-col items-center justify-center border-8 border-white/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <Sparkles size={36} className="text-white mb-2" />
              <span className="text-white font-bold text-lg">Make a Wish</span>
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showModal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[50]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-45%' }} 
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }} 
                exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-45%' }} 
                className="fixed left-1/2 top-1/2 z-[55] w-[92%] max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden"
              >
                <div className="max-h-[85vh] overflow-y-auto p-6 md:p-10 scrollbar-hide">
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                    <X size={20} className="text-christmas-red" />
                  </button>
                  <h2 className="text-4xl font-calligraphy text-christmas-red mb-2 text-center">Your Secret Wish</h2>
                  <p className="text-gray-500 text-center mb-8">Sri Lankan Miracles for the World.</p>
                  
                  <ProgressTimeline />

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <PhoneInput 
                      value={formData.phoneNumber} 
                      onChange={val => setFormData({ ...formData, phoneNumber: val })} 
                      countryCode={formData.countryCode} 
                      onCountryChange={code => setFormData({ ...formData, countryCode: code })} 
                    />
                    <WishTextarea value={formData.message} onChange={val => setFormData({ ...formData, message: val })} />
                    <button type="submit" disabled={status === 'sending'} className="w-full py-5 rounded-2xl bg-christmas-red text-white font-bold text-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50">
                      {status === 'sending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <Snowflake className="animate-spin" />
                          <span>Sealing...</span>
                        </div>
                      ) : 'Seal the Miracle'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}