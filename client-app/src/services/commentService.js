``

import * as requester from './requester'

const baseUrl = 'http://localhost:3030/data/comments';

export const createCommentService = async ({ values, accessToken, navigate, postId }) => {
    try {
        // console.log(typeof postId)
        // console.log('POSTID IN COMMENT SERVICE ')
        const result = await requester.post({ url: baseUrl, values: { ...values, ...postId }, accessToken })
        console.log(result)
        navigate(`/posts/details/${postId}`)
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export const getCommentsForPost = async (postId) => {
    try {
        let result = await requester.get({ url: `${baseUrl}?where=postId%3D%22${postId}%22&load=author%3D_ownerId%3Ausers` })
        // console.log(result)
        return result
    } catch (error) {
        console.log(error.message)
        alert(error.message)
        return []
    }
}