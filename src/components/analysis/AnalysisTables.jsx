import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export function LargestOutflows({ transactions }) {
  const [expanded, setExpanded] = useState(false);
  const displayCount = expanded ? 10 : 4;
  const list = transactions.slice(0, displayCount);

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#ECEEF1] shadow-sm">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mb-8">Largest Outflows</h2>
      <div className="space-y-4">
        {list.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F7F6] border border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center font-bold text-xs flex-shrink-0">#{i+1}</div>
              <div className="min-w-0">
                <div className="font-black text-xs md:text-sm text-[#0A0A0A] truncate">{t.title}</div>
                <div className="text-[9px] md:text-[10px] uppercase font-bold text-[#818F9B] tracking-widest">{t.time}</div>
              </div>
            </div>
            <div className={`font-black text-sm md:text-base flex-shrink-0 ml-4 ${t.neg ? 'text-red-500' : 'text-emerald-500'}`}>{t.amount}</div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-6 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#818F9B] hover:text-[#831AE3] transition-colors"
      >
        {expanded ? 'Show Less' : 'Expand All Entries'} <ArrowDown size={14} className={expanded ? 'rotate-180' : ''} />
      </button>
    </div>
  );
}

export function RecurringExpenses({ groups }) {
  const [expanded, setExpanded] = useState(false);
  const displayCount = expanded ? groups.length : 4;
  const list = groups.slice(0, displayCount);

  return (
    <div className="bg-[#0A0A0A] rounded-[32px] p-6 mb-20 md:p-10 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(131,26,227,0.1),transparent_70%)]" />
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-8 relative z-10">Recurring Expenditure</h2>
      <div className="space-y-4 relative z-10">
        {list.map((g, i) => (
          <div key={i} className="flex items-center justify-between p-4 md:p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="min-w-0">
              <div className="font-bold text-sm md:text-base text-white truncate">{g.title}</div>
              <div className="text-[9px] md:text-[10px] text-white/40 uppercase font-black tracking-widest">{g.count} Occurrences / Month</div>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
              <div className="font-black text-sm md:text-base text-white">Avg ${ (g.total / g.count).toFixed(2) }</div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-8 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors relative z-10"
      >
        {expanded ? 'Show Less' : 'View Detailed List'} <ArrowDown size={14} className={expanded ? 'rotate-180' : ''} />
      </button>
    </div>
  );
}
