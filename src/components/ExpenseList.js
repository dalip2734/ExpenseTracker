import { getExpenses, deleteExpense } from '../utils/storage.js';
import { formatCurrency, formatDate } from '../utils/format.js';

export const renderExpenseList = (
  container,
  onExpenseDeleted,
  month = 'all'
) => {
  let expenses = getExpenses();

  // Filter by month if provided (format: YYYY-MM)
  if (month && month !== 'all') {
    const [y, m] = month.split('-').map(Number);
    expenses = expenses.filter((exp) => {
      const d = new Date(exp.date);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    });
  }

  // Sort expenses by date (newest first)
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (expenses.length === 0) {
    container.innerHTML = `
      <div class="glass-card fade-in" style="text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary); font-size: 1.1rem;">No expenses recorded for this period.</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">Add an expense to see it listed here.</p>
      </div>
    `;
    return;
  }

  const listHtml = `
    <div class="glass-card fade-in">
      <h2 style="margin-bottom: 1.5rem; color: var(--text-primary);">Recent Transactions</h2>
      <div class="expense-list">
        ${expenses
          .map(
            (expense) => `
          <div class="expense-item" data-id="${expense.id}">
            <div class="expense-info">
              <div class="expense-desc">${expense.description}</div>
              <div class="expense-meta">
                <span class="expense-category tag-${expense.category.toLowerCase()}">${expense.category}</span>
                <span class="expense-date">${formatDate(expense.date)}</span>
              </div>
            </div>
            <div class="expense-actions">
              <div class="expense-amount">-${formatCurrency(expense.amount)}</div>
              <button class="btn-delete" aria-label="Delete expense">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  container.innerHTML = listHtml;

  // Add styles for the list items dynamically or assume they are in style.css
  // Let's add some specific styles here via a style tag if not present, or better, add to style.css later.
  // For now, I'll assume I can add some inline styles or simple classes.
  // Actually, I should probably update style.css to include these classes.
  // But for now let's just make it functional.

  // Event listeners for delete buttons
  container.querySelectorAll('.btn-delete').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const id = expenses[index].id;
      deleteExpense(id);
      if (onExpenseDeleted) {
        onExpenseDeleted();
      }
    });
  });
};
