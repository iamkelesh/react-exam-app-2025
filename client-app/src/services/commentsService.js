import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, DocumentSnapshot, startAfter } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { getCommentsQuery } from './queries';

function getCommentsCollectionRef(postId) {
    return collection(firestoreDB, `user-posts/${postId}/comments`)
}

export const addComment = async ({ values, addNewToState, clearState }) => {

    const commentsCollectionRef = getCommentsCollectionRef(values.postId)

    console.log(values)
    if (!values.postId) {
        throw new Error("Post ID is missing")

    }
    for (const key in values) {
        if (values[key] === '') {
            throw new Error(`Missing field: ${key}! Please fill all fields!`)
        }
    }
    try {
        const docRef = await addDoc(commentsCollectionRef, {
            ...values,
            createdAt: serverTimestamp()
        })

        const newComment = {
            id: docRef.id,
            ...values,
            createdAt: new Date()
        }
        clearState()
        addNewToState(newComment)

    } catch (error) {
        throw error
    }
}

export const getlatestsComments = async ({ postId }) => {

    try {
        const commentsCollectionRef = getCommentsCollectionRef(postId)

        const commentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), limit(6))

        const documentSnapshot = await getDocs(commentsQuery)

        let comments = documentSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })

        let moreAvailable = comments.length > 5

        if (moreAvailable) {
            comments = comments.slice(0, 5)
        }

        return { comments, moreAvailable }
    } catch (error) {
        throw error
    }
}


export const deleteComment = async ({ postId, commentId }) => {
    const commentRef = doc(firestoreDB, `user-posts/${postId}/comments/${commentId}`)

    try {
        await deleteDoc(commentRef)
    } catch (error) {
        throw error
    }
}

export const getMoreComments = async ({ postId, lastCommentId }) => {

    try {
        const commentsCollectionRef = getCommentsCollectionRef(postId)

        const lastSnapshot = await getDoc(doc(firestoreDB, `user-posts/${postId}/comments/${lastCommentId}`))

        const newCommentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastSnapshot), limit(6))

        const newCommentsSnapshot = await getDocs(newCommentsQuery)

        let newComments = newCommentsSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })

        let moreAvailable = newComments.length > 5

        if (moreAvailable) {
            newComments = newComments.slice(0, 5)
        }

        return { newComments, moreAvailable }
    } catch (error) {
        throw error
    }

}

export const getComments = async ({ postId, lastSnapshot }) => {

    try {
        const neededQuery = getCommentsQuery({ postId, lastSnapshot })

        const commentsSnaphot = await getDocs(neededQuery)

        let slicedComments = commentsSnaphot.docs

        let moreAvailable = slicedComments.length > 5

        if (moreAvailable) {

            slicedComments = slicedComments.slice(0, 5)
        }

        let lastComment = commentsSnaphot.docs[commentsSnaphot.docs.length - 1]

        let newComments = slicedComments.map(doc => {
            return { id: doc.id, ...doc.data() }
        })


        return {
            newComments,
            lastComment,
            moreAvailable
        }
    } catch (error) {
        throw error
    }
}