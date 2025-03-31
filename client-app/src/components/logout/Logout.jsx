import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import ErrorContext from "../../contexts/errorContext"

export default function Logout() {

    const { showErrorHandler } = useContext(ErrorContext)

    const navigate = useNavigate();

    const { newLogoutHandler } = useContext(AuthContext);

    useEffect(() => {

        if (newLogoutHandler) {

            newLogoutHandler()
                .catch((error) => {

                    console.error('Error during logout:', error)
                    showErrorHandler('Error during logout!')
                    navigate('/home')
                })
        } else {
            console.log('Logout handler is not available')
        }
    }, [newLogoutHandler, navigate])

    return null;
}
