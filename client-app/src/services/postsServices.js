import * as requester from './requester'

const baseUrl = 'http://localhost:3030/data/posts'

export const getAll = async () => {
  const result = await requester.get({ url: baseUrl })
  return result
}

export const getLatest = async () => {
  try {
    const result = await requester.get({ url: `${baseUrl}?sortBy=_createdOn%20desc&offset=0&pageSize=5` })
    return result
  } catch (error) {
    console.log(error.message)
    // alert(error.message)
    return []
  }
}

export const createPostService = async ({ values, accessToken, navigate }) => {
  try {
    const result = await requester.post({ url: baseUrl, values, accessToken })
    navigate('/')
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}

export const getByUserId = async (userId) => {
  try {
    const result = await requester.get({ url: `${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc` })
    return result
  } catch (error) {
    console.log(error.message)
    alert(error.message)
    return []
  }
}

export const getOneService = async (id) => {
  const result = await requester.get({ url: `${baseUrl}/${id} ` })
  return result
}

export const editService = async ({ values, accessToken, navigate, postId }) => {
  try {
    const result = await requester.put({url:`${baseUrl}/${postId}`, values, accessToken})
    navigate('/')
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
};


export const removeService = async (postId, accessToken) => requester.remove(`${baseUrl}/${postId}`, undefined, accessToken)
