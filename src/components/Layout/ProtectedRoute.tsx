import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <Outlet />;
};
