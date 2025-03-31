import { getDocs, doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

import { homePageQuery, postsQuery } from './queries';


export const getAllPost2 = async ({ lastSnapshot, category, userId }) => {

    let neededQuery = postsQuery({ lastSnapshot, category, userId })

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
        throw error
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


        return latestPostResult
    } catch (error) {
        throw error
    }
}


export const getPostsDetails = async (postId) => {

    const docRef = doc(firestoreDB, 'user-posts', postId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        throw error
    }
}
