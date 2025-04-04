import { createContext, useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router"

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, validatePassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

import ErrorContext from "../contexts/errorContext"

import { firebaseApp, firestoreDB } from "../firebase/config"

const AuthContext = createContext()

const auth = getAuth(firebaseApp)

export const AuthProvider = ({ children }) => {

    const { showErrorHandler } = useContext(ErrorContext)


    const navigate = useNavigate()

    const [authState, setAuthState] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {

                getDoc(doc(firestoreDB, "user-info", user.uid)).then(userInfoSnap => {

                    let currentName

                    if (!userInfoSnap.exists()) {

                        showErrorHandler('No user info exist! Please, contact admin !')

                        currentName = 'Undefined name'
                    } else {
                        const { fullName } = userInfoSnap.data()

                        currentName = fullName
                    }


                    setAuthState({
                        uid: user.uid,
                        email: user.email,
                        accessToken: user.accessToken,
                        fullName: currentName,
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
                showErrorHandler('Password is not valid. Must be at least 6 characters long.')
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

            showErrorHandler('Error while registering user')
        }
    }

    const newLogoutHandler = () => {

        navigate('/')

        return signOut(auth).then(() => {

            setAuthState({})

        }).catch((error) => {

            console.error('Error signing out:', error)

            showErrorHandler('Error signing out')
        })
    }

    const newLoginHandler = async ({ values }) => {

        try {

            const { email, password } = values

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            const userInfoSnap = await getDoc(doc(firestoreDB, "user-info", user.uid))

            let currentName
            if (!userInfoSnap.exists()) {
                showErrorHandler('Error while loading user info! Please, contact admin !')
                currentName = 'Undefined name'
            } else {
                const { fullName } = userInfoSnap.data()
                currentName = fullName
            }


            setAuthState({
                uid: user.uid,
                fullName: currentName,
                email: user.email,
                accessToken: user.accessToken,
            })

            navigate('/')

        } catch (error) {

            console.log(error)

            showErrorHandler('Error while logging in')
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