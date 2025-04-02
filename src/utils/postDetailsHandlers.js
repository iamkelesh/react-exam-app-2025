import { likePost, dislikePost } from '../services/likeServices'
import { deletePost } from '../services/otherPostServices'
import { addToSaved, removeFromSaved } from '../services/savedService'


export async function deletePostHandler({ postId, navigate, showErrorHandler, pending }) {

    if (!window.confirm("Are you sure you want to delete this post?")) return
    if (pending.current) {
        showErrorHandler('Please wait for the previous request to finish!')
        return
    }
    pending.current = true

    try {
        await deletePost(postId)
        pending.current = false
        navigate('/home')

    } catch (error) {
        console.error("Error while deleting post at PostDetails.jsx: ", error)
        showErrorHandler('Error while deleting post!')
        pending.current = false
    }
}

export function redirectToEdit(postId) {
    if (!window.confirm("Are you sure you want to edit this post?")) return
    navigate(`/posts/edit/${postId}`)
}

export async function addSavedHandler({ dataState, userId, setSaveState, showErrorHandler, pending }) {
    if (pending.current) {
        showErrorHandler('Please wait for the previous request to finish!')
        return
    }
    pending.current = true
    try {
        const result = await addToSaved({ dataState, userId })
        if (result) {
            setSaveState({ canBeSaved: false })
            pending.current = false
        } else {
            throw new Error('Error while saving post!')
        }

    } catch (error) {
        showErrorHandler(error)
        console.error(error.message)
        pending.current = false

    }

}

export async function removeSavedHandler({ postId, userId, setSaveState, showErrorHandler, pending }) {

    if (pending.current) {
        showErrorHandler('Please wait for the previous request to finish!')
        return
    }

    pending.current = true

    try {
        const result = await removeFromSaved({ postId, userId })
        if (result) {
            setSaveState({ canBeSaved: true })
            pending.current = false
        } else {
            throw new Error('Error while unsaving post!')
        }

    } catch (error) {
        showErrorHandler(error)
        console.error(error.message)
        pending.current = false
    }
}


export const formatedDate = (date) => {
    if (date instanceof Date) {
        return date.toDateString()
    } else if (date && date.toDate) {
        return date.toDate().toDateString()
    } else {
        return 'Invalid Date'
    }
}

export const showCommentsHandler = ({ showComments, setShowComments }) => {
    let oldState = showComments
    setShowComments(!oldState)
}

export const likeHandler = async ({ postId, userId, setWasLiked, showErrorHandler, pending }) => {
    if (pending.current) {
        showErrorHandler('Please wait for the previous request to finish!')
        return
    }

    pending.current = true

    try {
        await likePost({ postId, userId })
        setWasLiked(true)
        pending.current = false
    } catch (error) {
        console.error("Error while liking post at PostDetails.jsx: ", error)
        showErrorHandler('Error while liking post!')
        pending.current = false

    }
}

export const dislikeHandler = async ({ postId, userId, setWasLiked, showErrorHandler, pending }) => {
    if (pending.current) {
        showErrorHandler('Please wait for the previous request to finish!')
        return
    }

    pending.current = true

    try {
        await dislikePost({ postId, userId })
        setWasLiked(false)
        pending.current = false
    } catch (error) {
        console.error("Error while disliking post at PostDetails.jsx: ", error)
        showErrorHandler('Error while disliking post!')
        pending.current = false

    }
}