import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
