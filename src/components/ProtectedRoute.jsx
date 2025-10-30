import { Navigate, Outlet } from "react-router-dom";
import { getRole, useDecodeToken } from "../_services/auth";

export default function ProtectedRoute({ requiredRole }) {
    const token = localStorage.getItem("accessToken");
    const decodedData = useDecodeToken(token); 
    const currentRole = getRole();

    if (!decodedData.success) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && currentRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}