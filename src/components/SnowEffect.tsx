import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  useEffect(() => {
    const count = 50;
    const newSnowflakes = Array.from({
      length: count
    }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10
    }));
    setSnowflakes(newSnowflakes);
  }, []);
  return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map(flake => <motion.div key={flake.id} className="absolute rounded-full bg-white" style={{
      left: `${flake.x}%`,
      width: flake.size,
      height: flake.size,
      opacity: 0.8,
      boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
    }} animate={{
      y: ['-20vh', '120vh'],
      x: [`${flake.x}%`, `${flake.x + (Math.random() * 10 - 5)}%`]
    }} transition={{
      duration: flake.duration,
      repeat: Infinity,
      delay: flake.delay,
      ease: 'linear'
    }} />)}
    </div>;
}