import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    try {
        // Decode JWT payload (Base64)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);

        // Check expiration (exp is in seconds)
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            console.warn('Token expired, redirecting to login');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            return <Navigate to="/admin" replace />;
        }
    } catch (error) {
        console.error('Invalid token format', error);
        localStorage.removeItem('adminToken');
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
