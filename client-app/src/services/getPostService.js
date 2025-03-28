import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { homePageQuery, myPostsQuery, postsQuery } from './queries';

const collectionRef = collection(firestoreDB, 'user-posts');


export const getAllPost2 = async ({ lastSnapshot, category }) => {

    let neededQuery = postsQuery({ lastSnapshot, category })

    try {
        const querySnapshot = await getDocs(neededQuery)

        let moreAvailable = false

        let slicedDocs = querySnapshot.docs

        if (slicedDocs.length > 10) {

            moreAvailable = true

            slicedDocs = slicedDocs.slice(0, 10)
        }

        let lastDoc = slicedDocs[slicedDocs.length - 1]

        let newPosts = slicedDocs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return { newPosts, lastDoc, moreAvailable }

    } catch (error) {
        console.log(error);
        // return { newPosts: [], lastDoc: null, moreAvailable: false }
    }
}

export const getLatestHomePost = async () => {
    try {
        const querySnapshot = await getDocs(homePageQuery)

        let latestPostResult = querySnapshot.docs.map(doc => {

            const docData = doc.data()

            const docId = doc.id

            return { id: docId, ...docData }
        })

        console.log(latestPostResult)

        return latestPostResult
    } catch (error) {
        console.log('getLatestHomePost failed')
        console.log(error)
        return []
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

export const getPostsDetails = async (postId) => {

    const docRef = doc(firestoreDB, 'user-posts', postId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        throw new Error('No such document!')
    }
}
