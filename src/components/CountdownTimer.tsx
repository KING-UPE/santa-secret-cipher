import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const year = new Date().getFullYear();
      const christmas = new Date(year, 11, 25);
      if (new Date() > christmas) {
        christmas.setFullYear(year + 1);
      }
      const difference = +christmas - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1000 / 60 % 60),
          seconds: Math.floor(difference / 1000 % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);
  return <motion.div initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.5
  }} className="w-full max-w-3xl mx-auto mb-12">
      <div className="bg-white/95 backdrop-blur-md border-4 border-white shadow-2xl rounded-3xl p-8 text-center">
        <h3 className="text-christmas-red font-serif text-xl mb-6 tracking-widest uppercase font-bold drop-shadow-sm">
          Time Until the Magic Unfolds
        </h3>
        <div className="flex justify-center items-center gap-3 md:gap-6">
          <FlipUnit value={timeLeft.days} label="Days" />
          <div className="text-3xl text-christmas-red/50 font-serif">:</div>
          <FlipUnit value={timeLeft.hours} label="Hours" />
          <div className="text-3xl text-christmas-red/50 font-serif">:</div>
          <FlipUnit value={timeLeft.minutes} label="Mins" />
          <div className="text-3xl text-christmas-red/50 font-serif">:</div>
          <FlipUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </motion.div>;
}
function FlipUnit({
  value,
  label
}: {
  value: number;
  label: string;
}) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
    }
  }, [value, prevValue]);
  return <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 md:w-24 md:h-28 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div key={value} initial={{
          rotateX: isFlipping ? -90 : 0
        }} animate={{
          rotateX: 0
        }} exit={{
          rotateX: 90
        }} transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }} className="absolute inset-0 bg-gradient-to-b from-christmas-red to-christmas-red-dark rounded-xl shadow-xl flex items-center justify-center border-2 border-white/20" style={{
          transformStyle: 'preserve-3d'
        }}>
            <span className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
              {value.toString().padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm text-gray-700 uppercase tracking-wider mt-3 font-semibold">
        {label}
      </span>
    </div>;
}