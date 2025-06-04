import { styleConfig } from "./Button.config";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
}) => {
  const baseVariant = styleConfig[variant as keyof typeof styleConfig];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseVariant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
