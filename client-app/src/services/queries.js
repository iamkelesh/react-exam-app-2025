import { collection, query, orderBy, startAfter, limit, getDocs, where } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

const postCollectionRef = collection(firestoreDB, 'user-posts')

const latestMainPostsQuery = query(
    postCollectionRef,
    orderBy("createdAt", "desc"),
    limit(6)
)

export const homePageQuery = query(
    postCollectionRef,
    orderBy("createdAt", "desc"),
    limit(5)
)

export async function mainPagePostsQuery(pageNumber) {
    if (!isNaN(pageNumber) && pageNumber > 0) {

        const previousPageQuery = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(5 * pageNumber))

        const previousPageSnapshot = await getDocs(previousPageQuery)

        const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]

        return query(postCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(6))

    } else {
        return latestMainPostsQuery
    }
}

export async function myPostsQuery(userId, pageNumber) {

    if (!isNaN(pageNumber) && pageNumber > 0) {
        const previousPageQuery = query(postCollectionRef, orderBy('createdAt', 'desc'), where("ownerId" == userId), limit(5 * pageNumber))

        const previousPageSnapshot = await getDocs(previousPageQuery)

        const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]

        return query(postCollectionRef, orderBy('createdAt', 'desc'), where("ownerId", "==", userId), startAfter(lastVisible), limit(6))
    } else {
        return query(postCollectionRef, orderBy('createdAt', 'desc'), where("ownerId", "==", userId), limit(6))
    }
}

export function postsQuery({ lastSnapshot, category }) {


    const queryBuilder = [
        orderBy("createdAt", "desc"),
        ...(category ? [where("category", "==", category)] : []),
        ...(lastSnapshot ? [startAfter(lastSnapshot)] : []),
        limit(11)
    ]

    return query(postCollectionRef, ...queryBuilder)

}   