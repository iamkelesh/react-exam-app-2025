import { collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { firestoreDB } from '../firebase/config';

const postCollectionRef = collection(firestoreDB, 'user-posts-test1')

const latestMainPostsQuery = query(
    postCollectionRef,
    orderBy("createdAt", "desc"),
    limit(6)
)

export async function mainPagePostsQuery(pageNumber) {
    console.log("pageNumber: ", pageNumber)
    if (!isNaN(pageNumber) && pageNumber > 0) {

        const previousPageQuery = query(postCollectionRef, orderBy('createdAt', 'desc'), limit(5 * pageNumber))

        const previousPageSnapshot = await getDocs(previousPageQuery)

        const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1]

        return query(postCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(6))

    } else {
        return latestMainPostsQuery
    }
}