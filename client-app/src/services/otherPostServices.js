import { useContext } from "react"

import { collection, addDoc, getDocs, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

import ErrorContext from "../../contexts/errorContext"

const { showErrorHandler } = useContext(ErrorContext)

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
        console.log(error);
        showErrorHandler('Error while creating post!')
    }
}

export const updatePostDetails = async ({ postId, values, navigate }) => {

    const docRef = doc(firestoreDB, 'user-posts', postId)

    try {
        await updateDoc(docRef, values)

        navigate('/')

    } catch (error) {
        console.log(error);
        showErrorHandler('Error while updating post!')
    }
}

export const deletePost = async (postId0) => {

    const docRef = doc(firestoreDB, 'user-posts', postId0)

    try {
        await deleteDoc(docRef)
        alert('Post deleted successfull')
    } catch (error) {
        console.log(error);
        showErrorHandler('Error while deleting post!')
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
        console.log(error);
        showErrorHandler('Error while searching for posts!')
    }
};