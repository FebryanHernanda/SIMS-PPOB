import type React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "disabled"
  | "linkPrimary"
  | "linkSecondary";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
};

export type { ButtonProps, ButtonVariant };
