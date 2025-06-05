import type { LinkProps } from "./Link.types";
import { Link as RouterLink } from "react-router-dom";

const Link: React.FC<LinkProps> = ({ href, target, state, children }) => {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <RouterLink to={href} state={state}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={href} target={target} rel="noopener norefferer">
      {children}
    </a>
  );
};

export default Link;
