import React, { useState, useEffect } from 'react';
import { dashboardData } from '../../data/dashboardData';
import { Plus, X } from 'lucide-react';

const FLAG_MAP = {
  USD: "https://flagcdn.com/w40/us.png",
  EUR: "https://flagcdn.com/w40/eu.png",
  GBP: "https://flagcdn.com/w40/gb.png",
  JPY: "https://flagcdn.com/w40/jp.png",
  CAD: "https://flagcdn.com/w40/ca.png",
  AUD: "https://flagcdn.com/w40/au.png",
  INR: "https://flagcdn.com/w40/in.png"
};

const CurrencyList = () => {
  const [rates, setRates] = useState({});
  const [tracked, setTracked] = useState(['USD', 'EUR', 'GBP', 'JPY']);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => setRates(data.rates || {}))
      .catch(err => console.error('Currency fetch failed:', err));
  }, []);

  const addCurrency = (code) => {
    if (!tracked.includes(code)) setTracked([...tracked, code]);
    setIsAdding(false);
  };

  const removeCurrency = (code) => {
    if (code === 'USD') return;
    setTracked(tracked.filter(c => c !== code));
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-[#ECEEF1] shadow-sm relative overflow-visible">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-black text-sm uppercase tracking-tight text-[#0A0A0A]">Live Market</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#831AE3]/5 p-2 rounded-xl text-[#831AE3] hover:bg-[#831AE3]/10 transition-all border border-[#831AE3]/10"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-[10px] font-bold text-[#818F9B] mb-8 uppercase tracking-widest">
        Live USD Rates • Last Updated Today
      </p>

      {isAdding && (
        <div className="absolute top-20 right-8 z-50 bg-[#0A0A0A] p-4 rounded-2xl shadow-2xl border border-white/10 w-48">
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(FLAG_MAP).filter(c => !tracked.includes(c)).map(code => (
              <button 
                key={code}
                onClick={() => addCurrency(code)}
                className="text-[10px] font-black text-white hover:text-[#831AE3] py-2 border border-white/5 rounded-lg uppercase tracking-tighter"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {tracked.map((code) => {
          const rate = rates[code] || 1;
          const rateToUSD = 1 / rate;
          const displayRate = rateToUSD.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: rateToUSD < 0.1 ? 4 : 2,
            maximumFractionDigits: rateToUSD < 0.1 ? 4 : 2,
          });

          return (
            <div key={code} className="group relative flex flex-col gap-4 p-4 rounded-2xl border border-[#ECEEF1] hover:border-[#831AE3]/20 transition-all">
              {code !== 'USD' && (
                <button 
                  onClick={() => removeCurrency(code)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-[#ECEEF1] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} className="text-[#818F9B]" />
                </button>
              )}
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ECEEF1] shadow-inner p-1 bg-[#F4F7F6]">
                <img src={FLAG_MAP[code]} alt={code} className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tighter text-[#0A0A0A]">{displayRate}</div>
                <div className="text-[10px] text-[#818F9B] font-black uppercase tracking-widest">{code} / USD</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencyList;
