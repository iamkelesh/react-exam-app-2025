import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/authContext'; // Adjust the import according to your context file location
import AuthContext from '../contexts/authContext';

// eslint-disable-next-line react/prop-types
const AuthGuard = ({ children }) => {
    const { accessToken } = useContext(AuthContext)
    if (!accessToken) {
        return <Navigate to="/user/login" />;
    }

    return children;
};

export default AuthGuard;