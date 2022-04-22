// This file redirects the user if user do not have access
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserAtom } from "./components/Login";
import { useAtom } from "jotai";

function RequireAuth({ role }) {
    const [user, setUserAtom ] = useAtom(UserAtom);
    const location = useLocation();
    
    // Redirect to the forbid page if the user tries to go to admin routes
    if ((role === "admin") && !(user.roles.includes("Admin"))) {
        return <Navigate to="/forbidPage" />
    }

    // Redirect to the login page but save the location 
    // so that the user can go back to the location after login
    return !user.isAuthenticated ? <Navigate to="/" state={{ from: location }} /> : <Outlet /> 
    // default role = "user"
    
}

export default RequireAuth;