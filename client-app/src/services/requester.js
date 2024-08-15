// import AuthContext from "../contexts/authContext"
// import { useContext } from "react"

const requester = async (method, url, data, accessToken) => {
    // let { accessToken } = useContext(AuthContext)
    let options = {}
    // console.log(data)

    if (data) {
        options.body = JSON.stringify(data)
        options.headers = {
            'Content-Type': 'application/json'
        }

    }
    if (accessToken) {
        console.log(accessToken)
    }
    if (accessToken) {
        options.headers = {
            ...options.headers,
            'X-Authorization': accessToken
        };
    }

    let response = await fetch(url, { method, ...options })
    // console.log(response)
    if (response.status === 204) {
        return {};
    }

    let result = await response.json()
    // console.log(result.email)
    if (!response.ok) {
        throw result;
    }

    return result
}



export const get = requester.bind(null, 'GET')
export const post = requester.bind(null, 'POST')
export const put = requester.bind(null, 'PUT')
export const remove = requester.bind(null, 'DELETE')
