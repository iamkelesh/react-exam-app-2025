import { collection, addDoc, getDocs, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

const collectionRef = collection(firestoreDB, 'user-posts');


export const createNewPost = async ({ values, accessToken, navigate }) => {

    if (!accessToken) {
        throw new Error('User is not authenticated');
    }

    const collectionRef = collection(firestoreDB, 'user-posts');

    try {

        const postData = {
            ...values,
            createdAt: serverTimestamp()
        }

        await addDoc(collectionRef, postData)

        alert('Post created successfully!')

        navigate('/')

    } catch (error) {
        console.log(error.message);
        console.error("Error while creating post at service: ", error)
        alert('Post creation failed. Please try again.')
    }
}

export const updatePostDetails = async ({ postId, values, navigate }) => {
    const docRef = doc(firestoreDB, 'user-posts', postId)

    try {
        await updateDoc(docRef, values)

        navigate('/')

    } catch (error) {
        throw new Error("Error while updating post details at service: ", error)
    }
}

export const deletePost = async (postId0) => {

    const docRef = doc(firestoreDB, 'user-posts', postId0)

    try {
        await deleteDoc(docRef)
        alert('Post deleted successfull')
    } catch (error) {
        throw new Error("Error while deleting post at service: ", error)
    }
}


export const searchPost = async (searchInput) => {
    const collectionRef = collection(firestoreDB, 'user-posts');

    try {
        const querySnapshot = await getDocs(collectionRef);
        const result = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
            .filter(post => post.title.toLowerCase().includes(searchInput.toLowerCase()));

        return result
    } catch (error) {
        console.log(error.message);
    }
};