import { styleConfig } from "./Typograhpy.config";
import type { TypographyProps } from "./Typography.types";

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  as,
  className = "",
}) => {
  const Component = as || (variant.startsWith("h") ? variant : "p");

  return (
    <Component
      className={`${
        styleConfig[variant as keyof typeof styleConfig]
      } ${className}`}
    >
      {children}
    </Component>
  );
};

export default Typography;
