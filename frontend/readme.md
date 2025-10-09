# 🛡️ Friendly Happiness — Secure React Admin Portal

A responsive, role-based React application with Microsoft authentication, granular logging, and modular architecture. Built for maintainability, auditability, and user empowerment.

---

## 🚀 Features

- 🔐 **MSAL Authentication** — Secure login/logout via Microsoft Identity Platform
- 🧑‍💼 **Role-Based Access Control** — Protected routes with dynamic role checks
- 📋 **Granular Logging** — Timestamped, level-aware logs across layout, routing, and auth flows
- 📱 **Responsive Design** — Mobile-first layout with adaptive header/menu
- 🧱 **Modular Components** — Clean separation of layout, header, menu, and protected views
- 🐛 **Error-Resilient** — Defensive coding with fallback logic and audit-friendly traceability
- 🧠 **Token Claim Viewer** — Decodes and displays identity claims from MSAL tokens
- 🧪 **Audit-Friendly Architecture** — Designed for traceability, role clarity, and secure session handling

---

## 🗂️ Project Structure

frontend/
├── public/
│ ├── index.html
│ └── favicon.ico
├── src/
│ ├── assets/
│ ├── auth/
│ ├── components/
│ ├── layout/
│ ├── pages/
│ ├── routes/
│ ├── styles/
│ ├── utils/
│ ├── App.js
│ └── index.js
├── .env
├── package.json
└── readme.md

---

## 🧪 Development Notes

- ✅ MSAL token claims are decoded and rendered in `Dashboard.js`
- ✅ Role-based routing handled via `ProtectedRoute.js`
- ✅ Header and menu are responsive and role-aware
- ✅ Logging is centralized via `logger.js` with level and timestamp support
- ✅ Layout is modular and semantic: `MainLayout.js` wraps all views

---

## 📦 Setup

```bash
npm install
npm start

```
