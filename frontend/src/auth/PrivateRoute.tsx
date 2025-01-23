import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export const PrivateRoute = () => {
    const user = useAuth();
    if(!user.token) return <Navigate to="/signin" />
    return <Outlet />
}