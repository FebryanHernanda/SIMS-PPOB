import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
