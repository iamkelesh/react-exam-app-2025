const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
    const result = await requester.get(baseUrl)
    return result
}

export const create = async (postData) => {
    const result = await requester.post(baseUrl, postData)
    return result
}

export const getOne = async (id) => {
    const result = await requester.get(`${baseUrl}/${id}`)
    return result
}

export const edit = async (gameId, gameData) => {
    const result = await requester.put(`${baseUrl}/${gameId}`, gameData)

    return result
};
