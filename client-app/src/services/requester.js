const requester = async (method, url, data) => {
    let options = {}
    // console.log(data)

    if (data) {
        options.body = JSON.stringify(data)
        options.headers = {
            'Content-Type': 'application/json'
        }

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
