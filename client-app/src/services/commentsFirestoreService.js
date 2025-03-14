import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, DocumentSnapshot, startAfter } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
// import { mainPagePostsQuery } from './queries';

function getCommentsCollectionRef(postId) {
    return collection(firestoreDB, `user-posts-test1/${postId}/comments`)
}

export const addComment = async ({ postId, values, addNewToState }) => {

    const commentsCollectionRef = getCommentsCollectionRef(postId)

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
        addNewToState(newComment)

    } catch (error) {
        window.alert("Error while adding comment: ", error)
        console.error(error)
    }
}

export const getlatestsComments = async ({ postId }) => {

    const commentsCollectionRef = getCommentsCollectionRef(postId)

    const commentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), limit(11))

    const documentSnapshot = await getDocs(commentsQuery)

    let comments = documentSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })

    let moreAvailable = comments.length > 10

    if (moreAvailable) {
        comments = comments.slice(0, 10)
    }

    return { comments, moreAvailable }
}


export const deleteComment = async ({ postId, commentId }) => {
    const commentRef = doc(firestoreDB, `user-posts-test1/${postId}/comments/${commentId}`)

    try {
        await deleteDoc(commentRef)
    } catch (error) {
        console.error("Error while deleting comment: ", error)
    }
}

export const getMoreComments = async ({ postId, lastCommentId }) => {

    const commentsCollectionRef = getCommentsCollectionRef(postId)

    const lastSnapshot = await getDoc(doc(firestoreDB, `user-posts-test1/${postId}/comments/${lastCommentId}`))

    const newCommentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastSnapshot), limit(11))

    const newCommentsSnapshot = await getDocs(newCommentsQuery)

    let newComments = newCommentsSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })

    let moreAvailable = newComments.length > 10

    if (moreAvailable) {
        newComments = newComments.slice(0, 10)
    }

    return { newComments, moreAvailable }

}