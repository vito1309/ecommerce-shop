import { useAuth } from "@/cases/auth/hooks/use-auth"
import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
    children: ReactNode
}
export function PrivateRoute({
    children
}: PrivateRouteProps) {
    const { user } = useAuth();
    const location = useLocation();
    
    if (!user) {
        return <Navigate to={`/signin?redirect=${location.pathname}`} replace />
    }

    return children
}
