import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, orderBy, query, updateDoc, deleteDoc, limit, where, startAfter } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { homePageQuery, mainPagePostsQuery, myPostsQuery } from './queries';

const collectionRef = collection(firestoreDB, 'user-posts-test1');


export const getAllPosts = async ({ lastSnapshot }) => {

    try {
        if (!lastSnapshot) {

            const allPostsQuery = query(
                collectionRef,
                orderBy("createdAt", "desc"),
                limit(11)
            )

            const querySnapshot = await getDocs(allPostsQuery)

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

        } else {
            let lastDocQuery = query(collectionRef, orderBy('createdAt', 'desc'), startAfter(lastSnapshot), limit(11))

            const querySnapshot = await getDocs(lastDocQuery)

            let moreAvailable = false

            let slicedDocs = querySnapshot.docs

            if (slicedDocs.length > 10) {

                moreAvailable = true

                slicedDocs = slicedDocs.slice(0, 10)

            }

            let lastDoc = slicedDocs[slicedDocs.length - 1]

            let newPosts = slicedDocs.map(doc => {

                const docData = doc.data()

                const docId = doc.id

                return { id: docId, ...docData }
            })

            return { newPosts, lastDoc, moreAvailable }

        }

    } catch (error) {
        console.log(error);
        return { posts: [], lastDoc: null, moreAvailable: false }
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
