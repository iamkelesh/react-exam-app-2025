import * as requester from './requester';

const baseUrl = 'http://localhost:3030/users';


export const register = async ({ values }) => {
    return await requester.post({ url: `${baseUrl}/register`, values: {fullName:values.fullName, email: values.email, password: values.password } })
}

export const login = async ({ values }) => {
    return await requester.post({ url: `${baseUrl}/login`, values })
}

export const logout = () => requester.get(`${baseUrl}/logout`)

