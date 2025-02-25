import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { Link } from "react-router-dom";
import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

import { getMainPostsPerPage } from "../../services/postFirestoreService";


function Home() {

    const [posts, setPosts] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { pageNumber } = useParams()

    useEffect(() => {

        if (currentPage === Number(pageNumber) || typeof pageNumber === 'undefined') return

        getMainPostsPerPage(Number(pageNumber))
        .then(({latestPostResult, morePostsAvailableResult }) => {
            if (latestPostResult.length > 5) {
                SetMoreAvailable(true)
            } else {
                SetMoreAvailable(false)
            }

            setCurrentPage(Number(pageNumber))
            SetMoreAvailable(morePostsAvailableResult)
            setPosts(latestPostResult)

        }).catch(err => console.error(err))
        
    }, [pageNumber, currentPage])

    useEffect(() => {
        let tempPageNumber = pageNumber

        if (typeof pageNumber === 'undefined') {
            tempPageNumber = 0
        }

        const gettingLatestPosts = async () => {

            try {

                let { latestPostResult, morePostsAvailableResult } = await getMainPostsPerPage(tempPageNumber)

                setPosts(latestPostResult)
                SetMoreAvailable(morePostsAvailableResult)

            } catch (error) {
                console.error("Error while getting latest posts at Home.jsx: ", error)
            }
        }
        gettingLatestPosts()
    }, [])

    return (
        <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
                <div className="container text-center">
                    <h2 className="heading">DevBlog - A Blog Template Made For Developers</h2>
                </div>
            </section>
            <section className="blog-list px-3 py-5 p-md-5">
                <div className="container">

                    {posts.map(data => <SmallPostTemplate key={data._id} {...data} />)}
                    {posts.length === 0 ? <h1>There are no posts!</h1> : ''}


                    <nav className="blog-nav nav nav-justified my-5">

                        {currentPage > 0 ? <Link
                            className={"nav-link-prev nav-item nav-link  rounded-left"}
                            // className={`nav-link-prev nav-item nav-link` + (currentPage > 0 ? ' ' : 'd-none') + `rounded-left`}

                            to={`/home/${currentPage - 1}`}
                        >
                            Previous
                            <i className="arrow-prev fas fa-long-arrow-alt-left" />
                        </Link> : ''}
                        {moreAvailable === true ?
                            <Link
                                className="nav-link-next nav-item nav-link rounded"
                                to={`/home/${currentPage + 1}`}
                            >
                                Next
                                <i className="arrow-next fas fa-long-arrow-alt-right" />
                            </Link> : ""}
                    </nav>

                </div>
            </section>
        </div>

    );
}


export default Home;