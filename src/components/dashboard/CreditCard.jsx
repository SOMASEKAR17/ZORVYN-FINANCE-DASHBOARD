import React from 'react';
import { Smartphone } from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';

const CreditCard = () => {
  const { user, card } = dashboardData;
  return (
    <div className="rounded-2xl p-6 min-h-[200px] relative overflow-hidden cursor-pointer group bg-[#0A0A0A] shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/3 -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <Smartphone className="text-white/40" size={22} />
          <span className="font-black text-base italic tracking-tight text-white">{card.brand}</span>
        </div>

        <div className="text-lg font-mono tracking-[0.18em] text-white/80 my-7">
          {card.number}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-[9px] text-white/30 uppercase mb-1 tracking-widest">Card Holder</div>
            <div className="font-bold text-sm text-white">{user.name}</div>
          </div>
          <div>
            <div className="text-[9px] text-white/30 uppercase mb-1 tracking-widest">Expires</div>
            <div className="font-bold text-sm text-white">{card.expiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
