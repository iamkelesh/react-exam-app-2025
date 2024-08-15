import * as requester from './requester';

const baseUrl = 'http://localhost:3030/users';


export const register = async ({ values }) => {
    console.log(values)
    return await requester.post({ url: `${baseUrl}/register`, values })
}

export const login = async ({ values }) => {
    const authData = await requester.post({ url: `${baseUrl}/login`, values })
    return authData
}

export const logout = () => requester.get(`${baseUrl}/logout`)

