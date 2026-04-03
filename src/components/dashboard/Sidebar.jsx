import React from 'react';
import { Home, Wallet, BarChart2, PieChart, User, Settings, LogOut, Layout } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-[60px] h-screen bg-[#0A0A0A] fixed left-0 top-0 flex flex-col items-center py-8 z-50">
    <div className="mb-12 cursor-pointer">
      <a href="/">
        <Layout size={20} className="text-white" />
      </a>
    </div>

    <nav className="flex flex-col gap-8 flex-1">
      <div className="text-white cursor-pointer"><Home size={20} /></div>
      <div className="text-white/30 hover:text-white cursor-pointer transition-colors"><Wallet size={20} /></div>
      <div className="text-white/30 hover:text-white cursor-pointer transition-colors"><BarChart2 size={20} /></div>
      <div className="text-white/30 hover:text-white cursor-pointer transition-colors"><PieChart size={20} /></div>
      <div className="text-white/30 hover:text-white cursor-pointer transition-colors"><User size={20} /></div>
    </nav>

    <div className="flex flex-col gap-8 mt-auto">
      <div className="text-white/30 hover:text-white cursor-pointer transition-colors"><Settings size={20} /></div>
      <div className="text-white/30 hover:text-white/60 cursor-pointer transition-colors"><LogOut size={20} /></div>
    </div>
  </aside>
);

export default Sidebar;
