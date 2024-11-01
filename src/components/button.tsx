import React from "react";
import "../styles/button.scss";

interface ButtonProps {
  style?: React.CSSProperties;
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  style = {},
  text,
  disabled = false,
  type = "button",
}) => {
  return (
    <button type={type} className="btn" style={style} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
