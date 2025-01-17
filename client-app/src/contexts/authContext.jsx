import { createContext, useState } from "react"
import { useNavigate } from "react-router"

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import firebaseApp from "../firebase/config"

// import { login, register } from "../services/authService"
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
            const { email, password } = values
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

                const user = userCredential.user;
                setAuthState(user)
                navigate('/')
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
    const logoutHandler = () => {
        setAuthState({});
    };


    const newLoginHandler = async ({ values }) => {
        try {
            const { email, password } = values

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    setAuthState(user)
                    navigate('/')
                })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    }
    const values = {
        // registerSubmitHandler,
        // loginSubmitHandler,
        newRegisterHandler,
        newLoginHandler,
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