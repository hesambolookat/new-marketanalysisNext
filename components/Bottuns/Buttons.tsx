import React from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  variant: "login" | "signup";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  const className = `${styles.button} ${variant === "login" ? styles.login : styles.signup}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
