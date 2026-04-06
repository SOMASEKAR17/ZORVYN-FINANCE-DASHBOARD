import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Plane, 
  ShoppingBag, 
  GraduationCap, 
  LifeBuoy, 
  Coffee, 
  Camera, 
  Heart, 
  Briefcase,
  Utensils,
  Car,
  Wallet
} from 'lucide-react';
import { dashboardData } from '../../data/dashboardData';

const ALL_CATEGORIES = [
  { id: 'travel', label: 'Traveling', icon: Plane },
  { id: 'shop', label: 'Shopping', icon: ShoppingBag },
  { id: 'edu', label: 'Education', icon: GraduationCap },
  { id: 'emerg', label: 'Emergency', icon: LifeBuoy },
  { id: 'leisure', label: 'Leisure', icon: Coffee },
  { id: 'hobby', label: 'Hobby', icon: Camera },
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'biz', label: 'Business', icon: Briefcase },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'auto', label: 'Auto', icon: Car },
];

const SavingsWallet = () => {
  const { savings } = dashboardData;
  const [isAdding, setIsAdding] = useState(false);
  const [tracked, setTracked] = useState(['travel', 'shop', 'edu', 'emerg']);

  const addCategory = (id) => {
    if (!tracked.includes(id)) {
      setTracked([...tracked, id]);
    }
    setIsAdding(false);
  };

  const removeCategory = (id) => {
    setTracked(tracked.filter(t => t !== id));
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#ECEEF1] shadow-sm relative overflow-visible">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-[#831AE3]" />
          <h3 className="font-black text-sm uppercase tracking-tight text-[#0A0A0A]">Life Saver</h3>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#831AE3]/5 p-2 rounded-xl text-[#831AE3] hover:bg-[#831AE3]/10 transition-all border border-[#831AE3]/10"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-[10px] font-bold text-[#818F9B] mb-8 uppercase tracking-widest">Allocates your income • Remember be patient</p>

      {isAdding && (
        <div className="absolute top-20 right-8 z-50 bg-[#0A0A0A] p-4 rounded-2xl shadow-2xl border border-white/10 w-48">
          <div className="grid grid-cols-2 gap-2">
            {ALL_CATEGORIES.filter(cat => !tracked.includes(cat.id)).map(cat => (
              <button 
                key={cat.id}
                onClick={() => addCategory(cat.id)}
                className="flex flex-col items-center gap-1.5 p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-all"
              >
                <cat.icon size={14} className="text-[#831AE3]" />
                <span className="text-[9px] font-black text-white uppercase tracking-tighter">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="text-3xl font-black tracking-tighter text-[#0A0A0A]">{savings.total}</div>
        <div className="text-[10px] text-[#818F9B] mt-1 uppercase tracking-widest font-black">Total Savings</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {tracked.map((id) => {
          const cat = ALL_CATEGORIES.find(c => c.id === id);
          if (!cat) return null;
          const Icon = cat.icon;

          return (
            <div key={id} className="group relative">
              <button 
                onClick={() => removeCategory(id)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white border border-[#ECEEF1] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              >
                <X size={10} className="text-[#818F9B]" />
              </button>
              <div className="w-full aspect-square bg-[#F4F7F6] rounded-2xl flex items-center justify-center text-[#0A0A0A] mb-2 group-hover:bg-[#831AE3]/5 group-hover:text-[#831AE3] group-hover:border-[#831AE3]/30 transition-all border border-[#ECEEF1] shadow-inner">
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <div className="text-[9px] text-center text-[#818F9B] font-black uppercase tracking-widest">{cat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsWallet;
