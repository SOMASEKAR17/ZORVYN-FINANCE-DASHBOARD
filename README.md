# Finance Dashboard UI

## Tech Stack
* **Framework:** React
* **Styling:** Tailwind CSS 
* **Animations:** Framer Motion & GSAP
* **Charts:** Recharts 
* **State Management:** Context API 

---

## Project Objectives Checklist

### 1. Dashboard Overview
- [X] **Summary Cards:** Implementation of Total Balance, Income, and Expenses.
- [ ] **Time-Based Visualization:** Interactive balance trend line chart (e.g., "Activities" widget).
- [ ] **Categorical Visualization:** Spending breakdown (e.g., Donut or Pie chart).
- [ ] **Liquid Glass UI:** Applying refraction and blur effects to all container cards.

### 2. Transactions Section
- [ ] **Data Display:** List view including Date, Amount, Category, and Type.
- [ ] **Filtering:** Ability to filter by transaction type (Income/Expense).
- [ ] **Search/Sort:** Functional search bar or column sorting logic.

### 3. Basic Role-Based UI (RBAC)
- [ ] **Role Toggle:** A UI switch to move between 'Admin' and 'Viewer'.
- [ ] **Conditional Logic:**
    - [ ] **Viewer:** Read-only access to dashboard and lists.
    - [ ] **Admin:** Ability to trigger "Add Transaction" or "Edit" modals.

### 4. Insights Section
- [ ] **Top Spending:** Dynamic calculation of the highest spending category.
- [ ] **Monthly Comparison:** Visual or textual comparison of current vs. previous month.
- [ ] **Smart Observations:** Automated insights based on mock data patterns.

### 5. State Management
- [ ] **Global State:** Centralized handling of transaction data and user filters.
- [ ] **Role Persistence:** App-wide awareness of the currently selected user role.
- [ ] **Scalability:** Clean folder structure and modular component logic.

### 6. UI/UX & Responsiveness
- [ ] **Responsive Design:** Fluid layout transitions from Desktop to Mobile.
- [ ] **Empty States:** Graceful handling of "No Transactions Found" scenarios.
- [ ] **Design Polish:** High-contrast readability and consistent spacing.

### 7. Optional Enhancements
- [ ] **Dark Mode:** Native "Deep Charcoal" (#050505) implementation.
- [ ] **Data Persistence:** Integration with `localStorage` to save transactions on refresh.
- [ ] **Animations:** Smooth entry transitions using Framer Motion.
- [ ] **Export Functionality:** Exporting transaction history to JSON or CSV.

