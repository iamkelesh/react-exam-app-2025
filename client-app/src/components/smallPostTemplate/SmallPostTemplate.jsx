import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function SmallPostTemplate({_id, title, body}) {

    return (
        <div className="item mb-5" id={_id}>
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

                    <Link  to={`/posts/details/${_id}`} className="more-link" >Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default SmallPostTemplate