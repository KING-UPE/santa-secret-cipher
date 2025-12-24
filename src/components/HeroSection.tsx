import React from 'react';
import { motion } from 'framer-motion';
import { Gift, TreePine, Sparkles } from 'lucide-react';
export function HeroSection() {
  return <div className="text-center mb-12 relative">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-[120px] -z-10" />

      {/* Festive Icons Row */}
      <div className="flex justify-center items-center gap-8 mb-8">
        <motion.div animate={{
        rotate: [0, 10, -10, 0]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
            <Gift size={40} className="text-white" />
          </div>
          <motion.div animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="absolute -top-2 -right-2">
            <Sparkles size={20} className="text-yellow-300 fill-yellow-300" />
          </motion.div>
        </motion.div>

        <motion.div animate={{
        y: [-5, 5, -5]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-christmas-green to-christmas-green-light rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
            <TreePine size={48} className="text-white" />
          </div>
          <motion.div animate={{
          rotate: 360
        }} transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }} className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Sparkles size={24} className="text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.div>

        <motion.div animate={{
        rotate: [0, -10, 10, 0]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.5
      }} className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
            <Gift size={40} className="text-white" />
          </div>
          <motion.div animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1
        }} className="absolute -bottom-2 -left-2">
            <Sparkles size={20} className="text-yellow-300 fill-yellow-300" />
          </motion.div>
        </motion.div>
      </div>

      <motion.h1 initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.5,
      duration: 0.8
    }} className="text-6xl md:text-8xl font-calligraphy text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] mb-4">
        Send a Secret Miracle
      </motion.h1>

      <motion.p initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.8,
      duration: 0.8
    }} className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
        Santa's Anonymous Cipher
      </motion.p>
    </div>;
}