import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

const COLORS = ['#831AE3', '#6E859F', '#CBD6D9', '#0A0A0A', '#818F9B'];

export function MonthlyComparison({ data }) {
  return (
    <section className="bg-white rounded-[32px] p-6 md:p-10 border border-[#ECEEF1] shadow-sm min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0A0A0A]">Income vs Expenses</h2>
          <p className="text-xs text-[#818F9B]">Monthly performance audit</p>
        </div>
        <div className="flex gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#831AE3]">Income</div>
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#CBD6D9]">Expenses</div>
        </div>
      </div>
      <div className="h-[250px] md:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEEF1" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#818F9B', fontSize: 10, fontWeight: 700}} dy={10} />
            <YAxis hide />
            <Tooltip cursor={{fill: '#F4F7F6'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'}} />
            <Bar dataKey="income" fill="#831AE3" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expense" fill="#CBD6D9" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function SpendingBreakdown({ data }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <section className="bg-white rounded-[32px] p-6 md:p-10 border border-[#ECEEF1] shadow-sm h-full min-w-0">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-8 md:mb-10 text-[#0A0A0A]">Expenditure Density</h2>
      <div className="h-[350px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              innerRadius={isMobile ? 50 : 60} 
              outerRadius={isMobile ? 80 : 90} 
              paddingAngle={5} 
              dataKey="value"
              cx="50%"
              cy="50%"
            >
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend 
              verticalAlign={isMobile ? "bottom" : "middle"} 
              align={isMobile ? "center" : "right"} 
              layout={isMobile ? "horizontal" : "vertical"} 
              iconType="circle" 
              wrapperStyle={{fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', paddingLeft: isMobile ? 0 : '20px', paddingTop: isMobile ? '20px' : 0}} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function CashFlowTrajectory({ data }) {
  return (
    <section className="bg-white rounded-[32px] p-6 md:p-10 border border-[#ECEEF1] shadow-sm min-w-0">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-8 md:mb-10 text-[#0A0A0A]">Cash Flow Trajectory</h2>
      <div className="h-[250px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="balGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#831AE3" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#831AE3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ECEEF1" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#818F9B', fontSize: 10, fontWeight: 700}} hide={data.length > 20} />
            <Tooltip />
            <Area type="stepBefore" dataKey="balance" stroke="#831AE3" strokeWidth={3} fill="url(#balGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
