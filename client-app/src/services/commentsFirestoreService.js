import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, updateDoc, deleteDoc, query, orderBy, limit, DocumentSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
// import { mainPagePostsQuery } from './queries';


export const addComment = async ({ postId, values }) => {

    const commentsCollectionRef = collection(firestoreDB, `user-posts-test1/${postId}/comments`)

    try {
        await addDoc(commentsCollectionRef, {
            ...values,
            createdAt: serverTimestamp()
        })
        console.log('Comment added successfully!')
    } catch (error) {
        console.error("Error while adding comment: ", error)
    }
}

export const getlatestsComments = async ({ postId }) => {

    const commentsCollectionRef = collection(firestoreDB, `user-posts-test1/${postId}/comments`)

    const commentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'desc'), limit(11))

    const documentSnapshot = await getDocs(commentsQuery)

    let comments = documentSnapshot.docs.map(doc => {
        return { _id: doc.id, ...doc.data() }
    })

    let moreAvailable = comments.length > 10

    if (moreAvailable) {
        comments = comments.slice(0, 10)
    }

    return { comments, moreAvailable }
}