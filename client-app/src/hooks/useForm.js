import { useState, useContext } from "react";
import ErrorContext from "../contexts/errorContext";

export const useForm = ({ submitHandler,
    initialValues,
    accessToken,
    navigate,
    postId,
    addNewToState,
    // updateComments, 
    // fetchComments, 
    // createCommentService 
}) => {
    const { showErrorHandler } = useContext(ErrorContext)

    const [values, setValues] = useState(initialValues)

    const onChange = (e) => {
        setValues(x => ({
            ...x,
            [e.target.name]: e.target.value
        }))
    }

    const clearState = () => {
        setValues(initialValues)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (values.repeatPassword !== undefined && values.password !== values.repeatPassword) {
            alert('Passwords do not match')
            throw new Error('Passwords do not match')
        }

        if (Object.values(values).every(value => value !== '')) {
            submitHandler({
                values,
                accessToken,
                navigate,
                postId,
                addNewToState,
                // updateComments, 
                // fetchComments, 
                // createCommentService , 
                clearState
            })
        } else {
            let emptyFieldsKeys = []
            Object.entries(values).forEach(([key, value]) => {
                if (value === '') {
                    emptyFieldsKeys.push(key)
                }
            })
            // return Promise.reject(new Error('Please fill in all fields: ' + emptyFieldsKeys.join(', ')))
            showErrorHandler('Please fill in all fields: ' + emptyFieldsKeys.join(', '))
            console.error('Please fill in all fields: ', emptyFieldsKeys.join(', '))
        }

    }

    return ({
        values,
        onChange,
        onSubmit,
    })
}