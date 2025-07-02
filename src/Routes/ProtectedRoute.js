import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireGuest() {
  const { isAuthenticated } = useSelector((state) => state.users);

  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export function RequireAuth({ redirectTo = "/become-a-host" }) {
  const { isAuthenticated } = useSelector((state) => state.users);

  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
}
