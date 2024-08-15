

import * as requester from './requester'

const baseUrl = 'http://localhost:3030/data/comments';

export const createCommentService = async ({ values, accessToken, navigate, postId }) => {
    try {
        const result = await requester.post({ url: baseUrl, values: { ...values, postId }, accessToken, })
        navigate('/')
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}