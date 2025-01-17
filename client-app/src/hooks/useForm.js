import { useState } from "react";

export const useForm = ({ submitHandler, 
    initialValues, 
    // accessToken, 
    // navigate, 
    // postId, 
    // updateComments, 
    // fetchComments, 
    // createCommentService 
}) => {
    const [values, setValues] = useState(initialValues)

    const onChange = (e) => {
        setValues(x => ({
            ...x,
            [e.target.name]: e.target.value
        }))
    }

    // const clearState = () => {
    //     setValues(initialValues)
    // }

    const onSubmit = (e) => {
        e.preventDefault()

        if (values.repeatPassword !== undefined && values.password !== values.repeatPassword) {
            alert('Passwords do not match')
            return
        }

        if (Object.values(values).every(value => value !== '')) {
            submitHandler({ 
                values, 
                // accessToken, 
                // navigate, 
                // postId, 
                // updateComments, 
                // fetchComments, 
                // createCommentService , 
                // clearState
            })
        } else {
            alert('Please fill in all fields')
        }

    }


    return ({
        values,
        onChange,
        onSubmit,
    })
}