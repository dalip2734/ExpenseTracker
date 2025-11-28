import { loginUser, registerUser } from '../utils/storage.js';

export const renderAuth = (container, onLoginSuccess) => {
    let isLoginMode = true;

    const render = () => {
        container.innerHTML = `
      <div class="glass-card fade-in" style="max-width: 400px; margin: 4rem auto;">
        <h2 style="text-align: center; margin-bottom: 1.5rem; color: var(--text-primary);">
          ${isLoginMode ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form id="auth-form">
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <input type="text" id="username" class="form-input" required placeholder="Enter username">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input type="password" id="password" class="form-input" required placeholder="Enter password">
          </div>
          
          <div id="auth-error" style="color: var(--danger-color); font-size: 0.9rem; margin-bottom: 1rem; text-align: center; display: none;"></div>

          <button type="submit" class="btn btn-primary" style="margin-bottom: 1rem;">
            ${isLoginMode ? 'Sign In' : 'Sign Up'}
          </button>
          
          <div style="text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
            ${isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <a href="#" id="toggle-auth" style="color: var(--primary-color); text-decoration: none; font-weight: 600; margin-left: 0.25rem;">
              ${isLoginMode ? 'Sign Up' : 'Sign In'}
            </a>
          </div>
        </form>
      </div>
    `;

        const form = container.querySelector('#auth-form');
        const toggleLink = container.querySelector('#toggle-auth');
        const errorMsg = container.querySelector('#auth-error');

        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            render();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = form.querySelector('#username').value;
            const password = form.querySelector('#password').value;

            let result;
            if (isLoginMode) {
                result = loginUser(username, password);
            } else {
                result = registerUser(username, password);
            }

            if (result.success) {
                onLoginSuccess();
            } else {
                errorMsg.textContent = result.message;
                errorMsg.style.display = 'block';
            }
        });
    };

    render();
};
