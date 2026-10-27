# 🎯 TaskFlow - Modern Todo & Task Management App

A sleek, responsive, and feature-rich Todo Application built with **React 19**, **Vite**, and **Lucide Icons**. Designed for focus, clarity, and delightful task management.

🌐 **Live Demo on GitHub Pages**: [https://tekulapallyshivaprasad-coder.github.io/todo-app/](https://tekulapallyshivaprasad-coder.github.io/todo-app/)

---

## ✨ Features

- 🌓 **Dark & Light Mode** — Automatic system theme detection with seamless manual toggle (persisted in `localStorage`).
- 📊 **Progress & Analytics** — Interactive progress bar, dynamic status messages, and counters for Total, Completed, Pending, and Overdue tasks.
- 🏷️ **Categorization & Priority Tags** — Organize tasks by Category (*Work*, *Personal*, *Study*, *Shopping*, *Health*, *Other*) and Priority (*High*, *Medium*, *Low*).
- 📅 **Due Dates & Overdue Alerts** — Smart date badge showing *Due Today*, *Overdue*, or formatted upcoming dates.
- 🔍 **Instant Search & Filters** — Fast search by title or notes, plus filter tabs (*All*, *Active*, *Completed*) and custom sort options.
- 📝 **Inline & Modal Editing** — Modify task title, description notes, priority, category, and due date at any time.
- 💾 **Local Storage Persistence** — All your tasks and preferences are saved automatically in your browser.
- 📦 **Data Portability** — One-click **Export** and **Import** tasks via JSON backup files.
- 🎉 **Celebration Confetti** — Delightful celebratory confetti bursts when you complete tasks!
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Icons**: Lucide React
- **Animations / Effects**: Canvas Confetti & Modern CSS3 Animations
- **CI/CD**: GitHub Actions & GitHub Pages

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/tekulapallyshivaprasad-coder/todo-app.git
cd todo-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to view the app.

### 4. Build for production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## 🌐 Deploy to GitHub Pages

This repository is configured with an automated GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Go to your repository on GitHub: **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every time you push to the `main` branch, your app will automatically build and deploy to:
   `https://tekulapallyshivaprasad-coder.github.io/todo-app/`

---

## 📄 License

MIT License. Free to use and modify for personal and commercial projects.
