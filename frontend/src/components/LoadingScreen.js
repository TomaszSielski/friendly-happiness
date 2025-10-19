// frontend/src/components/LoadingScreen.js
import Spinner from "./Spinner";
import "../styles/Spinner.css";

const LoadingScreen = ({ message = "Please wait…" }) => (
  <div className="spinner-container">
    <div>
      <Spinner />
      <p className="spinner-message">{message}</p>
    </div>
  </div>
);

export default LoadingScreen;
