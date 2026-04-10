import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "./Loader"

const AdminRoute = () => {
  const location = useLocation()
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== "admin") {
    if (user?.role === "farmer") {
      return <Navigate to="/farmer/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute
