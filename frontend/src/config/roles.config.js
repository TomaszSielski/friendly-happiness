/**
 * @file roles.config.js
 * @description Centralized role definitions, labels, and access control map for authenticated routing and layout logic.
 *
 * @responsibilities
 * - Defines known roles used across layout, routing, and access control
 * - Maps roles to human-readable labels for UI display
 * - Specifies route-level access permissions per role
 *
 * @usage
 * - Imported by `MainLayout`, `AppRoutes`, and `ProtectedRoute` for role-aware rendering
 * - Used to normalize and validate role strings from MSAL or other auth providers
 *
 * @auditTag config-roles-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add support for hierarchical roles (e.g. admin > editor > user)
 * - Externalize access map to support dynamic permissions from backend
 */

/* ──────────────── Known Roles ──────────────── */
export const KNOWN_ROLES = [
  "admin",
  "user",
  "editor",
  "analyst",
  "guest", // fallback role
];
/* ──────────────── Role Normalization ──────────────── */
export const ROLE_NORMALIZATION = {
  admins: "admin",
  users: "user",
  editors: "editor",
  analysts: "analyst",
};

/* ──────────────── Role Labels ──────────────── */
export const ROLE_LABELS = {
  admin: "Administrator",
  user: "Authenticated User",
  editor: "Content Editor",
  analyst: "Data Analyst",
  guest: "Guest",
};

/* ──────────────── Role-Based Route Access ──────────────── */
export const ROLE_ACCESS = {
  admin: ["/admin", "/dashboard", "/profile"],
  user: ["/dashboard", "/profile"],
  editor: ["/dashboard"],
  analyst: ["/dashboard"],
  guest: ["/"],
};
