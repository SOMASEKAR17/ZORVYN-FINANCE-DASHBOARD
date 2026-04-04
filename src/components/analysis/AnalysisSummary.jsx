import React from 'react';
import { TrendingUp, Target, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Avg Monthly Spend', val: '$3,420.00', icon: TrendingUp, color: 'text-[#831AE3]' },
  { label: 'Saving Efficiency', val: '24.2%', icon: Target, color: 'text-emerald-600' },
  { label: 'Risk Score', val: 'Low', icon: ShieldCheck, color: 'text-[#818F9B]' },
  { label: 'Projected Balance', val: '$52,140', icon: TrendingUp, color: 'text-[#0A0A0A]' }
];

export default function AnalysisSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded-[24px] border border-[#ECEEF1] shadow-sm group hover:border-[#831AE3]/20 transition-all">
          <s.icon className={`${s.color} mb-4`} size={20} />
          <p className="text-[10px] font-black text-[#818F9B] uppercase tracking-widest mb-1">{s.label}</p>
          <h3 className="text-2xl font-black text-[#0A0A0A]">{s.val}</h3>
        </div>
      ))}
    </div>
  );
}
