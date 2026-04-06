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
      <main className="flex flex-col w-full min-h-screen md:pl-[60px] pb-20 md:pb-0">
        <TopBar />
        <div className="px-6 md:px-12 lg:px-20 pt-0 flex flex-col gap-8">
          <header className="flex ml-5 flex-col md:flex-row md:items-end md:justify-between gap-4">
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
          </header>
          
          <div className="w-full">
            <TransactionsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
