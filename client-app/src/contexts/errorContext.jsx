import { createContext, useEffect, useState } from "react"



const ErrorContext = createContext()


export const ErrorProvider = ({ children }) => {


    const [errorState, setErrorState] = useState(
        {
            errorMessage: '',
            showError: false,
        }
    )

    const showErrorHandler = (message) => {
        setErrorState({ errorMessage: message, showError: true })
    }

    const hideErrorHandler = () => {
        setErrorState({ errorMessage: '', showError: false })
    }


    const values = {
        errorState,
        showErrorHandler,
        hideErrorHandler,
    }


    return (
        <ErrorContext.Provider value={values}>
            {children}
        </ErrorContext.Provider>
    )
}


export default ErrorContext