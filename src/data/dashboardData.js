const parseAmount = (amt) => parseFloat(amt.replace(/[$,+]/g, ''));

const calculateBalance = (txs) => txs.reduce((acc, t) => acc + parseAmount(t.amount), 0);
const calculateSavings = (txs) => txs.filter(t => t.title.includes('Savings')).reduce((acc, t) => acc - parseAmount(t.amount), 0);

export const dashboardData = {
  get calculated() {
    const txs = this.transactions;
    const balance = calculateBalance(txs);
    const savingsTotal = calculateSavings(txs);
    const lastInc = txs.filter(t => t.category === 'Income')[0];

    return {
      balance: balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      balanceRaw: balance,
      savings: savingsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
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
    const allTxs = this.transactions;
    if (!allTxs.length) return [];
    
    // Use the current system date for "This Month"
    const now = new Date();
    const targetMonth = now.getMonth();
    const targetYear = now.getFullYear();
    
    // Filter transactions for this month/year
    const thisMonthTxs = allTxs.filter(t => {
      const d = new Date(t.time);
      return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
    });

    // Group by day number to handle sorting easily
    const dayGroups = {};
    thisMonthTxs.forEach(t => {
      const d = new Date(t.time).getDate();
      dayGroups[d] = (dayGroups[d] || 0) + Math.abs(parseAmount(t.amount));
    });

    // Format for chart and sort by day
    return Object.entries(dayGroups)
      .map(([day, value]) => ({ 
        name: `${now.toLocaleString('default', { month: 'short' })} ${day}`, 
        dayNum: parseInt(day), 
        value 
      }))
      .sort((a, b) => a.dayNum - b.dayNum)
      .map(({name, value}) => ({ name, value }));
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
      "id": 1,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "1/1/2024, 10:58:48 am",
      "amount": "+$4843.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 2,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/4/2024, 4:05:06 pm",
      "amount": "-$60.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 3,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "1/1/2024, 8:47:29 am",
      "amount": "-$69.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 4,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "1/6/2024, 1:50:41 pm",
      "amount": "-$46.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 5,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/2/2024, 1:17:55 pm",
      "amount": "-$39.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 6,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "1/5/2024, 4:04:16 pm",
      "amount": "-$12.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 7,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "1/8/2024, 2:51:29 pm",
      "amount": "-$11.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 8,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/4/2024, 12:33:32 pm",
      "amount": "-$52.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 9,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/1/2024, 10:06:09 am",
      "amount": "-$52.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 10,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "1/2/2024, 5:33:37 pm",
      "amount": "-$63.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 11,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "1/5/2024, 6:52:15 pm",
      "amount": "-$31.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 12,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/6/2024, 7:21:41 pm",
      "amount": "-$47.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 13,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/7/2024, 10:12:55 am",
      "amount": "-$60.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 14,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "1/9/2024, 11:18:31 am",
      "amount": "-$19.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 15,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/11/2024, 10:29:06 pm",
      "amount": "-$41.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 16,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "1/13/2024, 1:46:56 pm",
      "amount": "-$326.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 17,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "1/14/2024, 8:09:37 am",
      "amount": "-$95.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 18,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/16/2024, 10:39:48 am",
      "amount": "-$17.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 19,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/17/2024, 5:48:12 pm",
      "amount": "-$66.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 20,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/18/2024, 7:41:25 pm",
      "amount": "-$77.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 21,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/20/2024, 10:03:50 am",
      "amount": "-$53.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 22,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "1/21/2024, 12:08:45 pm",
      "amount": "-$215.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 23,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "1/21/2024, 7:30:05 pm",
      "amount": "+$47.24",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 24,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "1/22/2024, 9:58:20 am",
      "amount": "-$94.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 25,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/23/2024, 6:03:03 pm",
      "amount": "-$52.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 26,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "1/23/2024, 5:56:41 pm",
      "amount": "+$419.25",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 27,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "1/24/2024, 12:45:18 pm",
      "amount": "-$68.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 28,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/25/2024, 3:10:40 pm",
      "amount": "-$24.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 29,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/27/2024, 8:47:05 am",
      "amount": "-$45.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 30,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/28/2024, 10:40:04 am",
      "amount": "-$170.19",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 31,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "1/25/2024, 5:10:50 pm",
      "amount": "-$319.97",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 32,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "2/1/2024, 9:18:14 am",
      "amount": "+$4573.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 33,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "2/3/2024, 3:54:42 pm",
      "amount": "-$154.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 34,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "2/2/2024, 3:37:43 pm",
      "amount": "-$45.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 35,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/7/2024, 2:26:18 pm",
      "amount": "-$52.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 36,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "2/1/2024, 3:10:27 pm",
      "amount": "-$16.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 37,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/6/2024, 11:42:14 am",
      "amount": "-$12.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 38,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/7/2024, 4:54:55 pm",
      "amount": "-$9.92",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 39,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/3/2024, 4:14:49 pm",
      "amount": "-$26.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 40,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/3/2024, 2:17:27 pm",
      "amount": "-$58.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 41,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/5/2024, 11:45:15 am",
      "amount": "-$21.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 42,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "2/7/2024, 1:48:56 pm",
      "amount": "-$41.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 43,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "2/10/2024, 12:43:11 pm",
      "amount": "-$159.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 44,
      "title": "Laptop Purchase",
      "type": "Electronics",
      "time": "2/11/2024, 4:09:01 pm",
      "amount": "-$1133.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 45,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "2/13/2024, 10:57:38 pm",
      "amount": "-$323.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 46,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "2/24/2024, 4:40:46 pm",
      "amount": "-$324.88",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 47,
      "title": "UPI to Friend",
      "type": "Peer Transfer",
      "time": "2/19/2024, 11:49:10 am",
      "amount": "-$166.63",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 48,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "3/1/2024, 9:33:34 am",
      "amount": "+$5698.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 49,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "3/2/2024, 8:36:55 am",
      "amount": "-$153.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 50,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/4/2024, 8:37:01 am",
      "amount": "-$54.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 51,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/5/2024, 7:54:27 pm",
      "amount": "-$30.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 52,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/1/2024, 12:39:45 pm",
      "amount": "-$18.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 53,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "3/5/2024, 8:46:04 am",
      "amount": "-$10.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 54,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/6/2024, 9:54:07 am",
      "amount": "-$11.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 55,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/4/2024, 4:09:13 pm",
      "amount": "-$40.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 56,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "3/9/2024, 11:54:35 am",
      "amount": "+$448.34",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 57,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "3/13/2024, 10:39:14 am",
      "amount": "-$33.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 58,
      "title": "Refund Received",
      "type": "Refund",
      "time": "3/15/2024, 11:05:49 am",
      "amount": "+$126.44",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 59,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/16/2024, 11:05:53 am",
      "amount": "-$57.47",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 60,
      "title": "Hotel Booking",
      "type": "Travel",
      "time": "3/17/2024, 3:06:44 pm",
      "amount": "-$461.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 61,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "3/18/2024, 10:48:20 pm",
      "amount": "-$35.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 62,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "3/19/2024, 5:11:01 pm",
      "amount": "-$50.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 63,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/22/2024, 3:33:17 pm",
      "amount": "-$33.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 64,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "3/27/2024, 2:35:57 pm",
      "amount": "-$395.94",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 65,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "4/1/2024, 9:23:54 am",
      "amount": "+$6378.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 66,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/2/2024, 11:18:55 am",
      "amount": "-$129.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 67,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "4/2/2024, 1:41:23 pm",
      "amount": "-$56.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 68,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "4/5/2024, 2:04:23 pm",
      "amount": "-$30.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 69,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/4/2024, 9:27:31 am",
      "amount": "-$31.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 70,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/5/2024, 1:14:11 pm",
      "amount": "-$11.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 71,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/5/2024, 8:11:13 am",
      "amount": "-$8.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 72,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/4/2024, 3:04:12 pm",
      "amount": "-$45.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 73,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/1/2024, 3:23:18 pm",
      "amount": "-$23.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 74,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/2/2024, 11:21:58 am",
      "amount": "-$49.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 75,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "4/8/2024, 6:58:31 pm",
      "amount": "+$70.31",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 76,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/16/2024, 12:27:16 pm",
      "amount": "-$15.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 77,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "4/19/2024, 10:35:20 am",
      "amount": "+$277.48",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 78,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "4/20/2024, 1:31:26 pm",
      "amount": "+$1446.21",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 79,
      "title": "Laptop Purchase",
      "type": "Electronics",
      "time": "4/22/2024, 7:41:37 pm",
      "amount": "-$237.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 80,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/24/2024, 8:28:29 pm",
      "amount": "-$18.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 81,
      "title": "Hotel Booking",
      "type": "Travel",
      "time": "4/27/2024, 2:28:35 pm",
      "amount": "-$408.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 82,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "4/28/2024, 11:41:45 am",
      "amount": "-$104.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 83,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "4/21/2024, 11:42:48 am",
      "amount": "-$324.76",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 84,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "5/1/2024, 10:47:05 am",
      "amount": "+$5568.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 85,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/2/2024, 8:53:32 am",
      "amount": "-$114.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 86,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/4/2024, 1:48:28 pm",
      "amount": "-$41.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 87,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/4/2024, 5:12:36 pm",
      "amount": "-$54.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 88,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "5/3/2024, 7:02:51 pm",
      "amount": "-$25.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 89,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "5/6/2024, 8:06:06 am",
      "amount": "-$11.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 90,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "5/7/2024, 1:11:07 pm",
      "amount": "-$11.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 91,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "5/2/2024, 1:33:16 pm",
      "amount": "-$26.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 92,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/7/2024, 12:37:37 pm",
      "amount": "-$49.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 93,
      "title": "Refund Received",
      "type": "Refund",
      "time": "5/8/2024, 11:31:22 am",
      "amount": "+$138.53",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 94,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "5/9/2024, 6:43:52 pm",
      "amount": "-$18.55",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 95,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "5/10/2024, 3:14:12 pm",
      "amount": "-$108.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 96,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "5/11/2024, 8:25:48 am",
      "amount": "-$110.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 97,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "5/13/2024, 9:19:42 am",
      "amount": "-$372.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 98,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "5/17/2024, 6:36:32 pm",
      "amount": "-$107.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 99,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/25/2024, 2:34:24 pm",
      "amount": "-$40.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 100,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "5/26/2024, 8:18:20 am",
      "amount": "-$47.47",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 101,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "5/24/2024, 3:20:43 pm",
      "amount": "-$156.87",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 102,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "6/1/2024, 10:03:07 am",
      "amount": "+$5736.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 103,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/4/2024, 7:45:24 pm",
      "amount": "-$98.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 104,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "6/4/2024, 6:19:42 pm",
      "amount": "-$41.95",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 105,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/3/2024, 3:17:01 pm",
      "amount": "-$27.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 106,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/4/2024, 4:22:38 pm",
      "amount": "-$23.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 107,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/7/2024, 11:47:23 am",
      "amount": "-$10.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 108,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/8/2024, 5:15:54 pm",
      "amount": "-$10.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 109,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/4/2024, 4:26:14 pm",
      "amount": "-$40.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 110,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/1/2024, 2:55:44 pm",
      "amount": "-$38.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 111,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "6/2/2024, 4:26:47 pm",
      "amount": "-$43.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 112,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "6/3/2024, 6:56:56 pm",
      "amount": "-$256.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 113,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "6/3/2024, 9:31:49 am",
      "amount": "+$108.18",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 114,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "6/7/2024, 7:27:22 pm",
      "amount": "-$209.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 115,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "6/8/2024, 2:23:32 pm",
      "amount": "-$162.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 116,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "6/9/2024, 10:30:22 am",
      "amount": "-$46.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 117,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/12/2024, 10:47:45 am",
      "amount": "-$96.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 118,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "6/13/2024, 3:56:17 pm",
      "amount": "-$102.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 119,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/15/2024, 11:47:28 am",
      "amount": "-$43.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 120,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/16/2024, 12:57:32 pm",
      "amount": "-$28.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 121,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/17/2024, 3:27:02 pm",
      "amount": "-$30.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 122,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "6/18/2024, 4:14:02 pm",
      "amount": "-$81.17",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 123,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/19/2024, 11:09:06 am",
      "amount": "-$21.92",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 124,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/22/2024, 12:45:51 pm",
      "amount": "-$35.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 125,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "6/23/2024, 11:41:18 am",
      "amount": "-$62.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 126,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "6/28/2024, 7:43:30 pm",
      "amount": "-$42.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 127,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "6/27/2024, 9:39:34 am",
      "amount": "-$167.50",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 128,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "6/21/2024, 8:16:38 am",
      "amount": "-$103.67",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 129,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "6/7/2024, 9:32:10 pm",
      "amount": "+$82.29",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 130,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "7/1/2024, 8:58:51 am",
      "amount": "+$5010.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 131,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/4/2024, 10:28:03 am",
      "amount": "-$122.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 132,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/4/2024, 5:57:12 pm",
      "amount": "-$68.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 133,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/5/2024, 9:02:09 am",
      "amount": "-$23.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 134,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "7/1/2024, 6:01:49 pm",
      "amount": "-$16.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 135,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/8/2024, 5:38:29 pm",
      "amount": "-$15.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 136,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/8/2024, 5:22:37 pm",
      "amount": "-$6.61",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 137,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/4/2024, 10:46:56 am",
      "amount": "-$34.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 138,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "7/1/2024, 1:13:06 pm",
      "amount": "-$115.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 139,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/2/2024, 10:47:14 pm",
      "amount": "-$16.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 140,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "7/11/2024, 12:04:17 pm",
      "amount": "+$54.58",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 141,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "7/12/2024, 9:21:42 am",
      "amount": "+$54.72",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 142,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/14/2024, 6:15:50 pm",
      "amount": "-$12.98",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 143,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "7/17/2024, 7:17:28 pm",
      "amount": "+$356.01",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 144,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "7/18/2024, 10:40:23 am",
      "amount": "-$52.18",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 145,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/23/2024, 9:10:16 am",
      "amount": "-$22.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 146,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "7/24/2024, 10:33:37 am",
      "amount": "-$310.30",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 147,
      "title": "UPI to Friend",
      "type": "Peer Transfer",
      "time": "7/7/2024, 8:18:01 pm",
      "amount": "-$101.33",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 148,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "8/1/2024, 10:26:32 am",
      "amount": "+$6762.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 149,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "8/3/2024, 1:13:52 pm",
      "amount": "-$131.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 150,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "8/5/2024, 12:33:21 pm",
      "amount": "-$24.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 151,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/4/2024, 7:37:48 pm",
      "amount": "-$30.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 152,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/3/2024, 7:20:34 pm",
      "amount": "-$30.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 153,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "8/9/2024, 12:51:14 pm",
      "amount": "-$10.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 154,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "8/5/2024, 4:26:20 pm",
      "amount": "-$11.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 155,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "8/2/2024, 1:41:08 pm",
      "amount": "-$37.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 156,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "8/1/2024, 9:32:52 am",
      "amount": "-$69.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 157,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "8/2/2024, 10:25:11 pm",
      "amount": "-$216.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 158,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "8/3/2024, 9:00:46 am",
      "amount": "-$47.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 159,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/7/2024, 9:06:11 am",
      "amount": "-$90.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 160,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/9/2024, 1:09:06 pm",
      "amount": "-$80.18",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 161,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "8/10/2024, 10:26:48 pm",
      "amount": "-$125.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 162,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/12/2024, 7:01:52 pm",
      "amount": "-$10.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 163,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "8/14/2024, 9:22:02 pm",
      "amount": "-$25.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 164,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "8/19/2024, 8:17:54 pm",
      "amount": "-$206.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 165,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "8/19/2024, 10:25:58 am",
      "amount": "+$1657.45",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 166,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/20/2024, 12:53:09 pm",
      "amount": "-$142.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 167,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/21/2024, 5:38:03 pm",
      "amount": "-$34.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 168,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "8/24/2024, 2:32:52 pm",
      "amount": "-$50.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 169,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "8/26/2024, 4:02:24 pm",
      "amount": "-$59.82",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 170,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "8/25/2024, 12:22:18 pm",
      "amount": "-$460.20",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 171,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "9/1/2024, 10:21:53 am",
      "amount": "+$7409.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 172,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "9/3/2024, 11:43:53 am",
      "amount": "-$70.74",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 173,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "9/2/2024, 9:33:17 am",
      "amount": "-$67.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 174,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "9/7/2024, 3:30:17 pm",
      "amount": "-$29.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 175,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/1/2024, 8:06:53 am",
      "amount": "-$29.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 176,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "9/7/2024, 7:24:31 pm",
      "amount": "-$11.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 177,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "9/5/2024, 8:37:07 am",
      "amount": "-$11.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 178,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "9/4/2024, 11:50:41 am",
      "amount": "-$39.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 179,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "9/1/2024, 8:05:29 am",
      "amount": "-$363.31",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 180,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/3/2024, 2:00:58 pm",
      "amount": "-$42.19",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 181,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "9/7/2024, 11:28:49 am",
      "amount": "-$310.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 182,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "9/8/2024, 6:11:22 pm",
      "amount": "-$395.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 183,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "9/9/2024, 4:08:47 pm",
      "amount": "-$47.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 184,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "9/11/2024, 2:47:27 pm",
      "amount": "-$34.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 185,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/13/2024, 4:48:19 pm",
      "amount": "-$28.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 186,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/14/2024, 10:33:36 am",
      "amount": "-$37.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 187,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "9/14/2024, 11:07:30 am",
      "amount": "+$73.48",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 188,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "9/17/2024, 10:25:31 am",
      "amount": "-$597.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 189,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "9/19/2024, 2:54:32 pm",
      "amount": "-$229.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 190,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/21/2024, 12:49:29 pm",
      "amount": "-$25.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 191,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "9/22/2024, 11:09:31 am",
      "amount": "-$91.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 192,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "9/23/2024, 12:40:14 pm",
      "amount": "-$97.18",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 193,
      "title": "Refund Received",
      "type": "Refund",
      "time": "9/23/2024, 2:15:28 pm",
      "amount": "+$74.23",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 194,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/24/2024, 8:30:05 pm",
      "amount": "-$74.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 195,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "9/25/2024, 10:09:05 pm",
      "amount": "-$173.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 196,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/27/2024, 12:29:24 pm",
      "amount": "-$37.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 197,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "9/28/2024, 12:28:10 pm",
      "amount": "-$170.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 198,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "9/24/2024, 12:01:33 pm",
      "amount": "-$384.43",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 199,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "9/24/2024, 9:20:15 am",
      "amount": "-$214.51",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 200,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "10/1/2024, 8:21:45 am",
      "amount": "+$6241.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 201,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "10/1/2024, 11:18:05 am",
      "amount": "-$146.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 202,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "10/1/2024, 6:20:08 pm",
      "amount": "-$53.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 203,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "10/6/2024, 9:01:30 am",
      "amount": "-$52.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 204,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/1/2024, 1:34:12 pm",
      "amount": "-$18.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 205,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "10/6/2024, 11:38:24 am",
      "amount": "-$14.82",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 206,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/6/2024, 11:08:51 am",
      "amount": "-$10.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 207,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "10/2/2024, 1:46:18 pm",
      "amount": "-$35.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 208,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "10/10/2024, 9:53:46 pm",
      "amount": "-$108.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 209,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/11/2024, 12:31:56 pm",
      "amount": "-$43.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 210,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "10/16/2024, 12:43:55 pm",
      "amount": "+$558.31",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 211,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "10/22/2024, 10:07:39 pm",
      "amount": "-$13.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 212,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "10/25/2024, 10:16:28 am",
      "amount": "-$391.56",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 213,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "11/1/2024, 10:28:38 am",
      "amount": "+$5572.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 214,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "11/2/2024, 8:34:03 am",
      "amount": "-$69.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 215,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "11/4/2024, 4:41:50 pm",
      "amount": "-$57.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 216,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "11/7/2024, 7:04:08 pm",
      "amount": "-$20.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 217,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/4/2024, 7:44:41 pm",
      "amount": "-$35.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 218,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/9/2024, 2:35:16 pm",
      "amount": "-$11.18",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 219,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "11/6/2024, 10:51:32 am",
      "amount": "-$11.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 220,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "11/2/2024, 12:47:03 pm",
      "amount": "-$49.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 221,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "11/3/2024, 10:01:31 am",
      "amount": "-$294.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 222,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "11/4/2024, 9:38:12 am",
      "amount": "-$47.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 223,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "11/5/2024, 4:00:16 pm",
      "amount": "-$27.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 224,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "11/6/2024, 9:42:23 am",
      "amount": "-$16.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 225,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "11/7/2024, 8:25:41 am",
      "amount": "-$11.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 226,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "11/7/2024, 4:12:05 pm",
      "amount": "+$17.83",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 227,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "11/8/2024, 11:18:09 am",
      "amount": "-$81.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 228,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/9/2024, 4:16:02 pm",
      "amount": "-$38.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 229,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/10/2024, 8:35:01 am",
      "amount": "-$25.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 230,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/11/2024, 10:30:19 pm",
      "amount": "-$23.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 231,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "11/12/2024, 8:46:49 pm",
      "amount": "-$31.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 232,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "11/13/2024, 9:43:41 pm",
      "amount": "-$22.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 233,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "11/14/2024, 9:12:47 am",
      "amount": "+$142.38",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 234,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "11/15/2024, 9:23:04 am",
      "amount": "-$22.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 235,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "11/16/2024, 1:33:53 pm",
      "amount": "-$58.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 236,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "11/17/2024, 6:32:42 pm",
      "amount": "-$69.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 237,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "11/19/2024, 4:48:12 pm",
      "amount": "-$40.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 238,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "11/22/2024, 7:15:43 pm",
      "amount": "-$158.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 239,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "11/24/2024, 9:36:04 pm",
      "amount": "-$419.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 240,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "11/25/2024, 2:17:20 pm",
      "amount": "-$73.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 241,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "11/26/2024, 9:14:35 pm",
      "amount": "-$234.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 242,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/27/2024, 9:17:30 pm",
      "amount": "-$44.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 243,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "11/24/2024, 8:02:41 am",
      "amount": "-$206.70",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 244,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "12/1/2024, 8:58:56 am",
      "amount": "+$5754.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 245,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "12/3/2024, 6:32:37 pm",
      "amount": "-$66.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 246,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "12/3/2024, 8:39:39 am",
      "amount": "-$26.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 247,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "12/5/2024, 8:49:48 am",
      "amount": "-$43.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 248,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "12/4/2024, 4:27:36 pm",
      "amount": "-$16.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 249,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "12/5/2024, 9:54:09 am",
      "amount": "-$11.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 250,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/7/2024, 3:53:37 pm",
      "amount": "-$8.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 251,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "12/3/2024, 8:25:17 am",
      "amount": "-$38.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 252,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "12/1/2024, 9:51:37 am",
      "amount": "-$283.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 253,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "12/4/2024, 11:54:35 am",
      "amount": "+$1570.46",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 254,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "12/5/2024, 10:00:11 am",
      "amount": "+$19.42",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 255,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "12/6/2024, 9:23:03 am",
      "amount": "-$118.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 256,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "12/7/2024, 5:22:34 pm",
      "amount": "+$75.82",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 257,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "12/10/2024, 8:45:48 am",
      "amount": "-$50.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 258,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "12/13/2024, 9:21:14 pm",
      "amount": "-$48.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 259,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "12/14/2024, 10:11:06 am",
      "amount": "-$31.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 260,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "12/16/2024, 11:30:54 am",
      "amount": "-$116.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 261,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "12/18/2024, 3:55:32 pm",
      "amount": "-$150.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 262,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "12/19/2024, 9:41:57 am",
      "amount": "-$16.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 263,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "12/21/2024, 3:34:36 pm",
      "amount": "-$39.31",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 264,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "12/25/2024, 3:39:01 pm",
      "amount": "-$283.50",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 265,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "12/24/2024, 11:19:23 am",
      "amount": "-$156.55",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 266,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "12/23/2024, 7:57:36 pm",
      "amount": "+$75.60",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 267,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "1/1/2025, 8:47:01 am",
      "amount": "+$5735.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 268,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/2/2025, 12:57:00 pm",
      "amount": "-$70.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 269,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "1/2/2025, 7:17:49 pm",
      "amount": "-$26.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 270,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "1/7/2025, 3:57:38 pm",
      "amount": "-$37.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 271,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/2/2025, 1:28:06 pm",
      "amount": "-$18.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 272,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "1/6/2025, 5:02:35 pm",
      "amount": "-$15.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 273,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "1/6/2025, 2:10:27 pm",
      "amount": "-$11.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 274,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/2/2025, 2:37:33 pm",
      "amount": "-$29.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 275,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/3/2025, 2:03:39 pm",
      "amount": "-$254.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 276,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "1/4/2025, 10:27:36 pm",
      "amount": "-$63.17",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 277,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "1/7/2025, 7:57:45 pm",
      "amount": "-$209.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 278,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "1/12/2025, 5:43:41 pm",
      "amount": "-$19.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 279,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "1/15/2025, 5:47:38 pm",
      "amount": "-$64.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 280,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/17/2025, 7:09:00 pm",
      "amount": "-$61.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 281,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/21/2025, 11:38:57 am",
      "amount": "-$26.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 282,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/25/2025, 9:36:55 am",
      "amount": "-$19.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 283,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "1/25/2025, 10:11:33 am",
      "amount": "+$1087.46",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 284,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "1/27/2025, 1:09:48 pm",
      "amount": "+$1185.71",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 285,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "1/24/2025, 12:36:22 pm",
      "amount": "-$184.64",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 286,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "1/23/2025, 12:32:28 pm",
      "amount": "-$50.75",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 287,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "1/26/2025, 2:47:11 pm",
      "amount": "-$196.09",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 288,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "2/1/2025, 8:05:30 am",
      "amount": "+$7484.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 289,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "2/3/2025, 10:40:54 am",
      "amount": "-$72.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 290,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "2/1/2025, 10:51:16 am",
      "amount": "-$57.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 291,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/6/2025, 12:16:15 pm",
      "amount": "-$46.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 292,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "2/1/2025, 9:50:48 am",
      "amount": "-$25.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 293,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/5/2025, 4:31:43 pm",
      "amount": "-$15.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 294,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/8/2025, 3:11:46 pm",
      "amount": "-$10.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 295,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/3/2025, 6:41:30 pm",
      "amount": "-$47.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 296,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/1/2025, 8:51:39 am",
      "amount": "-$37.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 297,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "2/2/2025, 9:48:08 am",
      "amount": "-$373.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 298,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/4/2025, 6:33:13 pm",
      "amount": "-$17.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 299,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/5/2025, 8:30:15 am",
      "amount": "-$14.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 300,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/6/2025, 7:30:28 pm",
      "amount": "-$11.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 301,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/7/2025, 7:04:18 pm",
      "amount": "-$11.47",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 302,
      "title": "Refund Received",
      "type": "Refund",
      "time": "2/7/2025, 5:32:34 pm",
      "amount": "+$23.53",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 303,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "2/8/2025, 9:11:08 pm",
      "amount": "-$95.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 304,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "2/11/2025, 9:10:13 am",
      "amount": "-$147.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 305,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "2/13/2025, 6:05:40 pm",
      "amount": "-$169.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 306,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "2/14/2025, 7:17:49 pm",
      "amount": "-$47.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 307,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/15/2025, 9:39:04 am",
      "amount": "-$20.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 308,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "2/15/2025, 2:04:44 pm",
      "amount": "+$36.81",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 309,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/16/2025, 5:58:24 pm",
      "amount": "-$16.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 310,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "2/20/2025, 10:08:40 am",
      "amount": "-$77.66",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 311,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "2/21/2025, 3:25:08 pm",
      "amount": "+$32.98",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 312,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "2/22/2025, 6:27:14 pm",
      "amount": "-$225.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 313,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/25/2025, 2:05:08 pm",
      "amount": "-$42.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 314,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "2/26/2025, 8:10:13 pm",
      "amount": "-$11.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 315,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "2/26/2025, 9:25:41 am",
      "amount": "-$116.75",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 316,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "2/26/2025, 12:40:44 pm",
      "amount": "-$142.03",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 317,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "2/26/2025, 2:37:07 pm",
      "amount": "-$82.47",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 318,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "3/1/2025, 10:18:24 am",
      "amount": "+$4678.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 319,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "3/1/2025, 6:05:19 pm",
      "amount": "-$147.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 320,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/2/2025, 12:28:57 pm",
      "amount": "-$22.19",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 321,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/4/2025, 7:25:27 pm",
      "amount": "-$23.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 322,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/3/2025, 8:16:53 am",
      "amount": "-$23.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 323,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "3/5/2025, 4:55:05 pm",
      "amount": "-$17.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 324,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/6/2025, 12:41:45 pm",
      "amount": "-$12.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 325,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/4/2025, 7:21:28 pm",
      "amount": "-$38.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 326,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "3/13/2025, 8:50:41 pm",
      "amount": "-$282.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 327,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/14/2025, 10:52:14 am",
      "amount": "-$171.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 328,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "3/19/2025, 2:29:48 pm",
      "amount": "+$217.94",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 329,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/21/2025, 1:16:37 pm",
      "amount": "-$92.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 330,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "3/25/2025, 9:28:38 am",
      "amount": "-$276.79",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 331,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "3/26/2025, 5:22:40 pm",
      "amount": "-$224.89",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 332,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "3/27/2025, 11:08:25 am",
      "amount": "-$128.37",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 333,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "3/3/2025, 2:15:18 pm",
      "amount": "+$43.23",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 334,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "4/1/2025, 10:25:25 am",
      "amount": "+$6871.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 335,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/2/2025, 3:47:08 pm",
      "amount": "-$104.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 336,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "4/2/2025, 3:06:44 pm",
      "amount": "-$62.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 337,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "4/4/2025, 7:52:28 pm",
      "amount": "-$33.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 338,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/1/2025, 1:17:56 pm",
      "amount": "-$16.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 339,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/7/2025, 8:00:37 am",
      "amount": "-$17.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 340,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/5/2025, 12:47:53 pm",
      "amount": "-$7.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 341,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/2/2025, 7:24:32 pm",
      "amount": "-$40.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 342,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "4/2/2025, 2:43:36 pm",
      "amount": "-$27.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 343,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "4/4/2025, 3:09:53 pm",
      "amount": "-$24.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 344,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/5/2025, 9:15:50 pm",
      "amount": "-$12.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 345,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "4/6/2025, 6:16:10 pm",
      "amount": "-$183.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 346,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "4/8/2025, 2:37:00 pm",
      "amount": "-$109.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 347,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/9/2025, 8:21:13 am",
      "amount": "-$8.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 348,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "4/10/2025, 5:46:22 pm",
      "amount": "-$25.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 349,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/11/2025, 1:12:25 pm",
      "amount": "-$38.92",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 350,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "4/12/2025, 1:21:33 pm",
      "amount": "-$58.01",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 351,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "4/13/2025, 1:15:39 pm",
      "amount": "-$110.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 352,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/14/2025, 11:03:24 am",
      "amount": "-$85.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 353,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "4/15/2025, 8:26:32 am",
      "amount": "-$30.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 354,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "4/15/2025, 9:11:44 am",
      "amount": "+$78.53",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 355,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "4/17/2025, 7:55:12 pm",
      "amount": "+$603.50",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 356,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "4/19/2025, 9:30:07 am",
      "amount": "-$32.52",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 357,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "4/19/2025, 3:19:28 pm",
      "amount": "+$1018.24",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 358,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "4/20/2025, 9:41:23 pm",
      "amount": "-$72.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 359,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/22/2025, 5:14:10 pm",
      "amount": "-$73.17",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 360,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "4/24/2025, 9:23:21 pm",
      "amount": "-$96.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 361,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/26/2025, 1:19:53 pm",
      "amount": "-$15.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 362,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/27/2025, 8:32:34 pm",
      "amount": "-$11.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 363,
      "title": "Refund Received",
      "type": "Refund",
      "time": "4/27/2025, 9:55:46 am",
      "amount": "+$53.96",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 364,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "4/27/2025, 1:30:24 pm",
      "amount": "-$170.82",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 365,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "4/23/2025, 3:17:14 pm",
      "amount": "-$349.56",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 366,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "4/25/2025, 9:11:25 am",
      "amount": "-$80.42",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 367,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "5/1/2025, 9:37:03 am",
      "amount": "+$5561.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 368,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/4/2025, 12:07:28 pm",
      "amount": "-$132.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 369,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/1/2025, 4:15:24 pm",
      "amount": "-$67.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 370,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/5/2025, 9:08:03 am",
      "amount": "-$28.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 371,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "5/2/2025, 10:11:53 am",
      "amount": "-$37.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 372,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "5/8/2025, 9:01:22 am",
      "amount": "-$10.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 373,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "5/5/2025, 3:11:38 pm",
      "amount": "-$5.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 374,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "5/4/2025, 5:27:44 pm",
      "amount": "-$48.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 375,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "5/1/2025, 2:51:05 pm",
      "amount": "-$9.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 376,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "5/3/2025, 6:13:00 pm",
      "amount": "-$6.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 377,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "5/4/2025, 8:25:11 pm",
      "amount": "-$66.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 378,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "5/10/2025, 9:56:27 am",
      "amount": "-$40.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 379,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/12/2025, 12:41:53 pm",
      "amount": "-$153.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 380,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/14/2025, 6:49:38 pm",
      "amount": "-$158.82",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 381,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "5/15/2025, 11:27:18 am",
      "amount": "-$59.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 382,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "5/16/2025, 11:22:49 am",
      "amount": "-$263.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 383,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "5/17/2025, 10:03:39 pm",
      "amount": "-$61.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 384,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "5/18/2025, 8:52:32 pm",
      "amount": "-$60.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 385,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "5/20/2025, 10:57:08 am",
      "amount": "-$65.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 386,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "5/22/2025, 12:42:26 pm",
      "amount": "-$235.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 387,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "5/24/2025, 4:27:56 pm",
      "amount": "-$46.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 388,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "5/25/2025, 12:57:49 pm",
      "amount": "-$200.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 389,
      "title": "Refund Received",
      "type": "Refund",
      "time": "5/25/2025, 4:28:15 pm",
      "amount": "+$130.41",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 390,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "5/26/2025, 10:32:20 pm",
      "amount": "-$63.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 391,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "5/27/2025, 5:44:58 pm",
      "amount": "-$20.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 392,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "5/24/2025, 3:56:33 pm",
      "amount": "-$228.19",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 393,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "5/22/2025, 12:32:35 pm",
      "amount": "-$151.87",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 394,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "5/27/2025, 4:32:43 pm",
      "amount": "-$86.40",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 395,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "6/1/2025, 9:58:19 am",
      "amount": "+$7073.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 396,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/1/2025, 5:53:44 pm",
      "amount": "-$67.82",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 397,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "6/3/2025, 12:36:38 pm",
      "amount": "-$20.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 398,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/3/2025, 9:29:39 am",
      "amount": "-$41.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 399,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/2/2025, 1:12:44 pm",
      "amount": "-$24.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 400,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/8/2025, 1:52:14 pm",
      "amount": "-$14.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 401,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/7/2025, 12:54:46 pm",
      "amount": "-$11.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 402,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/4/2025, 9:53:45 am",
      "amount": "-$35.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 403,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "6/2/2025, 8:43:27 am",
      "amount": "-$27.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 404,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/6/2025, 5:30:48 pm",
      "amount": "-$6.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 405,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "6/6/2025, 4:58:35 pm",
      "amount": "+$43.22",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 406,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/7/2025, 4:54:26 pm",
      "amount": "-$59.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 407,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "6/12/2025, 10:45:18 pm",
      "amount": "-$148.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 408,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "6/12/2025, 5:50:04 pm",
      "amount": "+$116.62",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 409,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "6/13/2025, 3:54:28 pm",
      "amount": "+$45.77",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 410,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/14/2025, 12:56:20 pm",
      "amount": "-$61.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 411,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "6/15/2025, 6:56:43 pm",
      "amount": "-$313.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 412,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "6/16/2025, 5:44:48 pm",
      "amount": "-$44.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 413,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "6/17/2025, 9:11:09 am",
      "amount": "+$440.38",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 414,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "6/19/2025, 6:10:24 pm",
      "amount": "-$59.61",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 415,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "6/21/2025, 9:09:58 pm",
      "amount": "-$140.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 416,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "6/27/2025, 8:44:33 pm",
      "amount": "-$48.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 417,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "6/26/2025, 1:18:05 pm",
      "amount": "-$175.24",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 418,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "7/1/2025, 8:09:31 am",
      "amount": "+$5854.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 419,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/3/2025, 2:00:39 pm",
      "amount": "-$156.66",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 420,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/2/2025, 6:26:51 pm",
      "amount": "-$51.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 421,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/6/2025, 6:19:50 pm",
      "amount": "-$37.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 422,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "7/3/2025, 10:16:07 am",
      "amount": "-$18.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 423,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/8/2025, 2:46:44 pm",
      "amount": "-$14.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 424,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/8/2025, 1:10:00 pm",
      "amount": "-$12.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 425,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/1/2025, 9:43:53 am",
      "amount": "-$45.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 426,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/1/2025, 11:56:41 am",
      "amount": "-$33.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 427,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "7/1/2025, 11:28:34 am",
      "amount": "+$62.87",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 428,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/2/2025, 9:52:09 am",
      "amount": "-$34.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 429,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/5/2025, 11:25:02 am",
      "amount": "-$10.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 430,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "7/6/2025, 1:05:40 pm",
      "amount": "-$65.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 431,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "7/8/2025, 9:50:12 am",
      "amount": "+$65.35",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 432,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "7/12/2025, 9:33:29 am",
      "amount": "-$154.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 433,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "7/12/2025, 9:40:22 am",
      "amount": "+$1092.46",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 434,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "7/13/2025, 4:27:24 pm",
      "amount": "-$257.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 435,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/19/2025, 12:42:25 pm",
      "amount": "-$36.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 436,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "7/20/2025, 5:03:12 pm",
      "amount": "-$40.50",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 437,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/24/2025, 8:18:40 am",
      "amount": "-$13.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 438,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "7/25/2025, 8:43:27 pm",
      "amount": "-$64.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 439,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "7/26/2025, 3:57:13 pm",
      "amount": "-$20.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 440,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/27/2025, 12:01:06 pm",
      "amount": "-$7.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 441,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "7/24/2025, 5:21:05 pm",
      "amount": "-$353.82",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 442,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "7/27/2025, 1:49:33 pm",
      "amount": "-$251.29",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 443,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "8/1/2025, 9:24:19 am",
      "amount": "+$6321.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 444,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "8/1/2025, 4:41:25 pm",
      "amount": "-$148.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 445,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "8/1/2025, 5:47:08 pm",
      "amount": "-$31.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 446,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/6/2025, 12:35:15 pm",
      "amount": "-$30.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 447,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/4/2025, 5:35:31 pm",
      "amount": "-$42.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 448,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "8/9/2025, 11:45:35 am",
      "amount": "-$15.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 449,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "8/7/2025, 9:03:32 am",
      "amount": "-$5.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 450,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "8/3/2025, 4:34:22 pm",
      "amount": "-$35.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 451,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/2/2025, 7:13:09 pm",
      "amount": "-$201.91",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 452,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "8/2/2025, 10:18:27 am",
      "amount": "+$721.84",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 453,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "8/4/2025, 6:08:24 pm",
      "amount": "-$134.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 454,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "8/9/2025, 1:24:58 pm",
      "amount": "-$176.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 455,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "8/10/2025, 9:55:55 am",
      "amount": "-$41.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 456,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "8/11/2025, 9:21:29 pm",
      "amount": "-$126.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 457,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "8/13/2025, 10:18:27 am",
      "amount": "-$178.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 458,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "8/14/2025, 4:05:05 pm",
      "amount": "-$19.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 459,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "8/15/2025, 9:06:24 pm",
      "amount": "-$87.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 460,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/16/2025, 2:30:49 pm",
      "amount": "-$53.01",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 461,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "8/21/2025, 6:37:18 pm",
      "amount": "-$158.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 462,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "8/24/2025, 2:01:16 pm",
      "amount": "-$31.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 463,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/25/2025, 4:14:00 pm",
      "amount": "-$278.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 464,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "8/28/2025, 10:27:55 pm",
      "amount": "-$75.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 465,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "9/1/2025, 10:34:56 am",
      "amount": "+$7090.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 466,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "9/2/2025, 12:58:45 pm",
      "amount": "-$146.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 467,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "9/4/2025, 11:12:29 am",
      "amount": "-$47.74",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 468,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "9/7/2025, 1:26:52 pm",
      "amount": "-$49.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 469,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/3/2025, 8:46:00 am",
      "amount": "-$20.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 470,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "9/8/2025, 12:06:29 pm",
      "amount": "-$15.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 471,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "9/5/2025, 4:40:36 pm",
      "amount": "-$11.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 472,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "9/2/2025, 6:12:01 pm",
      "amount": "-$38.82",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 473,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "9/2/2025, 11:25:47 am",
      "amount": "-$121.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 474,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "9/8/2025, 6:30:36 pm",
      "amount": "-$111.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 475,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/14/2025, 5:24:13 pm",
      "amount": "-$55.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 476,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/15/2025, 6:34:04 pm",
      "amount": "-$67.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 477,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "9/16/2025, 5:03:02 pm",
      "amount": "-$56.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 478,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "9/18/2025, 7:39:11 pm",
      "amount": "-$11.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 479,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "9/20/2025, 7:35:55 pm",
      "amount": "-$429.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 480,
      "title": "Refund Received",
      "type": "Refund",
      "time": "9/21/2025, 1:03:51 pm",
      "amount": "+$40.76",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 481,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "9/22/2025, 8:02:26 am",
      "amount": "-$84.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 482,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/24/2025, 10:56:13 am",
      "amount": "-$33.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 483,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "9/28/2025, 11:14:42 am",
      "amount": "-$54.74",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 484,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "9/24/2025, 5:56:48 pm",
      "amount": "-$401.16",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 485,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "9/24/2025, 12:17:22 pm",
      "amount": "-$139.80",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 486,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "10/1/2025, 9:18:25 am",
      "amount": "+$7420.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 487,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "10/1/2025, 5:37:27 pm",
      "amount": "-$78.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 488,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "10/3/2025, 1:21:00 pm",
      "amount": "-$41.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 489,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "10/7/2025, 4:42:36 pm",
      "amount": "-$39.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 490,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/2/2025, 11:54:45 am",
      "amount": "-$37.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 491,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "10/8/2025, 6:32:35 pm",
      "amount": "-$15.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 492,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/8/2025, 4:51:38 pm",
      "amount": "-$9.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 493,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "10/2/2025, 12:31:48 pm",
      "amount": "-$33.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 494,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "10/1/2025, 9:16:47 am",
      "amount": "+$41.61",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 495,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "10/4/2025, 4:46:51 pm",
      "amount": "-$21.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 496,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "10/7/2025, 12:38:26 pm",
      "amount": "-$39.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 497,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "10/8/2025, 8:13:58 pm",
      "amount": "-$44.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 498,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "10/9/2025, 1:04:54 pm",
      "amount": "-$43.17",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 499,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "10/13/2025, 9:27:01 pm",
      "amount": "-$20.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 500,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/17/2025, 5:50:50 pm",
      "amount": "-$10.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 501,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "10/18/2025, 2:20:55 pm",
      "amount": "-$277.01",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 502,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "10/19/2025, 2:20:53 pm",
      "amount": "-$56.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 503,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "10/21/2025, 6:36:26 pm",
      "amount": "-$55.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 504,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/23/2025, 7:52:02 pm",
      "amount": "-$14.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 505,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/24/2025, 1:46:50 pm",
      "amount": "-$20.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 506,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "10/24/2025, 5:07:18 pm",
      "amount": "+$953.01",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 507,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "10/25/2025, 11:17:45 am",
      "amount": "-$107.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 508,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "10/26/2025, 8:05:33 am",
      "amount": "-$173.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 509,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "10/25/2025, 3:22:56 pm",
      "amount": "-$139.32",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 510,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "10/20/2025, 4:16:46 pm",
      "amount": "-$88.06",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 511,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "10/27/2025, 9:16:42 am",
      "amount": "-$213.52",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 512,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "11/1/2025, 8:28:34 am",
      "amount": "+$6519.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 513,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "11/2/2025, 6:35:45 pm",
      "amount": "-$67.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 514,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "11/5/2025, 2:47:54 pm",
      "amount": "-$68.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 515,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "11/6/2025, 3:52:47 pm",
      "amount": "-$46.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 516,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/1/2025, 11:06:47 am",
      "amount": "-$38.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 517,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/7/2025, 12:01:00 pm",
      "amount": "-$17.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 518,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "11/6/2025, 3:51:27 pm",
      "amount": "-$11.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 519,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "11/3/2025, 6:40:46 pm",
      "amount": "-$52.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 520,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "11/2/2025, 1:45:24 pm",
      "amount": "-$90.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 521,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "11/3/2025, 2:36:43 pm",
      "amount": "+$254.01",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 522,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "11/6/2025, 10:09:04 am",
      "amount": "-$101.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 523,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "11/7/2025, 8:43:06 am",
      "amount": "-$60.01",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 524,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "11/13/2025, 2:39:22 pm",
      "amount": "+$348.24",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 525,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "11/14/2025, 8:40:32 am",
      "amount": "-$259.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 526,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "11/15/2025, 11:24:00 am",
      "amount": "-$27.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 527,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "11/19/2025, 10:19:11 am",
      "amount": "+$10.99",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 528,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "11/26/2025, 3:50:13 pm",
      "amount": "+$108.68",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 529,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/28/2025, 7:00:06 pm",
      "amount": "-$8.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 530,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "11/24/2025, 1:02:37 pm",
      "amount": "-$69.10",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 531,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "12/1/2025, 8:32:28 am",
      "amount": "+$7332.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 532,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "12/1/2025, 1:21:32 pm",
      "amount": "-$108.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 533,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "12/2/2025, 9:29:39 am",
      "amount": "-$36.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 534,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "12/3/2025, 5:21:49 pm",
      "amount": "-$41.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 535,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "12/3/2025, 1:00:37 pm",
      "amount": "-$17.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 536,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "12/5/2025, 7:43:16 pm",
      "amount": "-$12.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 537,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/5/2025, 8:43:57 am",
      "amount": "-$11.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 538,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "12/2/2025, 7:50:24 pm",
      "amount": "-$41.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 539,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "12/2/2025, 9:02:06 am",
      "amount": "-$279.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 540,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "12/2/2025, 12:03:38 pm",
      "amount": "+$47.57",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 541,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/3/2025, 4:04:46 pm",
      "amount": "-$10.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 542,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "12/6/2025, 2:32:57 pm",
      "amount": "-$111.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 543,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "12/7/2025, 7:58:35 pm",
      "amount": "-$70.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 544,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "12/9/2025, 10:46:29 am",
      "amount": "-$94.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 545,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "12/11/2025, 10:20:54 pm",
      "amount": "-$63.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 546,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "12/13/2025, 11:55:58 am",
      "amount": "-$117.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 547,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "12/14/2025, 5:05:28 pm",
      "amount": "-$8.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 548,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "12/18/2025, 1:03:43 pm",
      "amount": "-$29.14",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 549,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "12/18/2025, 6:08:33 pm",
      "amount": "+$357.70",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 550,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "12/19/2025, 8:23:16 am",
      "amount": "-$12.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 551,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "12/20/2025, 12:06:56 pm",
      "amount": "-$24.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 552,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "12/21/2025, 5:23:47 pm",
      "amount": "-$48.11",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 553,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/22/2025, 3:02:00 pm",
      "amount": "-$24.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 554,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "12/26/2025, 12:13:35 pm",
      "amount": "-$131.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 555,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/27/2025, 9:45:57 pm",
      "amount": "-$26.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 556,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "12/28/2025, 4:45:06 pm",
      "amount": "-$193.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 557,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "12/27/2025, 10:49:40 am",
      "amount": "-$131.11",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 558,
      "title": "UPI to Friend",
      "type": "Peer Transfer",
      "time": "12/11/2025, 7:07:20 pm",
      "amount": "-$138.85",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 559,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "1/1/2026, 9:30:50 am",
      "amount": "+$6001.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 560,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/3/2026, 11:19:45 am",
      "amount": "-$145.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 561,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "1/1/2026, 5:49:56 pm",
      "amount": "-$35.95",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 562,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "1/4/2026, 6:09:28 pm",
      "amount": "-$30.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 563,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/2/2026, 9:44:07 am",
      "amount": "-$32.14",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 564,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "1/8/2026, 11:11:44 am",
      "amount": "-$12.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 565,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "1/5/2026, 6:31:19 pm",
      "amount": "-$10.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 566,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/3/2026, 12:24:15 pm",
      "amount": "-$54.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 567,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/3/2026, 9:50:38 am",
      "amount": "-$162.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 568,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/4/2026, 6:09:38 pm",
      "amount": "-$283.18",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 569,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "1/5/2026, 6:07:04 pm",
      "amount": "-$10.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 570,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "1/6/2026, 9:18:48 pm",
      "amount": "-$40.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 571,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "1/7/2026, 2:38:20 pm",
      "amount": "+$77.56",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 572,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "1/8/2026, 9:03:17 pm",
      "amount": "-$110.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 573,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "1/10/2026, 9:49:21 am",
      "amount": "-$55.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 574,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "1/14/2026, 4:58:03 pm",
      "amount": "+$46.66",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 575,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/15/2026, 11:37:09 am",
      "amount": "-$224.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 576,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "1/16/2026, 7:50:47 pm",
      "amount": "-$234.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 577,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "1/18/2026, 1:54:34 pm",
      "amount": "-$59.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 578,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/20/2026, 11:25:08 am",
      "amount": "-$23.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 579,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/21/2026, 9:21:46 am",
      "amount": "-$46.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 580,
      "title": "Refund Received",
      "type": "Refund",
      "time": "1/21/2026, 9:12:25 am",
      "amount": "+$190.32",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 581,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "1/24/2026, 7:46:30 pm",
      "amount": "-$113.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 582,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "1/24/2026, 2:37:01 pm",
      "amount": "+$212.70",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 583,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "1/25/2026, 5:21:20 pm",
      "amount": "-$206.40",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 584,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "1/27/2026, 4:46:12 pm",
      "amount": "+$83.95",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 585,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "2/1/2026, 9:47:36 am",
      "amount": "+$5003.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 586,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "2/3/2026, 3:24:37 pm",
      "amount": "-$100.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 587,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "2/2/2026, 12:15:42 pm",
      "amount": "-$48.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 588,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/5/2026, 8:43:24 am",
      "amount": "-$52.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 589,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "2/4/2026, 7:56:17 pm",
      "amount": "-$38.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 590,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/6/2026, 2:04:31 pm",
      "amount": "-$11.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 591,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/5/2026, 9:27:33 am",
      "amount": "-$8.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 592,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/3/2026, 11:44:37 am",
      "amount": "-$46.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 593,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "2/2/2026, 8:27:43 am",
      "amount": "-$23.19",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 594,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "2/4/2026, 4:52:47 pm",
      "amount": "-$89.31",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 595,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "2/12/2026, 4:41:46 pm",
      "amount": "+$5.13",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 596,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/18/2026, 12:22:21 pm",
      "amount": "-$54.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 597,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "2/23/2026, 10:45:10 pm",
      "amount": "-$11.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 598,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "2/25/2026, 10:57:54 pm",
      "amount": "-$187.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 599,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "2/26/2026, 7:03:09 pm",
      "amount": "-$15.52",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 600,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "2/24/2026, 10:33:57 am",
      "amount": "-$292.85",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 601,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "3/1/2026, 8:08:10 am",
      "amount": "+$6276.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 602,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "3/4/2026, 3:34:02 pm",
      "amount": "-$142.55",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 603,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/4/2026, 6:04:56 pm",
      "amount": "-$30.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 604,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/3/2026, 5:07:18 pm",
      "amount": "-$29.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 605,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/3/2026, 6:45:15 pm",
      "amount": "-$16.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 606,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "3/9/2026, 10:31:47 am",
      "amount": "-$12.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 607,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/7/2026, 4:06:39 pm",
      "amount": "-$7.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 608,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/4/2026, 6:47:31 pm",
      "amount": "-$47.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 609,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "3/1/2026, 10:23:18 am",
      "amount": "-$12.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 610,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "3/3/2026, 10:05:49 am",
      "amount": "-$58.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 611,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "3/4/2026, 6:14:12 pm",
      "amount": "+$39.01",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 612,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "3/5/2026, 12:33:50 pm",
      "amount": "-$168.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 613,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/7/2026, 8:25:02 pm",
      "amount": "-$43.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 614,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "3/8/2026, 7:47:04 pm",
      "amount": "-$138.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 615,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "3/10/2026, 1:40:49 pm",
      "amount": "-$21.66",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 616,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "3/12/2026, 8:38:21 am",
      "amount": "-$68.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 617,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "3/15/2026, 5:53:24 pm",
      "amount": "-$115.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 618,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/20/2026, 4:41:43 pm",
      "amount": "-$17.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 619,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/22/2026, 2:23:46 pm",
      "amount": "-$37.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 620,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/25/2026, 3:56:37 pm",
      "amount": "-$12.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 621,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "3/26/2026, 4:39:08 pm",
      "amount": "+$1084.09",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 622,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "3/27/2026, 4:38:18 pm",
      "amount": "-$52.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 623,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "3/25/2026, 5:25:42 pm",
      "amount": "-$162.45",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 624,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "3/23/2026, 4:17:35 pm",
      "amount": "-$344.99",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 625,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "3/26/2026, 4:54:21 pm",
      "amount": "-$122.41",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 626,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "4/1/2026, 8:58:10 am",
      "amount": "+$6658.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 627,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/2/2026, 7:53:56 pm",
      "amount": "-$124.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 628,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "4/3/2026, 3:48:05 pm",
      "amount": "-$29.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 629,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "4/7/2026, 1:25:31 pm",
      "amount": "-$36.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 630,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/1/2026, 8:45:01 am",
      "amount": "-$37.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 631,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/9/2026, 12:38:03 pm",
      "amount": "-$14.91",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 632,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/7/2026, 5:23:26 pm",
      "amount": "-$5.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 633,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/3/2026, 3:16:25 pm",
      "amount": "-$42.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 634,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/2/2026, 11:07:12 am",
      "amount": "-$18.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 635,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "4/2/2026, 2:53:28 pm",
      "amount": "+$613.35",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 636,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "4/4/2026, 5:24:28 pm",
      "amount": "-$182.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 637,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "4/4/2026, 3:43:20 pm",
      "amount": "+$17.03",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 638,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "4/5/2026, 6:11:50 pm",
      "amount": "-$45.95",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 639,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "4/7/2026, 1:49:21 pm",
      "amount": "-$58.50",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 640,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "4/7/2026, 3:46:39 pm",
      "amount": "+$163.85",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 641,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "4/10/2026, 10:30:27 pm",
      "amount": "-$158.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 642,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "4/11/2026, 8:33:09 am",
      "amount": "-$131.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 643,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "4/12/2026, 7:02:50 pm",
      "amount": "-$382.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 644,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "4/15/2026, 9:08:04 am",
      "amount": "-$44.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 645,
      "title": "Laptop Purchase",
      "type": "Electronics",
      "time": "4/17/2026, 1:47:23 pm",
      "amount": "-$789.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 646,
      "title": "Hotel Booking",
      "type": "Travel",
      "time": "4/18/2026, 4:45:18 pm",
      "amount": "-$584.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 647,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/19/2026, 8:15:44 am",
      "amount": "-$29.61",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 648,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "4/21/2026, 2:29:41 pm",
      "amount": "-$105.63",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 649,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "4/24/2026, 10:32:13 am",
      "amount": "-$63.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 650,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "4/25/2026, 3:54:22 pm",
      "amount": "-$161.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 651,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "4/25/2026, 6:19:35 pm",
      "amount": "+$52.98",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 652,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/26/2026, 8:08:52 am",
      "amount": "-$22.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 653,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "4/25/2026, 5:08:18 pm",
      "amount": "-$376.98",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 654,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "5/1/2026, 8:51:03 am",
      "amount": "+$4735.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 655,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/1/2026, 6:06:35 pm",
      "amount": "-$149.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 656,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/4/2026, 12:56:15 pm",
      "amount": "-$39.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 657,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/3/2026, 2:29:31 pm",
      "amount": "-$42.61",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 658,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "5/2/2026, 3:34:15 pm",
      "amount": "-$29.66",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 659,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "5/6/2026, 6:33:35 pm",
      "amount": "-$15.55",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 660,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "5/8/2026, 4:28:15 pm",
      "amount": "-$12.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 661,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "5/2/2026, 1:42:36 pm",
      "amount": "-$53.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 662,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "5/1/2026, 6:07:28 pm",
      "amount": "-$623.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 663,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "5/16/2026, 1:44:26 pm",
      "amount": "-$175.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 664,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "5/16/2026, 1:35:12 pm",
      "amount": "+$405.02",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 665,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "5/28/2026, 5:01:49 pm",
      "amount": "-$15.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 666,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "5/24/2026, 11:56:26 am",
      "amount": "-$342.12",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 667,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "5/25/2026, 12:35:11 pm",
      "amount": "-$257.80",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 668,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "6/1/2026, 10:54:16 am",
      "amount": "+$5268.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 669,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/1/2026, 11:13:45 am",
      "amount": "-$136.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 670,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "6/5/2026, 11:50:31 am",
      "amount": "-$47.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 671,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/3/2026, 4:01:39 pm",
      "amount": "-$39.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 672,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/1/2026, 12:54:57 pm",
      "amount": "-$27.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 673,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/5/2026, 5:39:49 pm",
      "amount": "-$14.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 674,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/5/2026, 12:57:07 pm",
      "amount": "-$9.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 675,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/3/2026, 11:11:10 am",
      "amount": "-$26.81",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 676,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "6/3/2026, 1:08:23 pm",
      "amount": "+$83.27",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 677,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "6/4/2026, 10:42:04 am",
      "amount": "-$10.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 678,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "6/5/2026, 4:27:30 pm",
      "amount": "-$93.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 679,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/6/2026, 8:37:11 pm",
      "amount": "-$18.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 680,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/7/2026, 12:40:34 pm",
      "amount": "-$15.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 681,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "6/8/2026, 9:04:19 am",
      "amount": "-$38.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 682,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "6/8/2026, 4:28:15 pm",
      "amount": "+$81.88",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 683,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "6/10/2026, 4:04:56 pm",
      "amount": "-$102.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 684,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/11/2026, 2:12:27 pm",
      "amount": "-$6.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 685,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "6/13/2026, 11:20:27 am",
      "amount": "-$54.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 686,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/14/2026, 4:25:40 pm",
      "amount": "-$135.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 687,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "6/15/2026, 9:17:58 am",
      "amount": "-$90.55",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 688,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/16/2026, 10:40:12 pm",
      "amount": "-$38.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 689,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "6/17/2026, 10:58:16 am",
      "amount": "-$23.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 690,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/21/2026, 1:38:46 pm",
      "amount": "-$7.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 691,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "6/24/2026, 1:50:40 pm",
      "amount": "-$56.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 692,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "6/25/2026, 3:08:41 pm",
      "amount": "+$81.13",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 693,
      "title": "Flight Booking",
      "type": "Travel",
      "time": "6/27/2026, 9:17:32 pm",
      "amount": "-$823.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 694,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "6/28/2026, 12:02:25 pm",
      "amount": "-$47.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 695,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "6/25/2026, 3:56:16 pm",
      "amount": "-$237.95",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 696,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "6/22/2026, 8:19:36 am",
      "amount": "-$195.95",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 697,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "7/1/2026, 8:06:12 am",
      "amount": "+$7155.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 698,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/3/2026, 5:09:22 pm",
      "amount": "-$61.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 699,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/1/2026, 2:00:55 pm",
      "amount": "-$31.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 700,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/3/2026, 2:36:45 pm",
      "amount": "-$43.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 701,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "7/1/2026, 11:07:12 am",
      "amount": "-$43.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 702,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/6/2026, 6:21:37 pm",
      "amount": "-$10.52",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 703,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/8/2026, 5:55:05 pm",
      "amount": "-$11.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 704,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/3/2026, 10:48:30 am",
      "amount": "-$43.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 705,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "7/1/2026, 9:41:46 pm",
      "amount": "-$163.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 706,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/4/2026, 7:19:51 pm",
      "amount": "-$24.14",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 707,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/5/2026, 9:50:25 am",
      "amount": "-$159.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 708,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "7/7/2026, 2:55:58 pm",
      "amount": "-$268.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 709,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "7/8/2026, 8:47:07 pm",
      "amount": "-$66.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 710,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "7/10/2026, 10:38:46 am",
      "amount": "-$36.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 711,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/13/2026, 6:16:20 pm",
      "amount": "-$55.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 712,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "7/15/2026, 9:29:54 am",
      "amount": "-$38.47",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 713,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/17/2026, 9:20:48 am",
      "amount": "-$18.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 714,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "7/18/2026, 10:01:26 am",
      "amount": "-$250.29",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 715,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/19/2026, 12:49:12 pm",
      "amount": "-$29.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 716,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "7/20/2026, 8:33:46 am",
      "amount": "-$47.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 717,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/22/2026, 3:13:30 pm",
      "amount": "-$109.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 718,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "7/22/2026, 3:18:53 pm",
      "amount": "+$62.18",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 719,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "7/24/2026, 10:46:53 am",
      "amount": "-$39.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 720,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "7/25/2026, 8:27:50 pm",
      "amount": "-$96.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 721,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "7/26/2026, 4:03:01 pm",
      "amount": "-$204.98",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 722,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "7/26/2026, 3:09:53 pm",
      "amount": "-$295.36",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 723,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "7/21/2026, 10:47:00 am",
      "amount": "-$339.85",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 724,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "7/26/2026, 11:35:37 am",
      "amount": "-$194.79",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 725,
      "title": "UPI to Friend",
      "type": "Peer Transfer",
      "time": "7/18/2026, 5:44:39 pm",
      "amount": "-$125.64",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 726,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "8/1/2026, 9:01:05 am",
      "amount": "+$6569.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 727,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "8/4/2026, 7:02:52 pm",
      "amount": "-$112.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 728,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "8/5/2026, 1:12:28 pm",
      "amount": "-$66.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 729,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/5/2026, 8:33:42 am",
      "amount": "-$25.14",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 730,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/1/2026, 6:46:02 pm",
      "amount": "-$22.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 731,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "8/5/2026, 5:35:40 pm",
      "amount": "-$15.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 732,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "8/6/2026, 5:14:04 pm",
      "amount": "-$8.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 733,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "8/2/2026, 10:37:03 am",
      "amount": "-$34.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 734,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "8/6/2026, 5:20:10 pm",
      "amount": "-$31.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 735,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "8/7/2026, 10:07:01 am",
      "amount": "+$358.20",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 736,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "8/8/2026, 7:36:28 pm",
      "amount": "+$118.87",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 737,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "8/10/2026, 3:19:19 pm",
      "amount": "-$129.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 738,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/15/2026, 4:55:55 pm",
      "amount": "-$11.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 739,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/17/2026, 9:55:18 am",
      "amount": "-$42.63",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 740,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "8/21/2026, 8:38:14 pm",
      "amount": "-$31.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 741,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "8/27/2026, 9:13:40 am",
      "amount": "-$22.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 742,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "8/25/2026, 12:17:25 pm",
      "amount": "-$256.00",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 743,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "8/25/2026, 12:09:24 pm",
      "amount": "-$201.86",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 744,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "9/1/2026, 10:55:36 am",
      "amount": "+$6183.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 745,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "9/2/2026, 8:32:44 am",
      "amount": "-$71.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 746,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "9/3/2026, 1:48:10 pm",
      "amount": "-$37.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 747,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "9/7/2026, 2:28:16 pm",
      "amount": "-$39.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 748,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/1/2026, 6:29:37 pm",
      "amount": "-$43.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 749,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "9/9/2026, 4:16:14 pm",
      "amount": "-$13.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 750,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "9/6/2026, 9:53:15 am",
      "amount": "-$5.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 751,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "9/4/2026, 6:33:29 pm",
      "amount": "-$24.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 752,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "9/4/2026, 8:46:21 pm",
      "amount": "-$30.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 753,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "9/5/2026, 6:44:20 pm",
      "amount": "-$102.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 754,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "9/6/2026, 4:00:51 pm",
      "amount": "-$85.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 755,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/7/2026, 10:37:51 pm",
      "amount": "-$35.63",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 756,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "9/8/2026, 12:48:18 pm",
      "amount": "+$1420.43",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 757,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "9/15/2026, 4:42:22 pm",
      "amount": "-$38.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 758,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "9/21/2026, 9:13:42 pm",
      "amount": "-$14.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 759,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "9/25/2026, 4:30:35 pm",
      "amount": "-$69.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 760,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "9/26/2026, 9:29:41 pm",
      "amount": "-$29.46",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 761,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "9/25/2026, 10:28:13 am",
      "amount": "-$363.82",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 762,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "10/1/2026, 10:32:11 am",
      "amount": "+$4663.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 763,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "10/1/2026, 1:38:42 pm",
      "amount": "-$107.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 764,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "10/1/2026, 8:13:11 am",
      "amount": "-$35.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 765,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "10/5/2026, 10:45:36 am",
      "amount": "-$43.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 766,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/3/2026, 7:07:01 pm",
      "amount": "-$27.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 767,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "10/7/2026, 11:28:01 am",
      "amount": "-$11.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 768,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/6/2026, 2:09:31 pm",
      "amount": "-$5.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 769,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "10/3/2026, 2:15:41 pm",
      "amount": "-$34.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 770,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "10/1/2026, 6:24:37 pm",
      "amount": "-$29.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 771,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "10/2/2026, 12:41:34 pm",
      "amount": "-$89.05",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 772,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "10/3/2026, 2:55:05 pm",
      "amount": "-$61.28",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 773,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "10/6/2026, 10:03:55 am",
      "amount": "-$23.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 774,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "10/9/2026, 2:14:43 pm",
      "amount": "-$97.74",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 775,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "10/10/2026, 4:18:11 pm",
      "amount": "-$38.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 776,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "10/11/2026, 10:07:05 pm",
      "amount": "-$73.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 777,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "10/12/2026, 3:35:33 pm",
      "amount": "-$51.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 778,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "10/13/2026, 5:13:58 pm",
      "amount": "-$60.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 779,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/15/2026, 1:44:25 pm",
      "amount": "-$17.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 780,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "10/17/2026, 1:17:41 pm",
      "amount": "-$16.17",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 781,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "10/18/2026, 10:47:33 pm",
      "amount": "-$25.28",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 782,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "10/20/2026, 6:10:18 pm",
      "amount": "-$81.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 783,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "10/21/2026, 7:46:46 pm",
      "amount": "-$46.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 784,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "10/22/2026, 8:09:43 am",
      "amount": "-$98.92",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 785,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "10/23/2026, 3:49:28 pm",
      "amount": "-$26.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 786,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "10/24/2026, 10:39:39 am",
      "amount": "-$13.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 787,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "10/25/2026, 5:53:46 pm",
      "amount": "-$43.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 788,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "10/26/2026, 10:50:34 pm",
      "amount": "-$19.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 789,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "10/27/2026, 9:05:00 am",
      "amount": "-$80.67",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 790,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "10/28/2026, 12:18:04 pm",
      "amount": "-$77.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 791,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "10/24/2026, 5:10:21 pm",
      "amount": "-$143.50",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 792,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "10/21/2026, 11:36:12 am",
      "amount": "-$342.66",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 793,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "10/25/2026, 10:36:41 am",
      "amount": "-$141.34",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 794,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "10/7/2026, 6:48:44 pm",
      "amount": "+$39.68",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 795,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "11/1/2026, 9:21:52 am",
      "amount": "+$6210.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 796,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "11/3/2026, 6:38:20 pm",
      "amount": "-$133.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 797,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "11/1/2026, 4:12:30 pm",
      "amount": "-$29.97",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 798,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "11/3/2026, 11:19:54 am",
      "amount": "-$27.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 799,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "11/2/2026, 12:45:40 pm",
      "amount": "-$21.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 800,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/5/2026, 8:11:14 am",
      "amount": "-$10.55",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 801,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "11/8/2026, 6:43:31 pm",
      "amount": "-$8.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 802,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "11/3/2026, 2:56:32 pm",
      "amount": "-$25.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 803,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "11/1/2026, 11:33:06 am",
      "amount": "-$44.28",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 804,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "11/4/2026, 7:42:18 pm",
      "amount": "-$206.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 805,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "11/6/2026, 6:54:27 pm",
      "amount": "+$45.95",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 806,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "11/7/2026, 2:00:50 pm",
      "amount": "-$15.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 807,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "11/8/2026, 3:48:28 pm",
      "amount": "-$203.99",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 808,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "11/10/2026, 2:33:38 pm",
      "amount": "+$14.52",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 809,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "11/19/2026, 10:35:40 am",
      "amount": "-$51.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 810,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "11/23/2026, 6:05:26 pm",
      "amount": "-$36.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 811,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "11/27/2026, 12:27:12 pm",
      "amount": "+$17.29",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 812,
      "title": "Refund Received",
      "type": "Refund",
      "time": "11/28/2026, 9:40:49 am",
      "amount": "+$42.18",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 813,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "11/27/2026, 11:41:31 am",
      "amount": "-$202.92",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 814,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "12/1/2026, 10:54:51 am",
      "amount": "+$4597.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 815,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "12/3/2026, 4:40:10 pm",
      "amount": "-$157.36",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 816,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "12/3/2026, 1:54:09 pm",
      "amount": "-$57.41",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 817,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "12/4/2026, 11:22:06 am",
      "amount": "-$46.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 818,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "12/1/2026, 12:27:06 pm",
      "amount": "-$32.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 819,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "12/5/2026, 10:31:26 am",
      "amount": "-$12.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 820,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "12/7/2026, 6:24:20 pm",
      "amount": "-$9.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 821,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "12/1/2026, 1:00:26 pm",
      "amount": "-$28.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 822,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "12/1/2026, 6:27:40 pm",
      "amount": "-$150.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 823,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "12/2/2026, 3:50:22 pm",
      "amount": "-$43.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 824,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "12/4/2026, 8:55:22 am",
      "amount": "-$60.11",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 825,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "12/6/2026, 5:08:57 pm",
      "amount": "+$904.46",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 826,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "12/7/2026, 4:23:53 pm",
      "amount": "-$31.88",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 827,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "12/12/2026, 4:13:32 pm",
      "amount": "-$24.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 828,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "12/15/2026, 1:47:57 pm",
      "amount": "-$64.98",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 829,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "12/17/2026, 10:27:37 am",
      "amount": "-$120.07",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 830,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "12/18/2026, 2:51:00 pm",
      "amount": "-$42.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 831,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "12/19/2026, 10:34:14 am",
      "amount": "-$43.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 832,
      "title": "Refund Received",
      "type": "Refund",
      "time": "12/20/2026, 11:23:01 am",
      "amount": "+$97.36",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 833,
      "title": "Movie Tickets",
      "type": "Entertainment",
      "time": "12/22/2026, 6:24:57 pm",
      "amount": "-$46.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 834,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "12/27/2026, 1:11:10 pm",
      "amount": "-$103.20",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 835,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "12/26/2026, 2:46:30 pm",
      "amount": "-$327.31",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 836,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "12/27/2026, 2:33:32 pm",
      "amount": "-$220.36",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 837,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "1/1/2027, 10:25:36 am",
      "amount": "+$6604.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 838,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/3/2027, 8:29:30 am",
      "amount": "-$117.43",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 839,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "1/4/2027, 11:31:36 am",
      "amount": "-$31.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 840,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "1/5/2027, 9:24:29 am",
      "amount": "-$45.57",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 841,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "1/1/2027, 5:26:56 pm",
      "amount": "-$27.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 842,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "1/8/2027, 4:46:45 pm",
      "amount": "-$13.96",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 843,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "1/8/2027, 10:44:41 am",
      "amount": "-$7.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 844,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/4/2027, 12:56:44 pm",
      "amount": "-$49.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 845,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "1/9/2027, 6:12:11 pm",
      "amount": "-$82.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 846,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/13/2027, 12:12:50 pm",
      "amount": "-$46.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 847,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "1/17/2027, 12:13:54 pm",
      "amount": "-$185.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 848,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "1/24/2027, 1:51:19 pm",
      "amount": "+$74.04",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 849,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "1/26/2027, 9:55:35 am",
      "amount": "-$262.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 850,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "1/27/2027, 6:28:30 pm",
      "amount": "-$258.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 851,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "1/28/2027, 6:39:33 pm",
      "amount": "-$58.72",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 852,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "1/27/2027, 11:00:48 am",
      "amount": "-$142.90",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 853,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "1/25/2027, 5:52:51 pm",
      "amount": "-$209.60",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 854,
      "title": "Transfer to Savings",
      "type": "Bank Transfer",
      "time": "1/26/2027, 12:15:33 pm",
      "amount": "-$264.67",
      "neg": true,
      "category": "Transfer"
    },
    {
      "id": 855,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "2/1/2027, 9:16:47 am",
      "amount": "+$7132.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 856,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "2/3/2027, 11:44:27 am",
      "amount": "-$124.33",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 857,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "2/1/2027, 9:44:21 am",
      "amount": "-$50.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 858,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "2/6/2027, 6:26:32 pm",
      "amount": "-$54.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 859,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "2/1/2027, 7:24:16 pm",
      "amount": "-$36.91",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 860,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "2/5/2027, 10:15:31 am",
      "amount": "-$16.38",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 861,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "2/7/2027, 8:16:56 am",
      "amount": "-$11.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 862,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/3/2027, 2:28:47 pm",
      "amount": "-$47.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 863,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "2/2/2027, 9:21:47 pm",
      "amount": "-$98.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 864,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "2/4/2027, 3:07:31 pm",
      "amount": "-$37.94",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 865,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "2/5/2027, 10:20:03 pm",
      "amount": "-$69.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 866,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "2/6/2027, 6:51:16 pm",
      "amount": "-$363.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 867,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "2/7/2027, 4:01:55 pm",
      "amount": "+$24.96",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 868,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "2/8/2027, 3:54:30 pm",
      "amount": "-$39.06",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 869,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "2/8/2027, 12:23:16 pm",
      "amount": "+$33.73",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 870,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "2/11/2027, 2:41:46 pm",
      "amount": "-$33.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 871,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "2/16/2027, 10:44:08 am",
      "amount": "-$20.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 872,
      "title": "Cashback Reward",
      "type": "Rewards",
      "time": "2/19/2027, 10:56:55 am",
      "amount": "+$108.75",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 873,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "2/21/2027, 7:33:13 pm",
      "amount": "-$11.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 874,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "2/26/2027, 11:38:53 am",
      "amount": "-$16.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 875,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "2/26/2027, 7:35:49 pm",
      "amount": "+$41.92",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 876,
      "title": "Uber Ride",
      "type": "Transport",
      "time": "2/27/2027, 7:33:35 pm",
      "amount": "-$18.27",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 877,
      "title": "Freelance Payment",
      "type": "Freelance",
      "time": "2/27/2027, 1:20:00 pm",
      "amount": "+$312.58",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 878,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "2/28/2027, 11:48:45 am",
      "amount": "-$63.58",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 879,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "2/24/2027, 10:42:30 am",
      "amount": "-$448.67",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 880,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "2/24/2027, 2:21:31 pm",
      "amount": "-$202.11",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 881,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "2/12/2027, 9:06:36 am",
      "amount": "+$22.85",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 882,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "3/1/2027, 10:33:15 am",
      "amount": "+$5978.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 883,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "3/2/2027, 3:10:19 pm",
      "amount": "-$114.71",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 884,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "3/4/2027, 3:34:43 pm",
      "amount": "-$27.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 885,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/4/2027, 3:19:12 pm",
      "amount": "-$40.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 886,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/2/2027, 5:28:48 pm",
      "amount": "-$44.90",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 887,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "3/5/2027, 9:39:22 am",
      "amount": "-$13.12",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 888,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/5/2027, 3:13:19 pm",
      "amount": "-$5.75",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 889,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/3/2027, 8:31:42 am",
      "amount": "-$45.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 890,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "3/1/2027, 3:07:40 pm",
      "amount": "-$61.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 891,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "3/2/2027, 6:49:21 pm",
      "amount": "-$35.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 892,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/3/2027, 9:58:16 pm",
      "amount": "-$30.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 893,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "3/5/2027, 5:33:55 pm",
      "amount": "-$71.26",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 894,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "3/6/2027, 10:42:00 am",
      "amount": "-$144.09",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 895,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "3/6/2027, 5:39:54 pm",
      "amount": "+$370.54",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 896,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "3/7/2027, 9:45:28 am",
      "amount": "-$186.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 897,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "3/10/2027, 10:46:48 am",
      "amount": "-$139.08",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 898,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/12/2027, 9:08:04 am",
      "amount": "-$51.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 899,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/13/2027, 9:10:18 pm",
      "amount": "-$26.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 900,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "3/14/2027, 8:16:54 am",
      "amount": "-$19.30",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 901,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "3/16/2027, 10:12:12 am",
      "amount": "-$33.89",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 902,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/17/2027, 3:25:17 pm",
      "amount": "-$54.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 903,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "3/18/2027, 10:38:24 pm",
      "amount": "-$250.66",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 904,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "3/19/2027, 5:44:28 pm",
      "amount": "-$22.74",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 905,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "3/21/2027, 6:41:19 pm",
      "amount": "-$109.78",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 906,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "3/23/2027, 9:45:11 pm",
      "amount": "-$238.59",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 907,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "3/26/2027, 2:17:11 pm",
      "amount": "-$50.95",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 908,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "3/27/2027, 2:25:48 pm",
      "amount": "-$38.22",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 909,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "3/27/2027, 5:17:24 pm",
      "amount": "+$92.60",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 910,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "3/28/2027, 10:05:04 pm",
      "amount": "-$75.83",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 911,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "3/25/2027, 3:11:47 pm",
      "amount": "-$424.23",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 912,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "3/5/2027, 1:58:49 pm",
      "amount": "+$92.83",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 913,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "4/1/2027, 9:15:52 am",
      "amount": "+$6697.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 914,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/4/2027, 1:28:08 pm",
      "amount": "-$97.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 915,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "4/2/2027, 1:40:26 pm",
      "amount": "-$32.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 916,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "4/5/2027, 11:45:22 am",
      "amount": "-$52.77",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 917,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "4/2/2027, 6:45:58 pm",
      "amount": "-$32.21",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 918,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "4/9/2027, 1:26:05 pm",
      "amount": "-$14.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 919,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/7/2027, 5:26:06 pm",
      "amount": "-$11.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 920,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/2/2027, 6:22:42 pm",
      "amount": "-$47.91",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 921,
      "title": "Pharmacy Purchase",
      "type": "Healthcare",
      "time": "4/2/2027, 8:25:45 am",
      "amount": "-$231.31",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 922,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "4/4/2027, 2:45:21 pm",
      "amount": "-$58.32",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 923,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "4/6/2027, 1:10:21 pm",
      "amount": "-$159.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 924,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "4/8/2027, 10:52:43 am",
      "amount": "-$43.47",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 925,
      "title": "Zomato Order",
      "type": "Food Delivery",
      "time": "4/9/2027, 4:15:41 pm",
      "amount": "-$21.23",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 926,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "4/10/2027, 8:31:15 pm",
      "amount": "-$139.52",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 927,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "4/12/2027, 9:49:22 am",
      "amount": "-$171.73",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 928,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "4/17/2027, 11:12:29 am",
      "amount": "-$252.76",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 929,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "4/18/2027, 9:11:40 am",
      "amount": "-$84.62",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 930,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/19/2027, 2:28:02 pm",
      "amount": "-$18.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 931,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "4/22/2027, 8:20:46 pm",
      "amount": "-$24.35",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 932,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "4/24/2027, 2:18:52 pm",
      "amount": "-$23.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 933,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "4/25/2027, 2:10:31 pm",
      "amount": "-$219.00",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 934,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "4/24/2027, 12:34:33 pm",
      "amount": "-$413.03",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 935,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "4/24/2027, 12:55:48 pm",
      "amount": "-$371.78",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 936,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "5/1/2027, 10:44:41 am",
      "amount": "+$7012.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 937,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/3/2027, 12:47:46 pm",
      "amount": "-$139.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 938,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "5/2/2027, 3:54:44 pm",
      "amount": "-$20.10",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 939,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/3/2027, 6:08:05 pm",
      "amount": "-$26.93",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 940,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "5/4/2027, 9:01:53 am",
      "amount": "-$16.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 941,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "5/5/2027, 11:48:39 am",
      "amount": "-$12.02",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 942,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "5/7/2027, 9:05:22 am",
      "amount": "-$7.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 943,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "5/2/2027, 1:44:50 pm",
      "amount": "-$21.24",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 944,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "5/2/2027, 10:26:40 am",
      "amount": "-$101.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 945,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "5/7/2027, 7:25:01 pm",
      "amount": "-$13.44",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 946,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "5/9/2027, 10:00:11 pm",
      "amount": "-$123.16",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 947,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "5/13/2027, 1:49:57 pm",
      "amount": "-$170.64",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 948,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "5/14/2027, 11:40:44 am",
      "amount": "-$270.49",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 949,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "5/15/2027, 8:23:08 am",
      "amount": "-$18.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 950,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "5/22/2027, 8:16:14 am",
      "amount": "-$134.80",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 951,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "5/22/2027, 6:43:08 pm",
      "amount": "+$40.55",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 952,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "5/28/2027, 1:18:28 pm",
      "amount": "+$297.19",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 953,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "5/24/2027, 11:38:55 am",
      "amount": "-$399.23",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 954,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "5/25/2027, 1:05:26 pm",
      "amount": "-$351.50",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 955,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "6/1/2027, 10:28:28 am",
      "amount": "+$6070.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 956,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "6/1/2027, 4:51:14 pm",
      "amount": "-$77.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 957,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "6/1/2027, 4:45:31 pm",
      "amount": "-$53.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 958,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "6/4/2027, 12:49:55 pm",
      "amount": "-$54.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 959,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/2/2027, 8:08:57 am",
      "amount": "-$39.25",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 960,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/7/2027, 11:29:06 am",
      "amount": "-$17.61",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 961,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "6/6/2027, 3:57:05 pm",
      "amount": "-$11.40",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 962,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/4/2027, 4:02:52 pm",
      "amount": "-$39.13",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 963,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "6/1/2027, 1:08:51 pm",
      "amount": "+$85.93",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 964,
      "title": "Amazon Order",
      "type": "Online Shopping",
      "time": "6/2/2027, 12:03:53 pm",
      "amount": "-$117.56",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 965,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "6/4/2027, 5:12:23 pm",
      "amount": "-$45.69",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 966,
      "title": "Stock Dividend",
      "type": "Investment",
      "time": "6/6/2027, 7:10:20 pm",
      "amount": "+$307.53",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 967,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "6/8/2027, 5:11:10 pm",
      "amount": "-$35.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 968,
      "title": "Petrol Pump",
      "type": "Fuel",
      "time": "6/11/2027, 4:30:34 pm",
      "amount": "-$98.50",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 969,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "6/18/2027, 10:53:48 pm",
      "amount": "-$132.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 970,
      "title": "Interest Credit",
      "type": "Bank Interest",
      "time": "6/22/2027, 3:08:24 pm",
      "amount": "+$49.39",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 971,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "6/25/2027, 8:35:05 pm",
      "amount": "-$21.87",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 972,
      "title": "Clothing Store",
      "type": "Fashion",
      "time": "6/28/2027, 4:01:19 pm",
      "amount": "-$200.65",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 973,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "6/26/2027, 11:11:41 am",
      "amount": "-$291.35",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 974,
      "title": "Credit Card Bill",
      "type": "Card Payment",
      "time": "6/25/2027, 9:00:19 am",
      "amount": "-$306.86",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 975,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "6/26/2027, 5:35:05 pm",
      "amount": "+$100.29",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 976,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "7/1/2027, 9:45:25 am",
      "amount": "+$6975.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 977,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/1/2027, 12:45:04 pm",
      "amount": "-$138.70",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 978,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "7/5/2027, 8:41:50 am",
      "amount": "-$32.51",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 979,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/4/2027, 4:17:49 pm",
      "amount": "-$27.04",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 980,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "7/2/2027, 6:40:15 pm",
      "amount": "-$18.86",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 981,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/9/2027, 8:48:58 am",
      "amount": "-$15.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 982,
      "title": "Spotify Premium",
      "type": "Subscription",
      "time": "7/7/2027, 12:33:33 pm",
      "amount": "-$12.68",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 983,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/3/2027, 8:06:39 am",
      "amount": "-$40.85",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 984,
      "title": "Doctor Visit",
      "type": "Healthcare",
      "time": "7/6/2027, 8:01:55 pm",
      "amount": "-$130.54",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 985,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "7/8/2027, 7:08:57 pm",
      "amount": "-$93.37",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 986,
      "title": "Grocery Store",
      "type": "Groceries",
      "time": "7/10/2027, 10:51:37 am",
      "amount": "-$45.42",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 987,
      "title": "Gym Membership",
      "type": "Fitness",
      "time": "7/11/2027, 11:58:18 am",
      "amount": "-$34.39",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 988,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/13/2027, 10:29:31 pm",
      "amount": "-$43.79",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 989,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/17/2027, 9:49:04 pm",
      "amount": "-$50.15",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 990,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "7/20/2027, 10:00:01 pm",
      "amount": "-$28.60",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 991,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "7/23/2027, 4:41:39 pm",
      "amount": "-$6.92",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 992,
      "title": "Swiggy Food",
      "type": "Food Delivery",
      "time": "7/27/2027, 1:44:29 pm",
      "amount": "-$33.84",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 993,
      "title": "EMI Payment",
      "type": "Loan Repayment",
      "time": "7/25/2027, 10:28:01 am",
      "amount": "-$250.19",
      "neg": true,
      "category": "Debt"
    },
    {
      "id": 994,
      "title": "Received from Friend",
      "type": "Peer Transfer",
      "time": "7/2/2027, 12:20:27 pm",
      "amount": "+$28.32",
      "neg": false,
      "category": "Transfer"
    },
    {
      "id": 995,
      "title": "Salary Credit",
      "type": "Salary",
      "time": "8/1/2027, 8:56:48 am",
      "amount": "+$5127.00",
      "neg": false,
      "category": "Income"
    },
    {
      "id": 996,
      "title": "Electricity Bill",
      "type": "Utilities",
      "time": "8/3/2027, 10:16:29 am",
      "amount": "-$71.48",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 997,
      "title": "Water Bill",
      "type": "Utilities",
      "time": "8/1/2027, 4:02:36 pm",
      "amount": "-$32.03",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 998,
      "title": "Internet Bill",
      "type": "Telecom",
      "time": "8/4/2027, 1:29:03 pm",
      "amount": "-$39.53",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 999,
      "title": "Mobile Recharge",
      "type": "Telecom",
      "time": "8/4/2027, 5:00:51 pm",
      "amount": "-$38.34",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 1000,
      "title": "Netflix Subscription",
      "type": "Subscription",
      "time": "8/8/2027, 1:22:18 pm",
      "amount": "-$12.45",
      "neg": true,
      "category": "Expenses"
    },
    {
      "id": 1001,
      "title": "UPI to Friend",
      "type": "Peer Transfer",
      "time": "8/15/2027, 6:52:18 pm",
      "amount": "-$127.52",
      "neg": true,
      "category": "Transfer"
    }
  ]
};
