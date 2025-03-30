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
        console.log(error.message);
        alert('Post adding to saved failed. Please try again.')
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
        console.error("Error while checking for saved: ", error)
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
            alert('No such favourite post found.')
        }

    }
    catch (error) {

        console.error("Error while removing from favourites: ", error)

        alert('Post removing from favourites failed. Please try again.')
    }
}

export async function getSaved({ userId, lastSnapshot }) {

    const neededQuery = getSavedQuery({ userId, lastSnapshot })

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
        console.log(err)
    }

}


export async function getSaved2({ userId, lastSnapshot }) {
    const collectionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`);
    const q = query(
        collectionRef,
        orderBy("addedAt", "desc"),
        ...(lastSnapshot ? [startAfter(lastSnapshot)] : []),
        limit(10)
    );
    try {
        const querySnapshot = await getDocs(q);
        const savedPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { savedPosts, lastDoc, moreAvailable: querySnapshot.docs.length === 10 };
    } catch (error) {
        console.error("Error fetching saved posts: ", error);
        return { savedPosts: [], lastDoc: null, moreAvailable: false };
    }
}


export async function removeFromSaved2({ postId, userId }) {
    const collectionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`);
    const q = query(collectionRef, where("postId", "==", postId));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
            alert('Post removed from favourites successfully!');
        } else {
            alert('No such favourite post found.');
        }
    } catch (error) {
        console.error("Error removing from favourites: ", error);
        alert('Failed to remove post from favourites. Please try again.');
    }
}

export async function checkForSaved2({ postId, userId }) {
    const collectionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`);
    const q = query(collectionRef, where("postId", "==", postId));
    try {
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking for saved post: ", error);
        return false;
    }
}



export async function addToSaved2({ postId, userId, body, title }) {
    const collectionRef = collection(firestoreDB, `user-info/${userId}/favourite-posts`);
    try {
        await addDoc(collectionRef, {
            postId,
            title,
            body,
            addedAt: serverTimestamp(),
        });
        alert('Post added to favourites successfully!');
    } catch (error) {
        console.error("Error adding to favourites: ", error);
        alert('Failed to add post to favourites. Please try again.');
    }
}