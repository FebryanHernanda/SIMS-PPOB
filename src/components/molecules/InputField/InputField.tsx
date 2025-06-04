import { Input } from "../../atoms";
import type { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  onChange,
  onClick,
  required = false,
  name,
  value,
}) => {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        required={required}
        name={name}
        value={value}
      />
    </div>
  );
};

export default InputField;
