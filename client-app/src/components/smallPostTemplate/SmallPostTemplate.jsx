import { Link } from "react-router-dom"

function SmallPostTemplate({ id, title, body, postId }) {

    const thisId = postId || id

    return (

        <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span class="font-semibold title-font text-gray-700">CATEGORY</span>
                <span class="mt-1 text-gray-500 text-sm">TODO: Add Created at!</span>
            </div>
            <div class="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{title}</h2>
                <p class="leading-relaxed">{(body.length > 100) ? body.substring(0, 200) + '...' : body}</p>
                <Link to={`/posts/details/${thisId}`} class="text-indigo-500 inline-flex items-center mt-4">Details
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
