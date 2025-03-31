import { likePost, dislikePost } from '../services/likeServices'
import { deletePost } from '../services/otherPostServices'
import { addToSaved, removeFromSaved } from '../services/savedPostServices'


export function deletePostHandler({ postId, navigate, showErrorHandler }) {

    if (!window.confirm("Are you sure you want to delete this post?")) return
    deletePost(postId)
        .then(() => {
            navigate('/home')
        })
        .catch(error => {
            console.error("Error while deleting post at PostDetails.jsx: ", error)
            showErrorHandler('Error while deleting post!')
        })
}

export function redirectToEdit(postId) {
    if (!window.confirm("Are you sure you want to edit this post?")) return
    navigate(`/posts/edit/${postId}`)
}

export function addSavedHandler({ dataState, userId, setSaveState, showErrorHandler }) {
    addToSaved({ dataState, userId }).then(result => {
        if (result) {
            setSaveState({ canBeSaved: false })
        }
    }).catch(error => {
        showErrorHandler('Error while saving post!')
        console.error("Error while saving post at PostDetails.jsx: ", error)
    })
}

export function removeSavedHandler({ postId, userId, setSaveState, showErrorHandler }) {
    removeFromSaved({ postId, userId }).then(result => {
        if (result) {
            setSaveState({ canBeSaved: true })
        }
    }).catch(error => {
        showErrorHandler('Error while unsaving post!')
        console.error("Error while unsaving post at PostDetails.jsx: ", error)
    })
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

export const likeHandler = ({ postId, userId, setWasLiked, showErrorHandler }) => {
    likePost({ postId, userId })
        .then(() => {
            setWasLiked(true)
        })
        .catch(error => {
            console.error("Error while liking post at PostDetails.jsx: ", error)
            showErrorHandler('Error while liking post!')
        })
}

export const dislikeHandler = ({ postId, userId, setWasLiked, showErrorHandler }) => {
    dislikePost({ postId, userId })
        .then(() => {
            setWasLiked(false)
        })
        .catch(error => {
            console.error("Error while disliking post at PostDetails.jsx: ", error)
            showErrorHandler('Error while disliking post!')
        })
}