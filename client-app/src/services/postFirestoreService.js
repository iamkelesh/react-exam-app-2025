import { getFirestore, collection, addDoc , serverTimestamp} from 'firebase/firestore';
import {firebaseApp} from '../firebase/config';


const firestore = getFirestore(firebaseApp);

export const createNewPost = async ({values, accessToken, navigate}) => {
    if (!accessToken) {
        throw new Error('User is not authenticated');
    }

    const collectionRef = collection(firestore, 'user-posts-test1');

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
        alert('Post creation failed. Please try again.')
    }
}

