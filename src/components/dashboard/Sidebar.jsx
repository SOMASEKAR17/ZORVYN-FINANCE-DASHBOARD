import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, BarChart2, PieChart, User, Settings, LogOut, Layout } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isTransactions = location.pathname === '/transactions';
  const isAnalysis = location.pathname === '/analysis';

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-[60px] flex-col items-center bg-[#0A0A0A] py-8 z-50 md:flex">
        <div className="mb-12 cursor-pointer">
          <Link to="/">
            <Layout size={20} className="text-white" />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-8">
          <NavItem to="/dashboard" isActive={isDashboard} Icon={Home} label="Dashboard" />
          <NavItem to="/transactions" isActive={isTransactions} Icon={Wallet} label="Transactions" />
          <NavItem to="/analysis" isActive={isAnalysis} Icon={BarChart2} label="Analysis" />
          <div className="cursor-pointer text-white/30 transition-colors hover:text-white"><User size={20} /></div>
        </nav>
        <div className="mt-auto flex flex-col gap-8">
          <div className="cursor-pointer text-white/30 transition-colors hover:text-white"><Settings size={20} /></div>
          <div className="cursor-pointer text-white/30 transition-colors hover:text-white/60"><LogOut size={20} /></div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-white/10 bg-[#0A0A0A] px-6 md:hidden">
        <Link to="/dashboard" className={`${isDashboard ? 'text-[#831AE3]' : 'text-white/40'}`}><Home size={22} /></Link>
        <Link to="/transactions" className={`${isTransactions ? 'text-[#831AE3]' : 'text-white/40'}`}><Wallet size={22} /></Link>
        <Link to="/analysis" className={`${isAnalysis ? 'text-[#831AE3]' : 'text-white/40'}`}><BarChart2 size={22} /></Link>
        <div className="text-white/40"><User size={22} /></div>
        <div className="text-white/40"><Settings size={22} /></div>
      </nav>
    </>
  );
};

const NavItem = ({ to, isActive, Icon, label }) => (
  <Link 
    to={to} 
    className={`${isActive ? 'text-white' : 'text-white/30'} hover:text-white cursor-pointer active:scale-95 transition-all relative group`}
  >
    <Icon size={20} />
    <span className="absolute left-[60px] top-0 hidden rounded-md bg-[#0A0A0A] px-3 py-1.5 text-xs font-bold text-white shadow-xl translate-x-[-10px] group-hover:flex group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100 whitespace-nowrap border border-white/5">
      {label}
    </span>
  </Link>
);

export default Sidebar;
