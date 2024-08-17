import {useEffect, useState} from "react";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";
import {getLatest} from "../../services/postsServices";


function Home() {

    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        getLatest().then(res => setLatestPosts(res)).catch(err => console.error(err))
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

                    {latestPosts.map(data => <SmallPostTemplate key={data._id} {...data} />)}

                    {/* <nav className="blog-nav nav nav-justified my-5">
                        <a
                            className="nav-link-prev nav-item nav-link d-none rounded-left"
                            href="#"
                        >
                            Previous
                            <i className="arrow-prev fas fa-long-arrow-alt-left" />
                        </a>
                        <a
                            className="nav-link-next nav-item nav-link rounded"
                            href="blog-list.html"
                        >
                            Next
                            <i className="arrow-next fas fa-long-arrow-alt-right" />
                        </a>
                    </nav> */}
                </div>
            </section>
            {/* TODO ADD PAGINATION */}
        </div>

    );
}


export default Home;