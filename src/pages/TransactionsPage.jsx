import React from 'react';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import TopBar from '../components/dashboard/TopBar.jsx';
import TransactionsTable from '../components/dashboard/TransactionsTable.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-[#ECEEF1] text-[#0A0A0A] flex overflow-x-hidden">
      <ScrollProgress />
      <Sidebar />
      <main className="flex flex-col w-full min-h-screen">
        <TopBar />
        <div className="p-8 md:p-12 lg:pl-24 lg:pr-12 pt-0 flex flex-col gap-8">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-[#831AE3] font-black uppercase text-sm tracking-[0.2em] mb-3">
                <span className="w-8 h-[2px] bg-[#831AE3]"></span>
                Wallet Ledger
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter uppercase leading-[0.85]">
                Financial<br />
                <span className="text-[#818F9B]/40">Activities</span>
              </h1>
            </div>
            <div className="bg-white/40 border border-white/60 p-4 rounded-3xl backdrop-blur-md flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[#818F9B] text-xs font-bold uppercase tracking-widest">Total Volume</span>
                <span className="text-xl font-black text-[#0A0A0A]">100 Items</span>
              </div>
              <div className="w-[1px] h-8 bg-[#818F9B]/10"></div>
              <div className="flex flex-col">
                <span className="text-[#818F9B] text-xs font-bold uppercase tracking-widest">Global Vault</span>
                <span className="text-xl font-black text-[#831AE3]">Active</span>
              </div>
            </div>
          </header>
          
          <div className="w-full">
            <TransactionsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
