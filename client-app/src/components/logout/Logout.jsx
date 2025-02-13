import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const navigate = useNavigate();
    const { newLogoutHandler } = useContext(AuthContext);

    useEffect(() => {
        if(newLogoutHandler) {
            newLogoutHandler()
            .catch((error) => {
                console.error('Error during logout:', error)
                navigate('/home')
            })
        } else {
            console.error('Logout handler is not available')
        }
    }, [newLogoutHandler, navigate])

    return null;
}
