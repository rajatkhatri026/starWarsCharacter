import React from "react";
import { Spinner } from "reactstrap";
import './LoadingIndicator.css';

interface LoadingIndicatorProps {
  message?: string; // Optional message to display
  size?: "sm" | "md" | "lg"; // Optional size for spinner
  color?: string; // Custom color for spinner
  className?: string; // Optional custom class for styling
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading...",
  size = "sm",
  color = "primary",
  className = "",
}) => {
  return (
    <div className={`loading-indicator ${className}`} role="status" aria-live="polite">
      <Spinner size={size} color={color} /> {/* Reactstrap Spinner */}
      {message && <span className="ms-2">{message}</span>}
    </div>
  );
};

export default LoadingIndicator;
