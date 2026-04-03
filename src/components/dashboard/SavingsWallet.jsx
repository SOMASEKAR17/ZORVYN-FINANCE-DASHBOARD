import React from 'react';
import { Plus } from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';

const SavingsWallet = () => {
  const { savings } = dashboardData;
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-black text-sm uppercase tracking-tight">Saving Wallet</h3>
        <Plus size={16} className="text-[#9CA3AF] cursor-pointer hover:text-[#0A0A0A] transition-colors" />
      </div>
      <p className="text-[11px] text-[#9CA3AF] mb-8">Allocates your income. Remember be patient</p>

      <div className="mb-8">
        <div className="text-3xl font-black tracking-tight">{savings.total}</div>
        <div className="text-[10px] text-[#9CA3AF] mt-1 uppercase tracking-widest font-bold">Total Savings</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {savings.categories.map((item) => (
          <div key={item.label} className="group cursor-pointer">
            <div className="w-full aspect-square bg-[#F4F4F4] rounded-xl flex items-center justify-center text-xl mb-2 group-hover:bg-black/8 transition-colors border border-black/5">
              {item.icon}
            </div>
            <div className="text-[9px] text-center text-[#9CA3AF] font-bold uppercase tracking-wide">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsWallet;
