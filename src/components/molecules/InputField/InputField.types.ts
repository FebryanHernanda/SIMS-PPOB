type InputFieldProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  required?: boolean;
  name?: string;
  value?: string;
  error?: string;
  onBlur?: () => void;
  readOnly?: boolean;
};

export type { InputFieldProps };
