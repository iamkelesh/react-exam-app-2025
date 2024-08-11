import * as requester from './requester'
const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
    const result = await requester.get(baseUrl)
    return result
}

export const createService = async (postData,accessToken) => {
    const result = await requester.post(baseUrl, postData,accessToken)
    return result
}

export const getOneService = async (id) => {
    const result = await requester.get(`${baseUrl}/${id}`)
    return result
}

export const editService = async (gameId, gameData) => {
    const result = await requester.put(`${baseUrl}/${gameId}`, gameData)

    return result
};
