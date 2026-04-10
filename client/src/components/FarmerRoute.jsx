import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "./Loader"

const FarmerRoute = () => {
  const location = useLocation()
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== "farmer") {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default FarmerRoute
