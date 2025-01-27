import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import firebaseApp from "../firebase/config"

const AuthContext = createContext()

const auth = getAuth(firebaseApp)
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [authState, setAuthState] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setAuthState({
                    uid: user.uid,
                    email: user.email,
                    // Add other properties as needed
                })
                console.log('User is signed in:', user)
            } else {
                // No user is signed in
                setAuthState({})
                console.log('No user is signed in')
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
                    // Add other properties as needed
                })
                navigate('/')
            })
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const logoutHandler = () => {
        setAuthState({})
    }

    const newLoginHandler = async ({ values }) => {
        try {
            const { email, password } = values
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            setAuthState({
                uid: user.uid,
                email: user.email,
                // Add other properties as needed
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
        logoutHandler,
        isAuthenticated: !!authState.uid,
        email: authState.email,
        userId: authState.uid,
        // Add other properties as needed
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext