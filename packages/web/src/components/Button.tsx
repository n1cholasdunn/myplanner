import React from "react";

interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const colorClasses =
    "bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500";

  return (
    <button
      type={type}
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
