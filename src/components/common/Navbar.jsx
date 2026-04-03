import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[60] bg-[#14222E]/30 backdrop-blur-[20px] px-6 md:px-12 py-4 md:py-6 flex items-center justify-between border-b border-white/[0.05]">
      <div className="flex items-center gap-4 md:gap-10">
        <div className="font-black text-xl md:text-2xl tracking-[-0.05em] text-white italic">ZORVYN</div>
        <div className="h-4 w-px bg-white/10 hidden sm:block" />
        <div className="font-bold text-[9px] md:text-[10px] tracking-widest uppercase text-black hidden sm:block">| FINANCE DASHBOARD</div>
      </div>
      <div className="hidden lg:flex items-center gap-10 text-[30] font-bold tracking-[0.15em] uppercase text-black">
        {["DashBoard➚",].map(link => (
          <a key={link} href="/dashboard" className="hover:text-black transition-all group relative">
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full" />
          </a>
        ))}
      </div>
    </nav>
  );
}
