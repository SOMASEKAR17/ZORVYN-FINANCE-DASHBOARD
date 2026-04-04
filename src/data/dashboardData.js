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
    }
  },
  card: {
    brand: "Zorvyn",
    number: "1253 5432 3521 3090",
    expiry: "06/2028"
  },
  currencies: [
    {
      code: "USD",
      name: "US Dollar",
      get amount() { return dashboardData.calculated.balance; },
      flag: "https://flagcdn.com/w40/us.png",
      rate: "1"
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      get amount() { return (dashboardData.calculated.balanceRaw * 151.4).toLocaleString('en-US', { maximumFractionDigits: 0 }); },
      flag: "https://flagcdn.com/w40/jp.png",
      rate: "151.4"
    }
  ],
  get activities() {
    // Generate sample aggregations from transactions for the chart
    const txs = this.transactions.slice(0, 30); // Use last 30 for chart
    const monthlyGroups = {};
    txs.forEach(t => {
      const date = new Date(t.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      monthlyGroups[date] = (monthlyGroups[date] || 0) + Math.abs(parseAmount(t.amount));
    });
    return Object.entries(monthlyGroups)
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }))
      .reverse();
  },
  savings: {
    get total() { return dashboardData.calculated.savings; },
    categories: [
      { icon: '✈️', label: 'Traveling' },
      { icon: '🛍️', label: 'Shopping' },
      { icon: '🎓', label: 'Education' },
      { icon: '🆘', label: 'Emergency' },
    ]
  },
  transactions: [
    {
      id: 1,
      title: 'Salary Credit',
      type: 'Salary',
      time: '1/1/2025',
      amount: '+$4654.00',
      neg: false,
      category: 'Income'
    },
    {
      id: 2,
      title: 'Salary Credit',
      type: 'Salary',
      time: '2/1/2025',
      amount: '+$3406.00',
      neg: false,
      category: 'Income'
    },
    {
      id: 3,
      title: 'Salary Credit',
      type: 'Salary',
      time: '3/1/2025',
      amount: '+$4651.00',
      neg: false,
      category: 'Income'
    },
    {
      id: 4,
      title: 'Salary Credit',
      type: 'Salary',
      time: '4/1/2025',
      amount: '+$4437.00',
      neg: false,
      category: 'Income'
    },
    {
      id: 5,
      title: 'Stock Dividend',
      type: 'Investment',
      time: '2/24/2026, 8:53:14 AM',
      amount: '+$4.35',
      neg: false,
      category: 'Income'
    },
    {
      id: 6,
      title: 'Freelance Payment',
      type: 'Freelance',
      time: '3/19/2026, 10:54:10 PM',
      amount: '+$12.96',
      neg: false,
      category: 'Income'
    },
    {
      id: 7,
      title: 'Flight Booking',
      type: 'Travel',
      time: '3/23/2026, 11:43:53 AM',
      amount: '-$239.38',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 8,
      title: 'Cashback Reward',
      type: 'Rewards',
      time: '12/30/2025, 6:44:50 AM',
      amount: '+$33.79',
      neg: false,
      category: 'Income'
    },
    {
      id: 9,
      title: 'Spotify Premium',
      type: 'Subscription',
      time: '1/20/2026, 2:22:59 AM',
      amount: '-$6.21',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 10,
      title: 'Received from Friend',
      type: 'Peer Transfer',
      time: '2/15/2026, 8:31:12 PM',
      amount: '+$9.11',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 11,
      title: 'Refund Received',
      type: 'Refund',
      time: '3/23/2026, 3:00:20 AM',
      amount: '+$177.84',
      neg: false,
      category: 'Income'
    },
    {
      id: 12,
      title: 'Pharmacy Purchase',
      type: 'Healthcare',
      time: '3/7/2026, 8:14:59 PM',
      amount: '-$194.51',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 13,
      title: 'Received from Friend',
      type: 'Peer Transfer',
      time: '2/2/2026, 8:25:58 AM',
      amount: '+$95.98',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 14,
      title: 'Cashback Reward',
      type: 'Rewards',
      time: '12/10/2025, 10:56:59 PM',
      amount: '+$151.56',
      neg: false,
      category: 'Income'
    },
    {
      id: 15,
      title: 'Movie Tickets',
      type: 'Entertainment',
      time: '3/31/2026, 2:37:23 PM',
      amount: '-$291.52',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 16,
      title: 'Internet Bill',
      type: 'Telecom',
      time: '3/4/2026, 1:34:15 AM',
      amount: '-$207.59',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 17,
      title: 'Amazon Order',
      type: 'Online Shopping',
      time: '1/7/2026, 1:19:58 AM',
      amount: '-$170.23',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 18,
      title: 'EMI Payment',
      type: 'Loan Repayment',
      time: '12/18/2025, 11:32:25 PM',
      amount: '-$62.61',
      neg: true,
      category: 'Debt'
    },
    {
      id: 19,
      title: 'Laptop Purchase',
      type: 'Electronics',
      time: '12/27/2025, 3:40:03 PM',
      amount: '-$141.72',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 20,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '2/26/2026, 10:24:38 PM',
      amount: '+$160.83',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 21,
      title: 'Cashback Reward',
      type: 'Rewards',
      time: '3/23/2026, 2:47:59 PM',
      amount: '+$297.99',
      neg: false,
      category: 'Income'
    },
    {
      id: 22,
      title: 'UPI to Friend',
      type: 'Peer Transfer',
      time: '12/31/2025, 7:30:46 AM',
      amount: '+$33.87',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 23,
      title: 'Amazon Order',
      type: 'Online Shopping',
      time: '3/30/2026, 10:07:06 AM',
      amount: '-$120.76',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 24,
      title: 'Pharmacy Purchase',
      type: 'Healthcare',
      time: '1/26/2026, 7:04:40 AM',
      amount: '-$288.12',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 25,
      title: 'Laptop Purchase',
      type: 'Electronics',
      time: '12/20/2025, 6:52:34 AM',
      amount: '-$20.61',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 26,
      title: 'Grocery Store',
      type: 'Groceries',
      time: '1/30/2026, 7:36:34 AM',
      amount: '-$178.30',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 27,
      title: 'Movie Tickets',
      type: 'Entertainment',
      time: '3/19/2026, 5:50:06 AM',
      amount: '-$243.97',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 28,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '3/26/2026, 5:40:50 PM',
      amount: '-$244.06',
      neg: true,
      category: 'Debt'
    },
    {
      id: 29,
      title: 'Water Bill',
      type: 'Utilities',
      time: '4/3/2026, 8:45:55 AM',
      amount: '-$198.24',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 30,
      title: 'Water Bill',
      type: 'Utilities',
      time: '1/13/2026, 12:42:12 AM',
      amount: '-$106.91',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 31,
      title: 'Laptop Purchase',
      type: 'Electronics',
      time: '1/17/2026, 6:44:12 PM',
      amount: '-$35.25',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 32,
      title: 'Freelance Payment',
      type: 'Freelance',
      time: '1/17/2026, 8:11:38 AM',
      amount: '+$68.04',
      neg: false,
      category: 'Income'
    },
    {
      id: 33,
      title: 'Laptop Purchase',
      type: 'Electronics',
      time: '2/13/2026, 3:36:53 PM',
      amount: '-$18.33',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 34,
      title: 'Electricity Bill',
      type: 'Utilities',
      time: '2/11/2026, 6:03:15 PM',
      amount: '-$190.87',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 35,
      title: 'Mobile Recharge',
      type: 'Telecom',
      time: '3/30/2026, 6:23:29 AM',
      amount: '-$164.59',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 36,
      title: 'Cashback Reward',
      type: 'Rewards',
      time: '1/18/2026, 11:32:17 PM',
      amount: '+$79.19',
      neg: false,
      category: 'Income'
    },
    {
      id: 37,
      title: 'Stock Dividend',
      type: 'Investment',
      time: '12/14/2025, 2:34:09 AM',
      amount: '+$180.62',
      neg: false,
      category: 'Income'
    },
    {
      id: 38,
      title: 'Petrol Pump',
      type: 'Fuel',
      time: '1/1/2026, 2:52:27 AM',
      amount: '-$106.88',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 39,
      title: 'Spotify Premium',
      type: 'Subscription',
      time: '2/28/2026, 4:09:30 PM',
      amount: '-$21.90',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 40,
      title: 'Received from Friend',
      type: 'Peer Transfer',
      time: '12/18/2025, 11:51:43 PM',
      amount: '+$128.38',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 41,
      title: 'Electricity Bill',
      type: 'Utilities',
      time: '12/29/2025, 11:51:40 AM',
      amount: '-$84.78',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 42,
      title: 'Swiggy Food',
      type: 'Food Delivery',
      time: '12/26/2025, 2:39:50 PM',
      amount: '-$114.69',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 43,
      title: 'Netflix Subscription',
      type: 'Subscription',
      time: '3/17/2026, 6:07:59 AM',
      amount: '-$92.78',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 44,
      title: 'Uber Ride',
      type: 'Transport',
      time: '1/13/2026, 2:45:51 PM',
      amount: '-$208.51',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 45,
      title: 'Netflix Subscription',
      type: 'Subscription',
      time: '2/27/2026, 7:03:44 AM',
      amount: '-$252.22',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 46,
      title: 'UPI to Friend',
      type: 'Peer Transfer',
      time: '1/25/2026, 5:18:54 PM',
      amount: '+$142.90',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 47,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '1/5/2026, 3:22:56 AM',
      amount: '-$273.71',
      neg: true,
      category: 'Debt'
    },
    {
      id: 48,
      title: 'Petrol Pump',
      type: 'Fuel',
      time: '1/9/2026, 1:13:33 AM',
      amount: '-$119.59',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 49,
      title: 'Spotify Premium',
      type: 'Subscription',
      time: '1/27/2026, 4:28:29 PM',
      amount: '-$60.19',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 50,
      title: 'Refund Received',
      type: 'Refund',
      time: '1/18/2026, 9:24:06 AM',
      amount: '+$284.43',
      neg: false,
      category: 'Income'
    },
    {
      id: 51,
      title: 'Received from Friend',
      type: 'Peer Transfer',
      time: '1/29/2026, 5:10:59 PM',
      amount: '+$260.05',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 52,
      title: 'Pharmacy Purchase',
      type: 'Healthcare',
      time: '3/18/2026, 12:26:14 AM',
      amount: '-$69.13',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 53,
      title: 'Gym Membership',
      type: 'Fitness',
      time: '12/9/2025, 9:46:46 AM',
      amount: '-$240.27',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 54,
      title: 'Amazon Order',
      type: 'Online Shopping',
      time: '3/3/2026, 4:56:49 AM',
      amount: '-$136.12',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 55,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '1/23/2026, 11:06:55 PM',
      amount: '+$51.08',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 56,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '3/31/2026, 3:35:48 PM',
      amount: '+$279.68',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 57,
      title: 'Interest Credit',
      type: 'Bank Interest',
      time: '1/6/2026, 5:50:51 PM',
      amount: '+$93.88',
      neg: false,
      category: 'Income'
    },
    {
      id: 58,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '2/16/2026, 1:04:54 AM',
      amount: '+$14.06',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 59,
      title: 'Netflix Subscription',
      type: 'Subscription',
      time: '2/13/2026, 10:04:01 AM',
      amount: '-$78.29',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 60,
      title: 'Electricity Bill',
      type: 'Utilities',
      time: '3/31/2026, 1:06:33 AM',
      amount: '-$15.75',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 61,
      title: 'Movie Tickets',
      type: 'Entertainment',
      time: '2/6/2026, 3:44:26 AM',
      amount: '-$251.93',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 62,
      title: 'Pharmacy Purchase',
      type: 'Healthcare',
      time: '1/24/2026, 1:12:41 PM',
      amount: '-$102.86',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 63,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '3/26/2026, 8:50:12 AM',
      amount: '-$252.60',
      neg: true,
      category: 'Debt'
    },
    {
      id: 64,
      title: 'Freelance Payment',
      type: 'Freelance',
      time: '3/28/2026, 12:40:19 AM',
      amount: '+$58.39',
      neg: false,
      category: 'Income'
    },
    {
      id: 65,
      title: 'Water Bill',
      type: 'Utilities',
      time: '1/17/2026, 7:41:20 PM',
      amount: '-$210.06',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 66,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '12/14/2025, 11:16:57 AM',
      amount: '+$53.55',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 67,
      title: 'Amazon Order',
      type: 'Online Shopping',
      time: '3/16/2026, 12:33:09 PM',
      amount: '-$285.64',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 68,
      title: 'Clothing Store',
      type: 'Fashion',
      time: '12/15/2025, 1:22:28 AM',
      amount: '-$45.45',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 69,
      title: 'Refund Received',
      type: 'Refund',
      time: '1/5/2026, 5:32:09 AM',
      amount: '+$120.58',
      neg: false,
      category: 'Income'
    },
    {
      id: 70,
      title: 'Electricity Bill',
      type: 'Utilities',
      time: '4/2/2026, 9:24:39 AM',
      amount: '-$125.19',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 71,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '3/4/2026, 10:18:27 AM',
      amount: '+$286.93',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 72,
      title: 'Mobile Recharge',
      type: 'Telecom',
      time: '1/22/2026, 1:20:00 AM',
      amount: '-$298.86',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 73,
      title: 'Hotel Booking',
      type: 'Travel',
      time: '12/27/2025, 4:13:47 PM',
      amount: '-$214.09',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 74,
      title: 'Cashback Reward',
      type: 'Rewards',
      time: '2/23/2026, 10:02:00 PM',
      amount: '+$225.20',
      neg: false,
      category: 'Income'
    },
    {
      id: 75,
      title: 'Transfer to Savings',
      type: 'Bank Transfer',
      time: '2/18/2026, 6:29:06 PM',
      amount: '+$121.94',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 76,
      title: 'Laptop Purchase',
      type: 'Electronics',
      time: '1/11/2026, 11:41:29 PM',
      amount: '-$256.36',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 77,
      title: 'Amazon Order',
      type: 'Online Shopping',
      time: '1/21/2026, 10:31:11 AM',
      amount: '-$294.22',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 78,
      title: 'Zomato Order',
      type: 'Food Delivery',
      time: '3/21/2026, 6:14:48 PM',
      amount: '-$122.73',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 79,
      title: 'Water Bill',
      type: 'Utilities',
      time: '12/23/2025, 2:02:04 AM',
      amount: '-$57.05',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 80,
      title: 'Grocery Store',
      type: 'Groceries',
      time: '12/12/2025, 7:23:11 PM',
      amount: '-$37.12',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 81,
      title: 'Hotel Booking',
      type: 'Travel',
      time: '2/3/2026, 1:50:36 PM',
      amount: '-$207.60',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 82,
      title: 'Petrol Pump',
      type: 'Fuel',
      time: '3/7/2026, 1:17:41 AM',
      amount: '-$111.86',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 83,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '12/24/2025, 10:18:31 PM',
      amount: '-$16.32',
      neg: true,
      category: 'Debt'
    },
    {
      id: 84,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '3/4/2026, 12:02:35 PM',
      amount: '-$156.18',
      neg: true,
      category: 'Debt'
    },
    {
      id: 85,
      title: 'UPI to Friend',
      type: 'Peer Transfer',
      time: '12/9/2025, 9:51:57 PM',
      amount: '+$238.56',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 86,
      title: 'Flight Booking',
      type: 'Travel',
      time: '2/10/2026, 1:20:56 PM',
      amount: '-$79.79',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 87,
      title: 'Refund Received',
      type: 'Refund',
      time: '12/25/2025, 2:40:59 PM',
      amount: '+$205.55',
      neg: false,
      category: 'Income'
    },
    {
      id: 88,
      title: 'EMI Payment',
      type: 'Loan Repayment',
      time: '2/3/2026, 12:50:40 AM',
      amount: '-$291.52',
      neg: true,
      category: 'Debt'
    },
    {
      id: 89,
      title: 'Pharmacy Purchase',
      type: 'Healthcare',
      time: '3/12/2026, 3:57:09 PM',
      amount: '-$136.73',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 90,
      title: 'Uber Ride',
      type: 'Transport',
      time: '2/10/2026, 7:37:43 AM',
      amount: '-$59.75',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 91,
      title: 'Interest Credit',
      type: 'Bank Interest',
      time: '3/13/2026, 1:56:40 AM',
      amount: '+$273.91',
      neg: false,
      category: 'Income'
    },
    {
      id: 92,
      title: 'Doctor Visit',
      type: 'Healthcare',
      time: '12/29/2025, 11:28:21 PM',
      amount: '-$148.27',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 93,
      title: 'Mobile Recharge',
      type: 'Telecom',
      time: '12/24/2025, 8:49:28 AM',
      amount: '-$9.90',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 94,
      title: 'Grocery Store',
      type: 'Groceries',
      time: '1/14/2026, 12:09:39 PM',
      amount: '-$270.12',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 95,
      title: 'Zomato Order',
      type: 'Food Delivery',
      time: '2/14/2026, 5:45:45 AM',
      amount: '-$114.12',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 96,
      title: 'Credit Card Bill',
      type: 'Card Payment',
      time: '1/18/2026, 10:33:49 PM',
      amount: '-$136.11',
      neg: true,
      category: 'Debt'
    },
    {
      id: 97,
      title: 'Internet Bill',
      type: 'Telecom',
      time: '1/5/2026, 1:17:25 AM',
      amount: '-$82.46',
      neg: true,
      category: 'Expenses'
    },
    {
      id: 98,
      title: 'Interest Credit',
      type: 'Bank Interest',
      time: '2/22/2026, 12:31:43 PM',
      amount: '+$70.65',
      neg: false,
      category: 'Income'
    },
    {
      id: 99,
      title: 'Received from Friend',
      type: 'Peer Transfer',
      time: '3/21/2026, 9:59:58 AM',
      amount: '+$297.02',
      neg: false,
      category: 'Transfer'
    },
    {
      id: 100,
      title: 'Water Bill',
      type: 'Utilities',
      time: '1/16/2026, 7:22:43 PM',
      amount: '-$248.37',
      neg: true,
      category: 'Expenses'
    }
  ]
};
