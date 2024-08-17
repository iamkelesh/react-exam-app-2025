``

import * as requester from './requester'

const baseUrl = 'http://localhost:3030/data/comments';

export const createCommentService = async ({ values, accessToken, postId, updateComments }) => {
    try {

        const result = await requester.post({ url: baseUrl, values: { ...values, postId }, accessToken })
        updateComments([result])
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export const getCommentsForPost = async ({ postId, updateComments }) => {
    try {
        let result = await requester.get({ url: `${baseUrl}?where%3DpostId%3D=${postId}%22&load=author%3D_ownerId%3Ausers` })
        updateComments(result)
    } catch (error) {
        console.log(error.message)
        alert(error.message)
        return []
    }
}