import React from 'react';
import { BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardData } from '../../data/dashboardData';

const ActivitiesChart = () => {
  const { activities } = dashboardData;
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-black text-sm uppercase tracking-tight">Activities</h3>
        <div className="flex gap-2">
          <BarChart2 size={15} className="text-[#9CA3AF] hover:text-[#0A0A0A] cursor-pointer transition-colors" />
          <BarChart2 size={15} className="text-[#0A0A0A] cursor-pointer rotate-90" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[11px] text-[#9CA3AF]">Show your money flow</span>
        <div className="bg-black/8 text-[#0A0A0A] text-[10px] py-0.5 px-2 rounded-full font-black">+4%</div>
      </div>

      <div className="h-[250px] w-full -ml-4 -mb-2">
        <ResponsiveContainer width="110%" height="100%">
          <AreaChart data={activities}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', fontSize: '11px' }}
              itemStyle={{ color: '#0A0A0A' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0A0A0A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              dy={10}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivitiesChart;
