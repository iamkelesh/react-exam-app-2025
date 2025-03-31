import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';


export const likePost = async ({ postId, userId }) => {
    if (!postId || !userId) {
        throw new Error("Post ID or User ID is missing")
    }

    const likesCollectionRef = collection(firestoreDB, `user-posts/${postId}/likes`);

    try {
        await addDoc(likesCollectionRef, { userId });
        return true
    } catch (error) {
        throw error;
    }
}

export const checkIfLiked = async ({ postId, userId }) => {
    if (!postId || !userId) {
        throw new Error("Post ID or User ID is missing")
    }

    const likesCollectionRef = collection(firestoreDB, `user-posts/${postId}/likes`);
    const q = query(likesCollectionRef, where("userId", "==", userId))

    try {
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty; // Returns true if the user has liked the post
    } catch (error) {
        throw error
    }
}


export const getLikesCount = async (postId) => {
    if (!postId) {
        throw new Error("Post ID is missing");
    }

    const likesCollectionRef = collection(firestoreDB, `user-posts/${postId}/likes`)

    try {
        const querySnapshot = await getDocs(likesCollectionRef)
        return querySnapshot.size; // Returns the number of documents in the collection
    } catch (error) {
        throw error;
    }
};


export const dislikePost = async ({ postId, userId }) => {
    if (!postId || !userId) {
        throw new Error("Post ID or User ID is missing")
    }

    const likesCollectionRef = collection(firestoreDB, `user-posts/${postId}/likes`)
    const q = query(likesCollectionRef, where("userId", "==", userId))

    try {
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref
            await deleteDoc(docRef);
            return true;
        } else {
            throw new Error("No like found for this user on the post.")
        }
    } catch (error) {
        throw error
    }
}