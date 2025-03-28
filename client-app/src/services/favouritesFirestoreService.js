import { collection, addDoc, getDocs, serverTimestamp, query, deleteDoc, where } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

export async function addToFavourites({ postId, userId, body, title }) {

    const collectionref = collection(firestoreDB, `user-info/${userId}/favourite-posts`)

    try {

        await addDoc(collectionref, {
            postId: postId,
            addedAt: serverTimestamp(),
            body,
            title
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

        canBeFavourite = !!querySnapshot.empty

        canBeRemoved = !canBeFavourite

        return { canBeFavourite, canBeRemoved }

    } catch (error) {
        console.error("Error while checking for favourite: ", error)
    }


}

export async function removeFromFavorites({ postId, userId }) {

    const collectionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts/`)

    const q = query(collectionRef, where("postId", "==", postId))

    try {
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {

            const docRef = querySnapshot.docs[0].ref

            await deleteDoc(docRef)

            alert('Post removed from favourites successfully!')
        } else {
            alert('No such favourite post found.')
        }

    }
    catch (error) {

        console.error("Error while removing from favourites: ", error)

        alert('Post removing from favourites failed. Please try again.')
    }
}

export async function getAllFavourites(userId, pageNumber) {

    const colelctionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`)

    const querySnapshot = await getDocs(colelctionRef)

    let favouritePosts = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })

    if (favouritePosts.length > 5) {

        favouritePosts = favouritePosts.slice(0, 5)

        return { moreFavPostsAvailableResult: true, latestFavPostResult: favouritePosts }
    } else {
        return { moreFavPostsAvailableResult: false, latestFavPostResult: favouritePosts }
    }
}