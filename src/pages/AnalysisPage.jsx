import React, { useMemo } from 'react';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import TopBar from '../components/dashboard/TopBar.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx';
import { dashboardData } from '../data/dashboardData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { TrendingUp, Zap, Target, ShieldCheck, ArrowRight } from 'lucide-react';

const COLORS = ['#831AE3', '#6E859F', '#CBD6D9', '#0A0A0A', '#818F9B'];

const AnalysisPage = () => {
  const chartData = useMemo(() => {
    const raw = dashboardData.transactions.slice(0, 30);
    const daily = {};
    raw.forEach(t => {
      const d = new Date(t.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const amt = parseFloat(t.amount.replace(/[$,+]/g, ''));
      if (!daily[d]) daily[d] = { name: d, income: 0, expense: 0 };
      if (amt > 0) daily[d].income += amt;
      else daily[d].expense += Math.abs(amt);
    });
    return Object.values(daily).reverse().slice(0, 7);
  }, []);

  const categoryData = useMemo(() => {
    const cats = {};
    dashboardData.transactions.forEach(t => {
      if (t.neg) {
        cats[t.category] = (cats[t.category] || 0) + Math.abs(parseFloat(t.amount.replace(/[$,-]/g, '')));
      }
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value })).slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-[#ECEEF1] text-[#0A0A0A] flex overflow-x-hidden">
      <ScrollProgress />
      <Sidebar />
      <main className="flex flex-col w-full min-h-screen">
        <TopBar />
        
        <div className="p-8 md:p-12 lg:pl-24 lg:pr-12 pt-0 flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#831AE3] font-black uppercase text-[10px] tracking-[0.3em]">
              <Zap size={14} fill="#831AE3" />
              Pulse Engine v2.4
            </div>
            <h1 className="text-5xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-none">
              Strategic<br />
              <span className="text-[#818F9B]/40">Insights</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Avg Monthly Spend', val: '$3,420.00', icon: TrendingUp, color: 'text-[#831AE3]' },
              { label: 'Saving Efficiency', val: '24.2%', icon: Target, color: 'text-emerald-600' },
              { label: 'Risk Score', val: 'Low', icon: ShieldCheck, color: 'text-[#818F9B]' },
              { label: 'Projected Balance', val: '$52,140', icon: TrendingUp, color: 'text-[#0A0A0A]' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] border border-[#ECEEF1] shadow-sm group hover:border-[#831AE3]/20 transition-all">
                <s.icon className={`${s.color} mb-4`} size={20} />
                <p className="text-[10px] font-black text-[#818F9B] uppercase tracking-widest mb-1">{s.label}</p>
                <h3 className="text-2xl font-black text-[#0A0A0A]">{s.val}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-[#ECEEF1] shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-xl font-black text-[#0A0A0A] uppercase tracking-tight">Cash Flow Dynamics</h2>
                  <p className="text-xs text-[#818F9B]">7-Day Revenue vs Expenditure Analysis</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#818F9B] uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#831AE3]"></span> Income
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#818F9B] uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#CBD6D9]"></span> Expenses
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#831AE3" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#831AE3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEEF1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#818F9B', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', fontSize: '12px'}}
                      cursor={{stroke: '#831AE3', strokeWidth: 1}}
                    />
                    <Area type="monotone" dataKey="income" stroke="#831AE3" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expense" stroke="#CBD6D9" strokeWidth={3} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-[#0A0A0A] rounded-[32px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(131,26,227,0.15),transparent_70%)]" />
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2 relative z-10">Smart Alerts</h2>
                <div className="space-y-4 pt-6 relative z-10">
                  {[
                    { title: 'Optimization Found', desc: 'Move $4,000 to High-Yield Vault to earn an extra 4.2% APY.', urgency: 'High' },
                    { title: 'Budget Velocity', desc: 'Food delivery spend is 14% higher than last month forecast.', urgency: 'Medium' }
                  ].map((alert, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${alert.urgency === 'High' ? 'text-red-400' : 'text-[#831AE3]'}`}>
                          {alert.urgency} Priority
                        </span>
                        <ArrowRight size={14} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{alert.title}</h4>
                      <p className="text-[12px] text-white/40 leading-relaxed">{alert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full bg-[#831AE3] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] relative z-10 hover:shadow-[0_0_30px_rgba(131,26,227,0.4)] transition-all">
                Generate Full PDF Report
              </button>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <section className="bg-white rounded-[32px] p-8 border border-[#ECEEF1] shadow-sm">
              <h2 className="text-xl font-black text-[#0A0A0A] uppercase tracking-tight mb-8">Expenditure Density</h2>
              <div className="h-[250px] w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#818F9B'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-[32px] p-8 border border-[#ECEEF1] shadow-sm">
              <h2 className="text-xl font-black text-[#0A0A0A] uppercase tracking-tight mb-8">Savings Velocity</h2>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEEF1" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#818F9B', fontSize: 10, fontWeight: 700}} dy={10} />
                    <Tooltip cursor={{fill: '#F4F7F6'}} />
                    <Bar dataKey="income" fill="#831AE3" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;
