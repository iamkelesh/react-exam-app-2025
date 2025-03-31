import { collection, addDoc, getDocs, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';



const collectionRef = collection(firestoreDB, 'user-posts');

export const createNewPost = async ({ values, accessToken, navigate }) => {

    if (!accessToken) {
        console.log(error.message);
        showErrorHandler('Error while creating post! User not authenticated!')
        return
    }

    try {

        const postData = {
            ...values,
            createdAt: serverTimestamp()
        }

        await addDoc(collectionRef, postData)

        navigate('/')

    } catch (error) {
            throw error
    }
}

export const updatePostDetails = async ({ postId, values, navigate }) => {

    const docRef = doc(firestoreDB, 'user-posts', postId)

    try {
        await updateDoc(docRef, values)

        navigate('/')

    } catch (error) {
        throw error
    }
}

export const deletePost = async (postId0) => {

    const docRef = doc(firestoreDB, 'user-posts', postId0)

    try {
        await deleteDoc(docRef)
        alert('Post deleted successfull')
    } catch (error) {
        throw error
    }
}


export const searchPost = async (searchInput) => {

    try {
        const querySnapshot = await getDocs(collectionRef);
        const result = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
            .filter(post => post.title.toLowerCase().includes(searchInput.toLowerCase()));

        return result
    } catch (error) {
        throw error
    }
};