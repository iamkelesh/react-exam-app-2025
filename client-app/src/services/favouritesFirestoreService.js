import { collection, addDoc, getDocs, serverTimestamp, query, doc, getDoc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

export async function addToFavourites({ postId, userId }) {
    const collectionref = collection(firestoreDB, `user-info/${userId}/favourite-posts`)

    try {

        await addDoc(collectionref, {
            postId: postId,
            addedAt: serverTimestamp()
        })

    } catch (error) {
        console.log(error.message);
        alert('Post adding to favourites failed. Please try again.')
    }

}

export async function checkForFavourite({ postId, userId }) {

    let canBeFavourite = false
    let canBeRemoved = false

    const collectionref = collection(firestoreDB, `user-info/${userId}/favourite-posts`)

    const q = query(collectionref, where("postId", "==", postId))

    try {
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot.empty)
        canBeFavourite = !!querySnapshot.empty
        canBeRemoved = !canBeFavourite
        return { canBeFavourite, canBeRemoved }

    } catch (error) {
        console.error("Error while checking for favourite: ", error)
    }


}

export async function removeFromFavorites({ postId, userId }) {

    const favouritePostRef = doc(firestoreDB, `user-info/${userId}/favourite-posts/${postId}`)

    try {
        await deleteDoc(favouritePostRef)
        alert('Post removed from favourites successfully!')
    }
    catch (error) {
        console.error("Error while removing from favourites: ", error)
        alert('Post removing from favourites failed. Please try again.')
    }
}

export async function getAllFavourites({ userId }) {
    const colelctionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`)

    const querySnapshot = await getDocs(colelctionRef)

    let favouritePosts = querySnapshot.docs.map(doc => {
        return { _id: doc.id, ...doc.data() }
    })

}