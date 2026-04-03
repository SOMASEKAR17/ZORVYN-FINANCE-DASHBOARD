import React from 'react';
import { motion, useTransform } from 'framer-motion';

export default function Footer({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.85, 0.9, 1, 1], [0, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0.85, 1], [100, 0]);

  return (
    <footer className="relative z-10 w-full h-[120vh] flex flex-col items-center justify-center bg-[#818F9B] px-6 pointer-events-none">
      <motion.div 
        style={{ opacity, y }}
        className="w-full max-w-[900px] md:h-[450px] glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 shadow-2xl pointer-events-auto"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8">
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-[#6E859F] mb-4 md:mb-6">Project Zorvyn / 2026</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-[-0.03em]">Your world. <br className="hidden md:block" />Redefined.</h2>
          </div>
          <div className="md:text-right">
            <span className="text-[10px] font-bold text-[#CBD6D9]/30 uppercase tracking-[0.3em] block mb-1 md:mb-2">Access Fee</span>
            <div className="text-white font-black text-4xl md:text-5xl tracking-tighter">$399.00</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-10 md:mt-0">
          <button className="flex-1 h-16 md:h-20 bg-[#47525E] text-white rounded-2xl md:rounded-3xl font-black hover:brightness-110 transition-all duration-700 text-[10px] tracking-[0.3em] uppercase">
            Join Platform
          </button>
          <button className="flex-1 h-16 md:h-20 bg-white/5 border border-white/10 text-white rounded-2xl md:rounded-3xl font-bold hover:bg-white/10 transition-all duration-700 text-[10px] tracking-[0.3em] uppercase">
            View Protocol
          </button>
        </div>
      </motion.div>
      <div className="absolute bottom-10 md:bottom-16 flex flex-col items-center gap-4 md:gap-6 pointer-events-auto opacity-30 text-center">
        <div className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-[#CBD6D9]/50">Zorvyn V3 / Quantum Secure Ledger</div>
        <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-[#CBD6D9]/30">&copy; 2026 Zorvyn Corporation. All rights reserved.</div>
      </div>
    </footer>
  );
}
