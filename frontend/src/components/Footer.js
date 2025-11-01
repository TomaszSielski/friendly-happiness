/**
 * @file Footer.js
 * @component Footer
 * @description Static footer component for global layout.
 *
 * @responsibilities
 * - Renders a persistent footer across all views
 * - Displays versioning and copyright
 * - Applies scoped styling via `footer.css`
 *
 * @behavior
 * - Always visible at the bottom of the layout
 * - Uses semantic `<footer>` tag for accessibility and structure
 * - Displays static text including version and branding
 *
 * @styles
 * - Styles defined in `frontend/src/styles/footer.css`
 * - Uses `.app-footer` class for layout and typography
 *
 * @auditTag layout-footer-v1
 * @lastReviewed 2025-10-27
 * @todo And define REACT_APP_VERSION=1.0.0 in .env.
 */
import "../styles/footer.css";
import React from "react";
const Footer = () => (
  <footer className="app-footer" data-audit="layout-footer">
    <p>© 2025 Friendly Happiness · v1.0.0 · All rights reserved</p>
  </footer>
);

export default Footer;
