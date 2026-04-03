import React, { useState } from 'react';
import { MoreVertical, Gamepad2, Tv, HeartPulse, Utensils, Plane, Wifi, ShoppingCart, Zap, Car, CreditCard, Landmark, Gift, Briefcase, ShoppingBag, Smartphone, Dumbbell, Film } from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';
import { useNavigate } from 'react-router-dom';

const RecentTransactions = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { transactions } = dashboardData;
  const navigate = useNavigate();

  const RECENT_LIMIT = 5;

  const getIcon = (type) => {
    const iconProps = { size: 18 };
    switch (type) {
      case 'Food Delivery':   return <Utensils {...iconProps} />;
      case 'Travel':          return <Plane {...iconProps} />;
      case 'Telecom':         return <Wifi {...iconProps} />;
      case 'Subscription':    return <Tv {...iconProps} />;
      case 'Loan Repayment':  return <Landmark {...iconProps} />;
      case 'Card Payment':    return <CreditCard {...iconProps} />;
      case 'Bank Transfer':   return <Landmark {...iconProps} />;
      case 'Refund':          return <Gift {...iconProps} />;
      case 'Online Shopping': return <ShoppingCart {...iconProps} />;
      case 'Electronics':     return <Gamepad2 {...iconProps} />;
      case 'Healthcare':      return <HeartPulse {...iconProps} />;
      case 'Fitness':         return <Dumbbell {...iconProps} />;
      case 'Utilities':       return <Zap {...iconProps} />;
      case 'Fuel':            return <Car {...iconProps} />;
      case 'Fashion':         return <ShoppingBag {...iconProps} />;
      case 'Entertainment':   return <Film {...iconProps} />;
      case 'Transport':       return <Car {...iconProps} />;
      case 'Groceries':       return <ShoppingCart {...iconProps} />;
      case 'Rewards':         return <Gift {...iconProps} />;
      case 'Salary':          return <Briefcase {...iconProps} />;
      case 'Investment':      return <Landmark {...iconProps} />;
      case 'Bank Interest':   return <Landmark {...iconProps} />;
      case 'Peer Transfer':   return <Smartphone {...iconProps} />;
      case 'Freelance':       return <Briefcase {...iconProps} />;
      default:                return <CreditCard {...iconProps} />;
    }
  };

  const filters = ['All', 'Income', 'Expenses', 'Debt', 'Transfer'];

  const filtered = transactions
    .filter((t) => activeFilter === 'All' || t.category === activeFilter)
    .slice(0, RECENT_LIMIT);

  return (
    <div className="bg-white rounded-2xl p-5 mb-10 border border-black/6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-black text-sm uppercase tracking-tight">Recent Transactions</h3>
        <MoreVertical size={15} className="text-[#9CA3AF] cursor-pointer" />
      </div>
      <p className="text-[11px] text-[#9CA3AF] mb-5">Your transaction history across all categories</p>

      <div className="flex gap-2 mb-7 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
              activeFilter === f
                ? 'bg-[#0A0A0A] text-white'
                : 'bg-[#F4F4F4] text-[#9CA3AF] hover:bg-black/8'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.map((t) => (
          <div key={t.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F4F4F4] border border-black/5 flex items-center justify-center text-[#0A0A0A]">
                {getIcon(t.type)}
              </div>
              <div>
                <div className="text-sm font-bold text-[#0A0A0A]">{t.title}</div>
                <div className="text-[10px] text-[#9CA3AF]">{t.type} • {t.time}</div>
              </div>
            </div>
            <div className={`text-sm font-black ${t.neg ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
              {t.amount}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/transactions')}
        className="w-full mt-6 py-2.5 rounded-xl bg-[#F4F4F4] text-[11px] font-black uppercase tracking-wide text-[#6B7280] hover:bg-black/8 transition-all"
      >
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;