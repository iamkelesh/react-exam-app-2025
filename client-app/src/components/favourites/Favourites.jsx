import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import { getAllFavourites } from "../../services/favouritesFirestoreService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

function Favourites() {

    const [favPosts, setFavPosts] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { pageNumber } = useParams()

    const { userId } = useContext(AuthContext)


    useEffect(() => {

        let tempPageNumber = pageNumber

        if (typeof pageNumber === 'undefined') {
            tempPageNumber = 0
        } else tempPageNumber = Number(pageNumber)

        if (isNaN(tempPageNumber)) {
            window.alert('Error with URL. Please try again.')
            return
        }

        getAllFavourites(userId, tempPageNumber)
            .then(({ moreFavPostsAvailableResult, latestFavPostResult }) => {

                setCurrentPage(Number(tempPageNumber))

                setFavPosts(latestFavPostResult)

                SetMoreAvailable(moreFavPostsAvailableResult)
            })
            .catch(err => console.error(err))



    }, [pageNumber, currentPage])

    return (
        <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
                <div className="container text-center">
                    <h2 className="heading">DevBlog - A Blog Template Made For Developers</h2>

                </div>
            </section>
            <section className="blog-list px-3 py-5 p-md-5">
                <div className="container">
                    {favPosts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {favPosts.length === 0 ? <h1>There are no posts!</h1> : ''}

                    <nav className="blog-nav nav nav-justified my-5">

                        {currentPage > 0 ? <Link
                            className={"nav-link-prev nav-item nav-link  rounded-left"}

                            to={`/user/posts/${currentPage - 1}`}
                        >
                            Previous
                            <i className="arrow-prev fas fa-long-arrow-alt-left" />
                        </Link> : ''}
                        {moreAvailable === true ?
                            <Link
                                className="nav-link-next nav-item nav-link rounded"
                                to={`/user/posts/${currentPage + 1}`}
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


export default Favourites;