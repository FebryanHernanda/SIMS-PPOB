import { Input } from "../../atoms";
import type { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  onChange,
  onClick,
  onBlur,
  required = false,
  name,
  value = "",
  error,
  readOnly,
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
        onBlur={onBlur}
        required={required}
        name={name}
        value={value}
        readOnly={readOnly}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
