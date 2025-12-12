import './style.css';
import { renderExpenseForm } from './components/ExpenseForm.js';
import { renderExpenseList } from './components/ExpenseList.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderAuth } from './components/Auth.js';
import { getCurrentUser, logoutUser } from './utils/storage.js';

const init = () => {
  const appContainer = document.querySelector('#outlet');

  const renderApp = () => {
    const user = getCurrentUser();

    if (!user) {
      appContainer.innerHTML = '<div id="auth-container"></div>';
      renderAuth(document.querySelector('#auth-container'), renderApp);
      return;
    }

    // Render Main App Structure
    appContainer.innerHTML = `
      <header class="app-header">
        <div style="display: flex; justify-content: flex-end; gap:0.5rem; align-items:center; padding: 1rem;">
          <select id="month-select" class="form-select" style="background: rgba(255,255,255,0.04); color: var(--text-secondary); padding: 0.4rem 0.6rem; border-radius: 6px;">
            <option value="all">All</option>
          </select>
          <button id="logout-btn" class="btn" style="background: rgba(255,255,255,0.1); color: var(--text-secondary); font-size: 0.9rem; padding: 0.5rem 1rem;">
            Logout (${user})
          </button>
        </div>
        <h1>Expense Tracker</h1>
        <p>Manage your finances with style</p>
      </header>
      
      <main class="main-content">
        <section id="dashboard-container" class="dashboard-section"></section>
        
        <div class="content-grid">
          <section id="form-container" class="form-section"></section>
          <section id="list-container" class="list-section"></section>
        </div>
      </main>
    `;

    const formContainer = document.querySelector('#form-container');
    const listContainer = document.querySelector('#list-container');
    const dashboardContainer = document.querySelector('#dashboard-container');
    const logoutBtn = document.querySelector('#logout-btn');
    const monthSelect = document.querySelector('#month-select');

    logoutBtn.addEventListener('click', () => {
      logoutUser();
      renderApp();
    });

    // Populate month select (last 12 months + All)
    const getMonthOptions = () => {
      const opts = [{ value: 'all', label: 'All' }];
      const now = new Date();
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });
        opts.push({ value: val, label });
      }
      return opts;
    };

    if (monthSelect) {
      const opts = getMonthOptions();
      monthSelect.innerHTML = opts
        .map((o) => `<option value="${o.value}">${o.label}</option>`)
        .join('');
      monthSelect.value = 'all';
      monthSelect.addEventListener('change', () => {
        updateApp();
      });
    }

    const updateApp = () => {
      const selectedMonth = monthSelect ? monthSelect.value : 'all';
      renderExpenseList(listContainer, updateApp, selectedMonth);
      renderDashboard(dashboardContainer, selectedMonth);
    };

    renderExpenseForm(formContainer, updateApp);
    updateApp();
  };

  renderApp();
};

document.addEventListener('DOMContentLoaded', init);
