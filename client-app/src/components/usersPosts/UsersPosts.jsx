import { useEffect, useState, useContext } from "react";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";
// import { getLatestByUserId, getPerPageByUser } from "../../services/postsServices";
import AuthContext from "../../contexts/authContext";
import { Link, useParams } from "react-router-dom";
import { getMyPostsPerPage } from "../../services/postFirestoreService";


function Home() {

    const [myPosts, setMyPosts] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { pageNumber } = useParams()

    const { userId } = useContext(AuthContext)
    // console.log(userId)
    // useEffect(() => {
    //     getLatestByUserId(userId).then(res => {
    //         if (res.length > 5) {
    //             SetMoreAvailable(true)
    //         }
    //         setPosts(res)
    //     })
    //         .catch(err => console.error(err))
    // }, [userId])


    useEffect(() => {

        let tempPageNumber = pageNumber

        if (typeof pageNumber === 'undefined') {
            tempPageNumber = 0
        } else tempPageNumber = Number(pageNumber)


        if(isNaN(tempPageNumber)) {
            window.alert('Error with URL. Please try again.')
            return
        }

        getMyPostsPerPage(userId, tempPageNumber)
        .then(({ moreMyPostsAvailableResult, latestMyPostResult }) => {
            setCurrentPage(Number(tempPageNumber))
            setMyPosts(latestMyPostResult)
            SetMoreAvailable(moreMyPostsAvailableResult)
        })
        .catch(err => console.error(err))

        

    }, [pageNumber, currentPage])



    // useEffect(() => {

    //     let tempPageNumber = pageNumber

    //     if (typeof pageNumber === 'undefined') {
    //         tempPageNumber = 0
    //     }

    //     getMyPostsPerPage(userId, tempPageNumber)
    //         .then(result => console.log(result))
    //         // .then(({ latestMyPostResult, moreMyPostsAvailableResult }) => {
    //         //     setPosts(latestMyPostResult)
    //         //     SetMoreAvailable(moreMyPostsAvailableResult)
    //         // })
    //         .catch(error => {
    //             console.error(error)
    //             window.alert('Error while getting posts')
    //         })
    // }, [])

    // useEffect(() => {
    //     if (currentPage === Number(pageNumber) || typeof pageNumber === 'undefined') return
    //     getPerPageByUser(userId, Number(pageNumber)).then(res => {
    //         if (res.length > 5) {
    //             SetMoreAvailable(true)
    //         } else {
    //             SetMoreAvailable(false)
    //         }
    //         // const newPage = Number(currentPage) + 1
    //         setCurrentPage(Number(pageNumber))
    //         setPosts(res)
    //     }).catch(err => console.error(err))
    // })

    // useEffect(() => {
    //     getByUserId(userId).then(res => setLatestPosts(res)).catch(err => console.error(err))
    // }, [userId])


    return (
        <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
                <div className="container text-center">
                    <h2 className="heading">DevBlog - A Blog Template Made For Developers</h2>

                </div>
            </section>
            <section className="blog-list px-3 py-5 p-md-5">
                <div className="container">
                    {myPosts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {myPosts.length === 0 ? <h1>There are no posts!</h1> : ''}

                    <nav className="blog-nav nav nav-justified my-5">

                        {currentPage > 0 ? <Link
                            className={"nav-link-prev nav-item nav-link  rounded-left"}
                            // className={`nav-link-prev nav-item nav-link` + (currentPage > 0 ? ' ' : 'd-none') + `rounded-left`}

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


export default Home;