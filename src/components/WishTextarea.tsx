import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
interface WishTextareaProps {
  value: string;
  onChange: (value: string) => void;
}
export function WishTextarea({
  value,
  onChange
}: WishTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 500;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };
  return <div className="relative group">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-christmas-red uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={14} className="text-christmas-red" />
          Your Secret Wish
        </label>
        <span className={`text-xs ${value.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
          {value.length}/{maxLength}
        </span>
      </div>

      <div className={`relative transition-all duration-300 rounded-xl border-2 ${isFocused ? 'border-christmas-red shadow-lg' : 'border-gray-200'} bg-white overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-christmas-red/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <textarea value={value} onChange={handleChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Write your Christmas miracle here..." rows={6} className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 px-6 py-6 focus:ring-0 text-lg leading-relaxed resize-none outline-none relative z-10" />

        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-christmas-red/30 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-christmas-red/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-christmas-red/30 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-christmas-red/30 rounded-br-lg" />
      </div>
    </div>;
}