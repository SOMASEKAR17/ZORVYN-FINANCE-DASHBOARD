const parseAmount = (amt) => parseFloat(amt.replace(/[$,+]/g, ''));

const calculateBalance = (txs) => txs.reduce((acc, t) => acc + parseAmount(t.amount), 0);
const calculateSavings = (txs) => txs.filter(t => t.category === 'Transfer').reduce((acc, t) => acc + parseAmount(t.amount), 0);

export const dashboardData = {
  get calculated() {
    const txs = this.transactions;
    const balance = calculateBalance(txs);
    const savingsTotal = calculateSavings(txs);
    const lastInc = txs.filter(t => t.category === 'Income')[0];
    
    return {
      balance: balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      balanceRaw: balance,
      savings: savingsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 }),
      lastIncome: lastInc
    };
  },
  user: {
    name: "Somasekar Naidu",
    get balance() { return dashboardData.calculated.balance.split('.')[0]; },
    get balanceFraction() { return dashboardData.calculated.balance.split('.')[1] || '00'; },
    get lastTransaction() {
      const inc = dashboardData.calculated.lastIncome;
      return {
        amount: inc.amount,
        sender: inc.title.split(' ')[0].toLowerCase(),
        time: inc.time.split(',')[0]
      };