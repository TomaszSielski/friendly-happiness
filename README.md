# 🛡️ Friendly Happiness

A secure, role-based full-stack application focused on authentication, auditability, and DevOps best practices.

This repository will evolve into a complete system with:

- 🔐 A React frontend ([`frontend/`](./frontend/)) using MSAL for authentication and role-based access
- ⚙️ A backend API (in development) for secure data operations, token validation, and audit logging
- 🚀 CI/CD pipelines to demonstrate DevOps workflows, automated testing, and deployment

## 🧱 Backend Structure
<pre>
The backend follows a Unix-style layout for cross-platform scripting and audit clarity:
backend/scripts/
 ├── bin/     # Entry-point scripts (e.g.,StructurePreview.ps1) 
 ├── etc/     # Configuration files 
 ├── sbin/    # System-level helpers 
 └── var/     # Logs and runtime data
</pre>
## 🧪 Diagnostic Tools

Coming soon:
- `StructurePreview.ps1` — validates layout and onboarding readiness
- Restart-safe onboarding with verbose logging and phase tracking

## 📘 Frontend Documentation

See [`frontend/readme.md`](./frontend/readme.md) for setup, authentication flow, and role-based routing.

## 🤝 Contributing

This project follows GitHub Community Standards:
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)

Use semantic commit prefixes (`feat:`, `fix:`, `docs:`) and submit PRs with structure validation and audit clarity in mind.

## 📄 License

MIT — see [LICENSE](./LICENSE)