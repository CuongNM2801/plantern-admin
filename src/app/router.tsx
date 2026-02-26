import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {path: "/login", element: <Login />},
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {index: true, element: <Dashboard />}
        ]
    }
])