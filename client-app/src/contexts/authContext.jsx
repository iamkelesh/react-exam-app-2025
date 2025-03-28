import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, validatePassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

import { firebaseApp, firestoreDB } from "../firebase/config"

const AuthContext = createContext()

const auth = getAuth(firebaseApp)

export const AuthProvider = ({ children }) => {


    const navigate = useNavigate()

    const [authState, setAuthState] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                getDoc(doc(firestoreDB, "user-info", user.uid)).then(userInfoSnap => {

                    if (!userInfoSnap.exists()) {
                        windows.alert('No such user !')
                        return
                    }

                    const { fullName } = userInfoSnap.data()

                    setAuthState({
                        uid: user.uid,
                        email: user.email,
                        accessToken: user.accessToken,
                        fullName: fullName,
                    })

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
            ``
            const { email, password, fullName, bio, jobTitle } = values

            const status = await validatePassword(getAuth(), password);

            if (!status.isValid) {
                window.alert('Password is not valid. Must be at least 6 characters long.')
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            await setDoc(doc(firestoreDB, "user-info", user.uid), {
                fullName,
                email,
                jobTitle,
                bio,
                createdAt: serverTimestamp()
            })


            setAuthState({
                uid: user.uid,
                email: user.email,
                fullName: fullName,
                accessToken: user.accessToken,
            })

            navigate('/')

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

            const userInfoSnap = await getDoc(doc(firestoreDB, "user-info", user.uid))

            if (!userInfoSnap.exists()) {
                windows.alert('No such user !')
                return
            }

            const { fullName } = userInfoSnap.data()

            setAuthState({
                uid: user.uid,
                fullName: fullName,
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
        fullName: authState.fullName,
        accessToken: authState.accessToken,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext