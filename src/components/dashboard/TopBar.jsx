import React from 'react';
import { Search, Calendar } from 'lucide-react';

const TopBar = () => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pl-20 pr-20 pt-8">
    <div>
      <h1 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">Dashboard</h1>
      <p className="text-xs text-[#9CA3AF] mt-0.5">This is your overview dashboard for this month</p>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-white border border-black/8 rounded-full px-4 py-2 text-xs text-[#6B7280]">
        <Calendar size={13} />
        <span>05/05/2024 - 05/06/2024</span>
      </div>
      <button className="w-9 h-9 flex items-center justify-center bg-white border border-black/8 rounded-lg hover:bg-black/5 transition-colors">
        <Search size={15} className="text-[#6B7280]" />
      </button>
    </div>
  </div>
);

export default TopBar;
