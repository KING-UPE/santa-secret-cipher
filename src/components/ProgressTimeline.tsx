import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Lock, Send } from 'lucide-react';
export function ProgressTimeline() {
  const steps = [{
    icon: PenLine,
    label: 'Wish Created',
    active: true
  }, {
    icon: Lock,
    label: 'Sealed in Vault',
    active: false
  }, {
    icon: Send,
    label: 'Sent Dec 25',
    active: false
  }];
  return <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex justify-between items-center">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />

        {steps.map((step, index) => <div key={index} className="flex flex-col items-center gap-2 bg-white p-2 rounded-lg">
            <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2 + index * 0.1
        }} className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                ${step.active ? 'border-christmas-red bg-christmas-red text-white shadow-lg' : 'border-gray-300 bg-white text-gray-400'}`}>
              <step.icon size={18} />
            </motion.div>
            <span className={`text-xs font-medium ${step.active ? 'text-christmas-red' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>)}
      </div>
    </div>;
}