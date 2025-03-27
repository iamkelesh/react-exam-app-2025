import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, orderBy, query, updateDoc, deleteDoc, limit, where, startAfter } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { homePageQuery, mainPagePostsQuery, myPostsQuery } from './queries';

const collectionRef = collection(firestoreDB, 'user-posts-test1');


export const createNewPost = async ({ values, accessToken, navigate }) => {

    if (!accessToken) {
        throw new Error('User is not authenticated');
    }

    const collectionRef = collection(firestoreDB, 'user-posts-test1');

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

export const getMainPostsPerPage = async (pageNumber) => {

    try {

        let neededQuery = await mainPagePostsQuery(pageNumber)

        const querySnapshot = await getDocs(neededQuery)

        let latestPostResult = querySnapshot.docs.map(doc => {

            const docData = doc.data()

            const docId = doc.id

            return { id: docId, ...docData }
        })

        let morePostsAvailableResult = false

        if (latestPostResult.length > 5) {
            morePostsAvailableResult = true
            latestPostResult = latestPostResult.slice(0, 5)
        }


        return { latestPostResult, morePostsAvailableResult }


    } catch (error) {
        console.error("Error while getting posts at service: ", error)
    }
}

export const getMyPostsPerPage = async (userId, pageNumber) => {
    try {

        const neededQuery = await myPostsQuery(userId, pageNumber)

        const querySnapshot = await getDocs(neededQuery)

        let latestMyPostResult = querySnapshot.docs.map(doc => {

            const docData = doc.data()

            const docId = doc.id

            return { id: docId, ...docData }
        })

        let moreMyPostsAvailableResult = false

        if (latestMyPostResult.length > 5) {

            moreMyPostsAvailableResult = true

            latestMyPostResult = latestMyPostResult.slice(0, 5)
        }

        return { moreMyPostsAvailableResult, latestMyPostResult }


    } catch (error) {
        console.error("Error while getting posts at service: ", error)
    }
}

export const updatePostDetails = async ({ postId, values, navigate }) => {
    const docRef = doc(firestoreDB, 'user-posts-test1', postId)

    try {
        await updateDoc(docRef, values)

        navigate('/')

    } catch (error) {
        throw new Error("Error while updating post details at service: ", error)
    }
}

export const deletePost = async (postId0) => {

    const docRef = doc(firestoreDB, 'user-posts-test1', postId0)

    try {
        await deleteDoc(docRef)
        alert('Post deleted successfull')
    } catch (error) {
        throw new Error("Error while deleting post at service: ", error)
    }
}


export const searchPost = async (searchInput) => {
    const collectionRef = collection(firestoreDB, 'user-posts-test1');

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