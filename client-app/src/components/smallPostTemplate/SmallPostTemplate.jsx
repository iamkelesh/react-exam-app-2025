import { Link } from "react-router-dom"

function SmallPostTemplate({ id, title, body, postId }) {

    const thisId = postId || id

    return (
        <div className="item mb-5" id={thisId}>
            <div className="media">
                <div className="media-body">
                    <h3 className="title mb-1">
                        <a>{title}</a>
                    </h3>
                    <div className="meta mb-1">

                    </div>
                    <div className="intro">
                        {(body.length > 100) ? body.substring(0, 200) + '...' : body}
                    </div>

                    <Link to={`/posts/details/${thisId}`} className="more-link" >Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default SmallPostTemplate