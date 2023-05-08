import React from "react";
import Spinner from "./spinner.gif";

const LoadingSpinnerButton = ({ title, loading, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {loading ? (
        <img src={Spinner} alt="spinner" className="spinner" />
      ) : (
        title + " "
      )}
    </button>
  );
};

export default LoadingSpinnerButton;
