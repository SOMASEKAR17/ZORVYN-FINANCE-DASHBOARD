import React from 'react';
import { Eye, MoveUpRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';

const BalanceSection = () => {
  const { user } = dashboardData;
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6 pl-20 pr-20">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black tracking-tight text-[#0A0A0A] flex items-baseline">
            ${user.balance}
            <span className="text-2xl font-light text-[#0A0A0A]/40">,{user.balanceFraction}</span>
          </h2>
          <Eye size={18} className="text-[#9CA3AF] cursor-pointer hover:text-[#0A0A0A] transition-colors" />
        </div>
        <p className="text-xs text-[#9CA3AF]">
          Last transaction: You have earned{' '}
          <span className="text-[#0A0A0A] font-medium">{user.lastTransaction.amount}</span>{' '}
          from {user.lastTransaction.sender} • {user.lastTransaction.time}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-5 py-2.5 text-xs font-bold hover:bg-black/5 transition-all text-[#0A0A0A]">
          <MoveUpRight size={13} />
          Move Money
        </button>
        <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-5 py-2.5 text-xs font-bold hover:bg-black/5 transition-all text-[#0A0A0A]">
          <TrendingUp size={13} />
          Request
        </button>
        <button className="flex items-center gap-2 bg-[#0A0A0A] text-white rounded-full px-5 py-2.5 text-xs font-bold hover:bg-black/80 transition-all relative">
          <ArrowUpRight size={13} />
          Transfer
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#0A0A0A] border border-black/10 rounded-md flex items-center justify-center text-[10px] font-black">
            7
          </div>
        </button>
      </div>
    </div>
  );
};

export default BalanceSection;
