import React, { useMemo } from 'react';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import TopBar from '../components/dashboard/TopBar.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx';
import { dashboardData } from '../data/dashboardData';
import AnalysisSummary from '../components/analysis/AnalysisSummary.jsx';
import { MonthlyComparison, SpendingBreakdown, CashFlowTrajectory } from '../components/analysis/AnalysisCharts.jsx';
import { LargestOutflows, RecurringExpenses } from '../components/analysis/AnalysisTables.jsx';
import { AlertCircle, Calendar, ArrowUpRight, Zap } from 'lucide-react';

const AnalysisPage = () => {
  const allTxs = dashboardData.transactions;

  const monthlyComparison = useMemo(() => {
    const data = {};
    allTxs.forEach(t => {
      const date = new Date(t.time);
      const key = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
      if (!data[key]) data[key] = { month: key, income: 0, expense: 0, dateObj: date };
      const amt = Math.abs(parseFloat(t.amount.replace(/[$,+]/g, '')));
      if (!t.neg) data[key].income += amt;
      else data[key].expense += amt;
    });
    return Object.values(data).sort((a, b) => a.dateObj - b.dateObj).map(({dateObj, ...rest}) => rest);
  }, [allTxs]);

  const spendingByCategory = useMemo(() => {
    const cats = {};
    allTxs.filter(t => t.neg).forEach(t => {
      cats[t.type] = (cats[t.type] || 0) + Math.abs(parseFloat(t.amount.replace(/[$,-]/g, '')));
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [allTxs]);

  const cashFlowData = useMemo(() => {
    const sorted = [...allTxs].sort((a, b) => new Date(a.time) - new Date(b.time));
    let running = 0;
    return sorted.map(t => {
      running += parseFloat(t.amount.replace(/[$,+]/g, ''));
      return { time: new Date(t.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), balance: running };
    }).filter((_, i) => i % 5 === 0);
  }, [allTxs]);

  const largestTransactions = useMemo(() => {
    return [...allTxs]
      .sort((a, b) => Math.abs(parseFloat(b.amount.replace(/[$,+]/g, ''))) - Math.abs(parseFloat(a.amount.replace(/[$,+]/g, ''))))
      .slice(0, 10);
  }, [allTxs]);

  const recurringExpenses = useMemo(() => {
    const groups = {};
    allTxs.filter(t => t.neg).forEach(t => {
      if (!groups[t.title]) groups[t.title] = { title: t.title, count: 0, total: 0 };
      groups[t.title].count += 1;
      groups[t.title].total += Math.abs(parseFloat(t.amount.replace(/[$,-]/g, '')));
    });
    return Object.values(groups).filter(g => g.count > 1).sort((a, b) => b.count - a.count);
  }, [allTxs]);

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
            <h1 className="text-5xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-[0.85]">
              Strategic<br />
              <span className="text-[#818F9B]/40">Insights</span>
            </h1>
          </header>

          <AnalysisSummary />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <MonthlyComparison data={monthlyComparison} />
            </div>

            <section className="lg:col-span-4 bg-[#0A0A0A] rounded-[32px] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[450px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(131,26,227,0.15),transparent_70%)]" />
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8">Pattern Alerts</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Anomalous Purchases</h4>
                      <p className="text-xs text-white/40 leading-relaxed">Multiple "Laptop Purchase" entries detected. Risk of duplication or internal unauthorized spend.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#831AE3]/10 flex items-center justify-center text-[#831AE3] flex-shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Optimal Liquidity</h4>
                      <p className="text-xs text-white/40 leading-relaxed">Salary detected on the 1st every month. Automated reinvestment triggers set for the 2nd.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative z-10">
                <p className="text-[10px] font-black uppercase text-[#818F9B] mb-2 tracking-widest">Saving Vault</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black text-[#831AE3]">+$2,410.50</h3>
                  <div className="text-[10px] font-bold text-white uppercase mb-1 flex items-center gap-1">
                    Cumulative <ArrowUpRight size={10} />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingBreakdown data={spendingByCategory} />
            <CashFlowTrajectory data={cashFlowData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <LargestOutflows transactions={largestTransactions} />
            <RecurringExpenses groups={recurringExpenses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;
