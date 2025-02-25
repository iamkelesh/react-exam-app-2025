import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
// import { mainPagePostsQuery } from './queries';


export const addComment = async ({postId, values}) => {
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

