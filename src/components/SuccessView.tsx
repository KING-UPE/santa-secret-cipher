import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
export function SuccessView() {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-christmas-red-dark via-christmas-red to-christmas-red-light text-center p-6">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => <motion.div key={i} className="absolute" initial={{
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        scale: 0,
        rotate: 0
      }} animate={{
        y: -50,
        scale: [0, 1, 1, 0],
        rotate: 360,
        opacity: [0, 1, 1, 0]
      }} transition={{
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        ease: 'easeOut'
      }}>
            <Sparkles size={20 + Math.random() * 20} className="text-yellow-300 fill-yellow-300" />
          </motion.div>)}
      </div>

      <motion.div initial={{
      scale: 0.5,
      opacity: 0,
      y: 100
    }} animate={{
      scale: 1,
      opacity: 1,
      y: 0
    }} transition={{
      duration: 1,
      type: 'spring',
      bounce: 0.5
    }} className="relative z-10 mb-8">
        <motion.div animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8 border-4 border-white/50 shadow-2xl">
          <CheckCircle size={64} className="text-white" />
        </motion.div>

        <motion.h2 initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5
      }} className="text-5xl md:text-6xl font-calligraphy text-white mb-6 drop-shadow-lg">
          Wish Sealed!
        </motion.h2>
        <motion.p initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.7
      }} className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
          Your wish is sealed in Santa's vault until December 25th!
        </motion.p>
      </motion.div>

      <motion.div initial={{
      y: 50,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 1
    }} className="relative z-10">
        <button onClick={() => window.location.reload()} className="px-10 py-4 rounded-full bg-white hover:bg-gray-100 text-christmas-red font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105">
          Send Another Miracle
        </button>
      </motion.div>
    </motion.div>;
}