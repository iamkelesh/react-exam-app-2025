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

        if (Object.values(values).every(value => value !== '')) {
            submitHandler(values)
        } else {
            alert('Please fill in all fields')
        }

    }

    return ({
        values,
        onChange,
        onSubmit
    })
}