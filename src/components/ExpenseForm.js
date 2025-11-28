import { addExpense } from '../utils/storage.js';

export const renderExpenseForm = (container, onExpenseAdded) => {
  container.innerHTML = `
    <div class="glass-card fade-in">
      <h2 style="margin-bottom: 1.5rem; color: var(--text-primary);">Add New Expense</h2>
      <form id="expense-form">
        <div class="form-group">
          <label class="form-label" for="description">Description</label>
          <input type="text" id="description" class="form-input" placeholder="e.g., Grocery Shopping" required>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="amount">Amount (₹)</label>
          <input type="number" id="amount" class="form-input" placeholder="0.00" step="0.01" min="0" required>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="category">Category</label>
          <select id="category" class="form-select" required>
            <option value="" disabled selected>Select a category</option>
            <option value="Food">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="date">Date</label>
          <input type="date" id="date" class="form-input" required>
        </div>
        
        <button type="submit" class="btn btn-primary">Add Expense</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#expense-form');

  // Set default date to today
  const dateInput = form.querySelector('#date');
  dateInput.valueAsDate = new Date();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = form.querySelector('#description').value;
    const amount = parseFloat(form.querySelector('#amount').value);
    const category = form.querySelector('#category').value;
    const date = form.querySelector('#date').value;

    const newExpense = {
      description,
      amount,
      category,
      date
    };

    addExpense(newExpense);
    form.reset();
    dateInput.valueAsDate = new Date(); // Reset date to today

    if (onExpenseAdded) {
      onExpenseAdded();
    }
  });
};
