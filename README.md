# VelocityDeck 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

VelocityDeck is a modern, high-performance Agile delivery and risk dashboard. Built with **Next.js 15**, **Tailwind CSS 4**, and **Recharts**, it provides engineering leaders and scrum masters with real-time visibility into sprint execution, delivery health, and organizational risk.

## 📊 Key Features

VelocityDeck transforms complex sprint data into actionable insights across three core dimensions:

### 1. Sprint Execution
*   **Velocity Tracking:** Monitor committed vs. completed story points across recent sprints.
*   **Burndown Charts:** Real-time visibility into sprint progress against the ideal trend line.
*   **Bug Distribution:** Categorized breakdown of active defects (Critical, High, Medium, Low).
*   **RAG Status:** At-a-glance health indicators for Schedule, Scope, Resources, and Budget.

### 2. Delivery & Planning
*   **Lead Time to Market:** Track the cycle time from 'In Progress' to 'Deployed'.
*   **Milestone Drift:** Visualize planned vs. actual delivery dates for major project milestones.
*   **Release Log:** A detailed audit trail of recent production deployments, including feature and fix counts.

### 3. Risk & Resources
*   **Risk Heatmap:** Visualize active risks based on Likelihood and Impact.
*   **Headcount Allocation:** Monitor resource distribution across Engineering, QA, Design, and Product.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
*   **Data Visualization:** [Recharts](https://recharts.org/)
*   **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+
*   Yarn or NPM

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/thomasmaerz/velocitydeck.git
    cd velocitydeck
    ```

2.  Install dependencies:
    ```bash
    yarn install
    # or
    npm install
    ```

3.  Run the development server:
    ```bash
    yarn dev
    # or
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
