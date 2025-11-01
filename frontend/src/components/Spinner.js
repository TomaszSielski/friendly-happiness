/*/frontend/src/components/Spinner.js */
/**
 * @file Spinner.js
 * @component Spinner
 * @description Visual loading indicator for asynchronous operations or pending UI states.
 *
 * @responsibilities
 * - Renders a styled spinner element
 * - Indicates loading or waiting states in the UI
 *
 * @styles
 * - Defined in `frontend/src/styles/Spinner.css`
 * - Uses `.spinner-container` and `.spinner` classes
 *
 * @usage
 * - Place inside components or pages that require a loading indicator
 *
 * @auditTag ui-spinner-v1
 * @lastReviewed 2025-11-01
 *
 * @todo
 * - Add accessibility support (e.g. `aria-label="Loading"` or role="status")
 * - Allow size or variant customization via props
 * - Write unit tests to confirm render and class presence
 */

import React from "react";
import "../styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
