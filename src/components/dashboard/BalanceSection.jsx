import React, { useState } from 'react';
import { Eye, EyeOff, MoveUpRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';

const BalanceSection = () => {
  const { user } = dashboardData;
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6 px-6 md:px-12 lg:px-20">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black tracking-tight text-[#0A0A0A] flex items-baseline min-w-[200px]">
            {isBalanceHidden ? (
              <span className="tracking-[0.2em] font-black">••••••</span>
            ) : (
              <>
                ${user.balance}
                <span className="text-2xl font-light text-[#0A0A0A]/40">,{user.balanceFraction}</span>
              </>
            )}
          </h2>
          <button 
            onClick={() => setIsBalanceHidden(!isBalanceHidden)}
            className="text-[#9CA3AF] hover:text-[#831AE3] transition-colors outline-none"
          >
            {isBalanceHidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          Last transaction: You have earned{' '}
          <span className="text-[#831AE3] font-black">{isBalanceHidden ? '***' : user.lastTransaction.amount}</span>{' '}
          from {user.lastTransaction.sender} • {user.lastTransaction.time}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-5 py-2.5 text-xs font-bold hover:bg-[#831AE3]/5 hover:border-[#831AE3]/30 transition-all text-[#0A0A0A]">
          <MoveUpRight size={13} className="text-[#831AE3]" />
          Move Money
        </button>
        <button className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-5 py-2.5 text-xs font-bold hover:bg-[#831AE3]/5 hover:border-[#831AE3]/30 transition-all text-[#0A0A0A]">
          <TrendingUp size={13} className="text-[#831AE3]" />
          Request
        </button>
        <button className="flex items-center gap-2 bg-[#0A0A0A] text-white rounded-full px-5 py-2.5 text-xs font-bold hover:bg-black/80 transition-all relative">
          <ArrowUpRight size={13} />
          Transfer
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#831AE3] text-white border-2 border-white rounded-md flex items-center justify-center text-[10px] font-black">
            7
          </div>
        </button>
      </div>
    </div>
  );
};

export default BalanceSection;
