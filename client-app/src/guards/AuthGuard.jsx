import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts/authContext';

const AuthGuard = ({ children }) => {
    const { accessToken } = useContext(AuthContext)
    if (!accessToken) {
        return <Navigate to="/user/login" />;
    }

    return children;
};

export default AuthGuard;