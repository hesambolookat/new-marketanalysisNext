import React from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  type?: "api" | "validation";  // Add a type prop to differentiate between API and validation errors
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type = "validation" }) => {
  if (!message) return null;

  // Conditional className based on the type of error
  const errorClass = type === "api" ? styles.apiError : styles.validationError;

  return (
    <p className={`${styles.error} ${errorClass}`}>
      {message}
    </p>
  );
};

export default ErrorMessage;
