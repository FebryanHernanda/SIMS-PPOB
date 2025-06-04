import type { InputHTMLAttributes } from "react";
import { styleConfig } from "./Input.config";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={styleConfig.field} />;
};

export default Input;
