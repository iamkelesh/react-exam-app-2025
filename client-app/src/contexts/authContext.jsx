import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

import { firebaseApp } from "../firebase/config"

const AuthContext = createContext()

const auth = getAuth(firebaseApp)

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [authState, setAuthState] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                setAuthState({
                    uid: user.uid,
                    email: user.email,
                    accessToken: user.accessToken,
                })
            } else {
                setAuthState({})
            }
        })

        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    const newRegisterHandler = async ({ values }) => {
        try {
            const { email, password } = values
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user
                setAuthState({
                    uid: user.uid,
                    email: user.email,
                    accessToken: user.accessToken,
                    // Add other properties as needed
                })
                navigate('/')
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const newLogoutHandler = () => {

        navigate('/')

        return signOut(auth).then(() => {

            setAuthState({})

        }).catch((error) => {

            console.error('Error signing out:', error)
            alert(error.message)
        })
    }

    const newLoginHandler = async ({ values }) => {
        try {

            const { email, password } = values
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            setAuthState({
                uid: user.uid,
                email: user.email,
                accessToken: user.accessToken,
            })

            navigate('/')

        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const values = {
        newRegisterHandler,
        newLoginHandler,
        newLogoutHandler,
        isAuthenticated: !!authState.accessToken,
        email: authState.email,
        userId: authState.uid,
        accessToken: authState.accessToken,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext