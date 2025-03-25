import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { Link } from "react-router-dom";
import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

import { getMainPostsPerPage } from "../../services/postFirestoreService";

import Pagination from "../pagination/Pagination";

function Home() {

    const [posts, setPosts] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { pageNumber } = useParams()
    const defaultUrl = "home"

    useEffect(() => {

        let tempPageNumber = pageNumber

        if (typeof pageNumber === 'undefined') {
            tempPageNumber = 0
        } else tempPageNumber = Number(pageNumber)

        if (isNaN(tempPageNumber)) {
            window.alert('Error with URL. Please try again.')
            return
        }


        getMainPostsPerPage(Number(pageNumber))
            .then(({ latestPostResult, morePostsAvailableResult }) => {

                if (latestPostResult.length > 5) {
                    SetMoreAvailable(true)
                } else {
                    SetMoreAvailable(false)
                }

                setCurrentPage(Number(tempPageNumber))

                SetMoreAvailable(morePostsAvailableResult)

                setPosts(latestPostResult)

            }).catch(err => console.error(err))

    }, [pageNumber, currentPage])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">


                    {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {posts.length === 0 ? <h1>There are no posts!</h1> : ''}


                    {moreAvailable === true || currentPage > 0 ?
                        <Pagination
                            defaultUrl={defaultUrl}
                            currentPage={currentPage}
                            moreAvailable={moreAvailable}
                        /> : "No more posts available!"}

                </div>
            </div>
        </section>

    );
}


export default Home;