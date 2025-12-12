import { getExpenses } from '../utils/storage.js';
import { formatCurrency } from '../utils/format.js';
import Chart from 'chart.js/auto';

let chartInstance = null;

export const renderDashboard = (container, month = 'all') => {
  let expenses = getExpenses();

  // Filter by month if provided
  if (month && month !== 'all') {
    const [y, m] = month.split('-').map(Number);
    expenses = expenses.filter((exp) => {
      const d = new Date(exp.date);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    });
  }

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  // For now, let's assume a budget or income to calculate balance, or just show total spent.
  // The requirements mentioned "Total Balance, Income, Expense".
  // Since we only track expenses, we can just show Total Spent for now, or mock an income.
  // Let's stick to Total Spent and maybe breakdown by category.

  // Group by category for the chart
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  container.innerHTML = `
    <div class="dashboard-grid">
      <div class="glass-card fade-in">
        <h3 style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Total Spent</h3>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--text-primary);">${formatCurrency(totalExpense)}</div>
      </div>
      
      <div class="glass-card fade-in">
        <h3 style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">Spending by Category</h3>
        <div style="height: 250px; position: relative;">
          <canvas id="expenseChart"></canvas>
        </div>
      </div>
    </div>
  `;

  // Render Chart
  const ctx = container.querySelector('#expenseChart').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  if (categories.length > 0) {
    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#6366f1', // Indigo
              '#ec4899', // Pink
              '#10b981', // Emerald
              '#f59e0b', // Amber
              '#8b5cf6', // Violet
              '#06b6d4', // Cyan
              '#f43f5e', // Rose
            ],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#94a3b8',
              font: {
                family: "'Outfit', sans-serif",
              },
            },
          },
        },
      },
    });
  } else {
    // Show placeholder if no data
    container.querySelector('#expenseChart').style.display = 'none';
    container.querySelector('.glass-card:last-child').innerHTML += `
      <div style="height: 250px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
        No data to display
      </div>
    `;
  }
};
