import type React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "disabled"
  | "linkPrimary"
  | "linkSecondary"
  | "linkSecondaryActive"
  | "navActive"
  | "navNotActive";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
};

export type { ButtonProps, ButtonVariant };
