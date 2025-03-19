import { Link } from "react-router-dom"

function SmallPostTemplate({ id, title, body, postId }) {

    const thisId = postId || id

    return (

        <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">CATEGORY</span>
                <span className="mt-1 text-gray-500 text-sm">TODO: Add Created at!</span>
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{title}</h2>
                <p className="leading-relaxed">{(body.length > 100) ? body.substring(0, 200) + '...' : body}</p>
                <Link to={`/posts/details/${thisId}`} className="text-indigo-500 inline-flex items-center mt-4">Details
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default SmallPostTemplate


{/* <div className="item mb-5" id={thisId}>
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
</div> */}
