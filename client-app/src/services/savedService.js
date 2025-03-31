import { collection, addDoc, getDocs, serverTimestamp, query, deleteDoc, where } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';
import { getSavedQuery } from './queries';

export async function addToSaved({ dataState, userId }) {

    const collectionref = collection(firestoreDB, `user-info/${userId}/saved-posts`)

    try {

        await addDoc(collectionref, {
            ...dataState
        })

        return true
    } catch (error) {
        throw error
    }

}

export async function checkForSaved({ postId, userId }) {

    if (!postId || !userId) {
        console.error("postId or userId is missing")
        return
    }

    let canBeSaved = false
    let canBeUnSaved = false

    const collectionref = collection(firestoreDB, `user-info/${userId}/saved-posts`)

    const q = query(collectionref, where("id", "==", postId))

    try {
        const querySnapshot = await getDocs(q)

        canBeSaved = !!querySnapshot.empty

        canBeUnSaved = !canBeSaved

        return { canBeSaved, canBeUnSaved }

    } catch (error) {
        throw error
    }


}

export async function removeFromSaved({ postId, userId }) {

    const collectionRef = collection(firestoreDB, `user-info/${userId}/saved-posts`)

    const q = query(collectionRef, where("id", "==", postId))

    try {

        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {

            const docRef = querySnapshot.docs[0].ref

            await deleteDoc(docRef)

            return true
        } else {
            throw new Error('No such saved post found.')
        }

    }
    catch (error) {
        throw error
    }
}

export async function getSaved({ userId, lastSnapshot }) {

    const neededQuery = getSavedQuery({ userId, lastSnapshot })

    if(!userId) throw new Error('userId is missing')
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