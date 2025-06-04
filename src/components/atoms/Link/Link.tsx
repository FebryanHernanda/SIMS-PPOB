import type { LinkProps } from "./Link.types";

const Link: React.FC<LinkProps> = ({ href, target, children }) => {
  return (
    <a href={href} target={target}>
      {children}
    </a>
  );
};

export default Link;
