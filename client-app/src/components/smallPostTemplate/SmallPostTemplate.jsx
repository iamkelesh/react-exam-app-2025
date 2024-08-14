import { Link } from "react-router-dom"
import { getOneService } from "../../services/postsServices"

function SmallPostTemplate({_id, title, body}) {
    return (
        <div className="item mb-5" id={_id}>
            <div className="media">
                {/* <img
                    className="mr-3 img-fluid post-thumb d-none d-md-flex"
                    src="assets/images/blog/blog-post-thumb-4.jpg"
                    alt="image"
                /> */}
                <div className="media-body">
                    <h3 className="title mb-1">
                        <a href="blog-post.html">{title}</a>
                    </h3>
                    <div className="meta mb-1">
                        {/* <span className="date">Published 2 months ago</span> */}
                        {/* <span className="time">15 min read</span> */}
                        {/* <span className="comment">
                            <a href="#">3 comments</a>
                        </span> */}
                    </div>
                    <div className="intro">
                        {(body.length > 100) ? body.substring(0, 200) + '...' : body}
                    </div>
                    {/* <a className="more-link" href="blog-post.html">
                        Read more →
                    </a> */}
                    <Link to={`/posts/details/${_id}`} className="more-link" >Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default SmallPostTemplate