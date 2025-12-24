import React, { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryChange: (code: string) => void;
}

const countryCodes = [
  { code: '+94', country: 'LK', label: 'Sri Lanka' },
  { code: '+1', country: 'US/CA', label: 'USA/Canada' },
  { code: '+44', country: 'UK', label: 'United Kingdom' },
  { code: '+91', country: 'IN', label: 'India' },
  { code: '+61', country: 'AU', label: 'Australia' },
  { code: '+971', country: 'UAE', label: 'UAE' },
  { code: '+65', country: 'SG', label: 'Singapore' },
  { code: '+60', country: 'MY', label: 'Malaysia' },
  { code: '+49', country: 'DE', label: 'Germany' },
  { code: '+33', country: 'FR', label: 'France' },
  { code: '+81', country: 'JP', label: 'Japan' }
];

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-20">
      <label className="block text-sm font-medium text-christmas-red mb-2 uppercase tracking-wider">
        Receiver's Phone
      </label>
      <div className={`relative flex items-center transition-all duration-300 rounded-xl border-2 ${isFocused ? 'border-christmas-red shadow-lg' : 'border-gray-200'} bg-white`}>
        <div className="relative">
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-2 px-4 py-4 text-gray-700 hover:text-christmas-red transition-colors border-r-2 border-gray-200"
          >
            <span className="font-mono text-lg">{countryCode}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }} 
                className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-christmas-red rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto"
              >
                {countryCodes.map(item => (
                  <button 
                    key={item.code} 
                    type="button" 
                    onClick={() => {
                      onCountryChange(item.code);
                      setIsOpen(false);
                    }} 
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-christmas-red/10 hover:text-christmas-red transition-colors flex justify-between items-center"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-gray-500">{item.code}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="tel" 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            placeholder="77 123 4567" 
            className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 px-4 py-4 pl-12 focus:ring-0 text-lg font-mono outline-none" 
          />
        </div>
      </div>
    </div>
  );
}