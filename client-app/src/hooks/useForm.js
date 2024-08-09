import { useState } from "react";

export const useForm = (submitHandler, initialValues) => {
    const [values, setValues] = useState(initialValues)

    const onChange = (e) => {
        setValues(x => ({
            ...x,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        submitHandler(values)
    }

    return ({
        values,
        onChange,
        onSubmit
    })
}