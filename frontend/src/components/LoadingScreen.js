// frontend/src/components/LoadingScreen.js
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