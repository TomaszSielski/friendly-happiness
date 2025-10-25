# 🛡️ Friendly Happiness — Secure React Admin Portal

A responsive, role-based React application with Microsoft authentication, granular logging, and modular architecture. Built for maintainability, auditability, and user empowerment.

---

## 🚀 Features

- 🔐 **MSAL Authentication** — Secure login/logout via Microsoft Identity Platform
- 🧑‍💼 **Role-Based Access Control** — Protected routes with dynamic role checks
- 📋 **Granular Logging** — Timestamped, level-aware logs across layout, routing, and auth flows
- 📱 **Responsive Design** — Mobile-first layout with adaptive header/menu and auto-closing navigation
- 🧱 **Modular Components** — Clean separation of layout, header, menu, and protected views
- 🐛 **Error-Resilient** — Defensive coding with fallback logic and audit-friendly traceability
- 🧠 **Token Claim Viewer** — Decodes and displays identity claims from MSAL tokens
- 🧪 **Audit-Friendly Architecture** — Designed for traceability, role clarity, and secure session handling

---

## 🗂️ Project Structure

<pre>
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│ ├── assets/ # Static assets (logo, icons)
│ ├── auth/ # MSAL config and logout logic
│ ├── components/ # Header, Menu, ProtectedRoute
│ ├── layout/ # MainLayout wrapper
│ ├── pages/ # Dashboard, Profile, Admin
│ ├── routes/ # Route definitions
│ ├── styles/ # CSS modules
│ ├── utils/ # Logger, helpers
│ ├── App.js
│ └── index.js
├── .env
├── package.json
└── readme.md
</pre>

---

## 🧪 Development Notes

- ✅ MSAL token claims are decoded and summarized in `Dashboard.js`
- ✅ Full claim viewer lives in `Profile.js` with collapsible formatting
- ✅ Role-based routing handled via `ProtectedRoute.js`
- ✅ Logging is centralized via `logger.js` with level and timestamp support
- ✅ Layout is modular and semantic: `MainLayout.js` wraps all views
- ✅ Header menu auto-closes on mobile after navigation
- ✅ Responsive styles scoped to `dashboard.css`, `profile.css`, and `mainLayout.css`

---

## 📦 Setup

```bash
npm install
npm start

```

📝 TODO
[ ] 🔄 Implement Just-in-Time Scope Elevation

Start with minimal scopes at login (e.g., User.Read)

Detect role claims (roles, groups) from token

Elevate scopes dynamically via acquireTokenSilent or Popup when privileged actions are triggered

Ensure audit logging for elevated access attempts

Gracefully handle consent prompts and fallback logic

[ ] Add dark/light mode toggle to settings menu
Default to browser preference via `prefers-color-scheme`
Allow manual override via `data-theme` attribute
