import * as requester from './requester'
import { useNavigation } from '../contexts/navigationContext';


const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
    const result = await requester.get(baseUrl)
    return result
}

export const getLatest = async () => {
  try {
    const result = await requester.get(`${baseUrl}?sortBy=_createdOn%20desc&offset=0&pageSize=5`)
    return result
  } catch (error) {
    console.log(error.message)
    // alert(error.message)
    return []
  }
}

export const createService = async (postData, accessToken, navigate) => {
    try {
        const result = await requester.post(baseUrl, postData, accessToken)
        navigate('/')
    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}

export const getOneService = async (id) => {
    const result = await requester.get(`${baseUrl}/${id}`)
    return result
}

export const editService = async (gameId, gameData) => {
    const result = await requester.put(`${baseUrl}/${gameId}`, gameData)

    return result
};


export const removeService = async (postId) => requester.remove(`${baseUrl}/${postId}`)
