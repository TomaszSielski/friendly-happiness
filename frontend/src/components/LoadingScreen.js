// frontend/src/components/LoadingScreen.js
/**
 * @file LoadingScreen.js
 * @component LoadingScreen
 * @description Fullscreen loading indicator with customizable message.
 *
 * @responsibilities
 * - Displays a centered spinner and optional loading message
 * - Provides visual feedback during async operations or page transitions
 * - Wraps the reusable <Spinner /> component
 *
 * @behavior
 * - Always centers content using `.spinner-container`
 * - Defaults to "Please wait…" if no message is provided
 * - Accepts a custom message via props
 *
 * @styles
 * - Styles defined in `frontend/src/styles/Spinner.css`
 * - Uses `.spinner-container` and `.spinner-message` classes
 *
 * @dependencies
 * - React, PropTypes
 * - Spinner component from `frontend/src/components/Spinner.js`
 *
 * @auditTag layout-loading-v1
 * @lastReviewed 2025-10-27
 */
import Spinner from "./Spinner";
import "../styles/Spinner.css";
import React from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ message = "Please wait…" }) => (
  <div className="spinner-container">
    <div>
      <Spinner />
      <p className="spinner-message">{message}</p>
    </div>
  </div>
);

LoadingScreen.propTypes = {
  message: PropTypes.string
};

export default LoadingScreen;