import { collection, addDoc, getDocs, serverTimestamp, orderBy, doc , getDoc    } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { mainPagePostsQuery } from './queries';

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

            return { _id: docId, ...docData }
        })

        let morePostsAvailableResult = false

        if (latestPostResult.length > 5) {
            morePostsAvailableResult = true
            latestPostResult = latestPostResult.slice(0, 5)
        }

        console.log("latestPostResult: ", latestPostResult)

        return { latestPostResult, morePostsAvailableResult }


    } catch (error) {
        console.error("Error while getting posts at service: ", error)
    }
}

export const getPostsDetails = async (postId) => {

    const docRef = doc(firestoreDB, 'user-posts-test1', postId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { _id: docSnap.id, ...docSnap.data() }
    } else {
        throw new Error('No such document!')
    }
}