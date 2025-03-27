import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, orderBy, query, updateDoc, deleteDoc, limit, where, startAfter } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { homePageQuery, mainPagePostsQuery, myPostsQuery, allPostsQuery, postsByCategoryQuery } from './queries';

const collectionRef = collection(firestoreDB, 'user-posts-test1');


export const getAllPosts = async ({ lastSnapshot }) => {

    let neededQuery = allPostsQuery({ lastSnapshot })
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

export const getByCategory = async ({ lastSnapshot, category }) => {

    let neededQuery = postsByCategoryQuery({ lastSnapshot, category })

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

        return latestPostResult
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getPostsDetails = async (postId) => {

    const docRef = doc(firestoreDB, 'user-posts-test1', postId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        throw new Error('No such document!')
    }
}
