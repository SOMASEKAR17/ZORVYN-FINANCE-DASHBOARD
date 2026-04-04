import React from 'react';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import TopBar from '../components/dashboard/TopBar.jsx';
import BalanceSection from '../components/dashboard/BalanceSection.jsx';
import CurrencyList from '../components/dashboard/CurrencyList.jsx';
import CreditCard from '../components/dashboard/CreditCard.jsx';
import ActivitiesChart from '../components/dashboard/ActivitiesChart.jsx';
import AIAdvisor from '../components/dashboard/AIAdvisor.jsx';
import SavingsWallet from '../components/dashboard/SavingsWallet.jsx';
import RecentTransactions from '../components/dashboard/RecentTransactions.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#ECEEF1] text-[#0A0A0A] flex overflow-x-hidden">
      <ScrollProgress />
      <Sidebar />
      <main className="flex flex-col w-full min-h-screen md:pl-[60px] pb-20 md:pb-0">
        <TopBar />
        <BalanceSection />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-6 md:px-12 lg:px-20">
          <div className="lg:col-span-3 space-y-5">
            <CurrencyList />
            <CreditCard />
          </div>
          <div className="lg:col-span-5 space-y-5">
            <ActivitiesChart />
            <AIAdvisor />
          </div>
          <div className="lg:col-span-4 space-y-5">
            <SavingsWallet />
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
}
