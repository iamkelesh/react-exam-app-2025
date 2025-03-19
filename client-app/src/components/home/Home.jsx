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
        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-5 py-24 mx-auto">
                <div class="-my-8 divide-y-2 divide-gray-100">


                    {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {posts.length === 0 ? <h1>There are no posts!</h1> : ''}


                </div>
            </div>
        </section>

    );
}


export default Home;




// <div className="main-wrapper">
//     <section className="cta-section theme-bg-light py-5">
//         <div className="container text-center">
//             <h2 className="heading">DevBlog - A Blog Template Made For Developers</h2>
//         </div>
//     </section>
//     <section className="blog-list px-3 py-5 p-md-5">
//         <div className="container">

//             {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
//             {posts.length === 0 ? <h1>There are no posts!</h1> : ''}


//             <nav className="blog-nav nav nav-justified my-5">

//                 {currentPage > 0 ? <Link
//                     className={"nav-link-prev nav-item nav-link  rounded-left"}

//                     to={`/home/${currentPage - 1}`}
//                 >
//                     Previous
//                     <i className="arrow-prev fas fa-long-arrow-alt-left" />
//                 </Link> : ''}
//                 {moreAvailable === true ?
//                     <Link
//                         className="nav-link-next nav-item nav-link rounded"
//                         to={`/home/${currentPage + 1}`}
//                     >
//                         Next
//                         <i className="arrow-next fas fa-long-arrow-alt-right" />
//                     </Link> : ""}
//             </nav>

//         </div>
//     </section>
// </div>