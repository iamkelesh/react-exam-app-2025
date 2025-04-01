import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../contexts/authContext';

const GuestGuard = () => {
    const { accessToken } = useContext(AuthContext);

    if (accessToken) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

export default GuestGuard;