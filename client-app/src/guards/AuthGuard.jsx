import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../contexts/authContext';

const AuthGuard = () => {
    const { accessToken } = useContext(AuthContext);

    if (!accessToken) {
        return <Navigate to="/user/login" />;
    }

    return <Outlet />;
};

export default AuthGuard;