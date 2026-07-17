import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
}

export default function InfoTooltip({ content, children, position = 'top', iconSize = 'md' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children || <Info className={cn("text-indigo-400 hover:text-indigo-600 cursor-help transition-colors", sizeClasses[iconSize])} />}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-[100] w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl leading-relaxed text-left font-normal tracking-normal pointer-events-none",
              position === 'top' ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : "",
              position === 'bottom' ? "top-full left-1/2 -translate-x-1/2 mt-2" : "",
              position === 'left' ? "right-full top-1/2 -translate-y-1/2 mr-2" : "",
              position === 'right' ? "left-full top-1/2 -translate-y-1/2 ml-2" : ""
            )}
          >
            {content}
            <div className={cn(
              "absolute w-2 h-2 bg-slate-900 rotate-45",
              position === 'top' ? "bottom-[-4px] left-1/2 -translate-x-1/2" : "",
              position === 'bottom' ? "top-[-4px] left-1/2 -translate-x-1/2" : "",
              position === 'left' ? "right-[-4px] top-1/2 -translate-y-1/2" : "",
              position === 'right' ? "left-[-4px] top-1/2 -translate-y-1/2" : ""
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
