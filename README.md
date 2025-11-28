# Expense Tracker

A modern, responsive, and dynamic Expense Tracker application designed to help you manage your finances with style. Track your daily expenses, categorize them, and visualize your spending habits through an intuitive dashboard.

## Features

-   **Dashboard Overview**: Visualize your spending with dynamic charts and summaries.
-   **Expense Tracking**: Easily add, view, and manage your daily expenses.
-   **Categorization**: Organize expenses by categories for better financial insights.
-   **Authentication**: Secure user access (Local/Mock authentication).
-   **Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices.
-   **Modern UI**: Built with a sleek Glassmorphism design aesthetic using the 'Outfit' font family.
-   **Data Persistence**: Your data is saved locally so you never lose track of your finances.

## Tech Stack

-   **Core**: HTML5, Vanilla JavaScript (ES Modules)
-   **Styling**: Vanilla CSS (Glassmorphism, Responsive Grid)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Visualization**: [Chart.js](https://www.chartjs.org/)
-   **Fonts**: Google Fonts (Outfit)

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

-   Node.js (v14.0.0 or higher)
-   npm (v6.0.0 or higher)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd ExpenseTracker
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

2.  **Build for production**:
    ```bash
    npm run build
    ```

3.  **Preview production build**:
    ```bash
    npm run preview
    ```

## Project Structure

```
ExpenseTracker/
├── public/              # Static assets
├── src/
│   ├── components/      # UI Components (Auth, Dashboard, Forms, Lists)
│   ├── utils/           # Utility functions
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles and variables
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
```

## Usage

1.  **Sign In**: Enter your credentials to access the dashboard.
2.  **Add Expense**: Use the form to enter details about a new expense (Amount, Description, Category).
3.  **View Dashboard**: Check the charts to see a breakdown of your spending.
4.  **Manage List**: Scroll through the expense list to review individual transactions.

## License

This project is open source and available under the [MIT License](LICENSE).
