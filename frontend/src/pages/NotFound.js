// src/pages/NotFound.js
/**
 * @file NotFound.js
 * @component NotFound
 * @description Fallback page for undefined routes, displaying a 404 error message.
 *
 * @responsibilities
 * - Informs users when a page is not found
 *
 * @behavior
 * - Renders static 404 message
 *
 * @styles
 * - (Optional) Add `.not-found` class and stylesheet for layout consistency
 *
 * @auditTag not-found-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add accessibility roles or live regions for screen reader support
 * - Include navigation link to home or dashboard
 * - Write unit test to verify 404 message rendering
 */

import React from "react";
const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
  </div>
);
export default NotFound;
