import './style.css';
import { renderExpenseForm } from './components/ExpenseForm.js';
import { renderExpenseList } from './components/ExpenseList.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderAuth } from './components/Auth.js';
import { getCurrentUser, logoutUser } from './utils/storage.js';

const init = () => {
  const appContainer = document.querySelector('#app');

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
        <div style="display: flex; justify-content: flex-end; padding: 1rem;">
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

    logoutBtn.addEventListener('click', () => {
      logoutUser();
      renderApp();
    });

    const updateApp = () => {
      renderExpenseList(listContainer, updateApp);
      renderDashboard(dashboardContainer);
    };

    renderExpenseForm(formContainer, updateApp);
    updateApp();
  };

  renderApp();
};

document.addEventListener('DOMContentLoaded', init);
