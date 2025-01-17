import { createContext, useState } from "react"
import { useNavigate } from "react-router"

// import { login, register } from "../services/authService"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import firebaseApp from "../firebase/config"
// import { get } from "../services/requester"

const AuthContext = createContext()

const auth = getAuth(firebaseApp)
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [authState, setAuthState] = useState({})

    // OLD REGISTER HANDLER
    // const registerSubmitHandler = async ({values}) => {

    //     try {
    //         const result = await register({values})
    //         setAuthState(result)
    //         navigate('/')

    //     } catch (error) {
    //         console.log(error)
    //         alert(error.message)
    //     }

    // }

    // OLD LOGIN HANDLER
    // const loginSubmitHandler = async ({values}) => {
    //     try {
    //         const result = await login({values})
    //         setAuthState(result)
    //         navigate('/')
    //     } catch (error) {
    //         console.log(error)
    //         alert(error.message)
    //     }
    // }


    const newRegisterHandler = async ({ values }) => {
        try {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
    const logoutHandler = () => {
        setAuthState({});
    };

    const values = {
        // registerSubmitHandler,
        // loginSubmitHandler,
        logoutHandler,
        isAuthenticated: !!authState.accessToken,
        fullName: authState.fullName,
        email: authState.email,
        userId: authState._id,
        accessToken: authState.accessToken

    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext