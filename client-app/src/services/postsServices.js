import * as requester from './requester'

const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
  return await requester.get({url: baseUrl})
}

export const getLatest = async () => {
  try {
    return await requester.get({url: `${baseUrl}?sortBy=_createdOn%20desc&pageSize=6`})
  } catch (error) {
    console.log(error.message)
    // alert(error.message)
    return []
  }
}

export const getPerPage = async (page) => {
  try {
    const offset = Number(page) * 5
    return await requester.get({url: `${baseUrl}?sortBy=_createdOn%20desc&offset=${offset}&pageSize=6`})
  } catch (error) {
    console.log(error.message)
    // alert(error.message)
    return []
  }
}

export const createPostService = async ({ values, accessToken, navigate }) => {
  try {
    await requester.post({ url: baseUrl, values, accessToken })
    navigate('/')
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}

export const getByUserId = async (userId) => {
  try {
    return await requester.get({url: `${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc&pageSize=999`})
  } catch (error) {
    console.log(error.message)
    alert(error.message)
    return []
  }
}

export const getOneService = async (id) => {
  return await requester.get({url: `${baseUrl}/${id} `})
}

export const editService = async ({ values, accessToken, navigate, postId }) => {
  try {
    await requester.put({url:`${baseUrl}/${postId}`, values, accessToken})
    navigate('/')
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
};


export const removeService = async (postId, accessToken) => requester.remove({url:`${baseUrl}/${postId}`, accessToken})
