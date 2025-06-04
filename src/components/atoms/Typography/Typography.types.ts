import type { JSX } from "react";
import type React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

type TypographyProps = {
  variant?: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

export type { TypographyVariant, TypographyProps };
