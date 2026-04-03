import React from 'react';
import { dashboardData } from '../../data/dashboardData';

const CurrencyList = () => {
  const { currencies } = dashboardData;
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-black text-sm uppercase tracking-tight">Nuance currency</h3>
        <button className="text-[10px] px-2.5 py-1 border border-black/10 rounded-md hover:bg-black/5 transition-colors font-medium">
          Add new
        </button>
      </div>
      <p className="text-[10px] text-[#9CA3AF] mb-6">Last currency Today 1 USD= {currencies[1].rate} JPY</p>

      <div className="flex gap-4">
        {currencies.map((currency) => (
          <div key={currency.code} className="space-y-4 flex-1">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-black/8">
              <img src={currency.flag} alt={currency.code} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight">{currency.amount}</div>
              <div className="text-[10px] text-[#9CA3AF] font-bold uppercase">{currency.code}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyList;
