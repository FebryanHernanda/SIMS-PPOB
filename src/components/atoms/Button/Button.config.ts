import type { ButtonVariant } from "./Button.types";

const styleConfig: Record<ButtonVariant, string> = {
  primary:
    "bg-red-600 text-white p-2 rounded-md cursor-pointer font-bold hover:bg-red-700",
  secondary:
    "bg-white text-red-500 p-2 border-1 rounded-md cursor-pointer font-bold hover:bg-red-700 hover:text-white",
  outlined:
    "text-gray-500 p-2 border-1 border-gray-500 rounded-md cursor-pointer  hover:bg-red-600 hover:text-white hover:border-none",
  disabled: "bg-gray-300 text-white p-2 rounded-md font-bold",
  linkPrimary: "text-red-500 cursor-pointer p-2 rounded-sm  hover:bg-gray-100",
  linkSecondary:
    "text-gray-600 cursor-pointer p-2 rounded-sm hover:bg-gray-100",
} as const;

export { styleConfig };
