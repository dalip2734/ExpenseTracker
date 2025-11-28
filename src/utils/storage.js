const USERS_KEY = 'expense-tracker-users';
const CURRENT_USER_KEY = 'expense-tracker-current-user';

// Helper to get all users
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

// Helper to save all users
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (username, password) => {
  const users = getUsers();
  if (users[username]) {
    return { success: false, message: 'Username already exists' };
  }
  users[username] = { password }; // In a real app, hash this!
  saveUsers(users);
  loginUser(username, password);
  return { success: true };
};

export const loginUser = (username, password) => {
  const users = getUsers();
  if (!users[username] || users[username].password !== password) {
    return { success: false, message: 'Invalid username or password' };
  }
  localStorage.setItem(CURRENT_USER_KEY, username);
  return { success: true };
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER_KEY);
};

// Data Management scoped to current user
const getDataKey = () => {
  const user = getCurrentUser();
  if (!user) return null;
  return `expense-tracker-data-${user}`;
};

export const getExpenses = () => {
  const key = getDataKey();
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses) => {
  const key = getDataKey();
  if (key) {
    localStorage.setItem(key, JSON.stringify(expenses));
  }
};

export const addExpense = (expense) => {
  const expenses = getExpenses();
  expenses.push({ ...expense, id: Date.now().toString() });
  saveExpenses(expenses);
  return expenses;
};

export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const newExpenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(newExpenses);
  return newExpenses;
};
