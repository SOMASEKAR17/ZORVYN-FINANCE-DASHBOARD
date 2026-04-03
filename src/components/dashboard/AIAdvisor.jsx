import React from 'react';
import { Cpu } from 'lucide-react';

const AIAdvisor = () => (
  <div className="bg-[#0A0A0A] rounded-2xl relative overflow-hidden text-center flex flex-col items-center py-10 px-6 shadow-xl">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />

    <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center mb-6 relative">
      <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
      <Cpu size={26} className="text-white" />
    </div>

    <h4 className="text-lg font-black uppercase tracking-tight text-white mb-3 leading-tight">
      Invest Smarter with our<br />AI-Robo Advisor!
    </h4>
    <p className="text-xs text-white/40 max-w-xs mx-auto mb-8 leading-relaxed">
      Get automated management, real time insights and personalized advice
    </p>

    <button className="w-full bg-white text-[#0A0A0A] py-3.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white/90 transition-all">
      Try Now
    </button>
  </div>
);

export default AIAdvisor;
