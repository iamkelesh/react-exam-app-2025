import { Link } from "react-router-dom"

function SmallPostTemplate({ id, title, body, postId, createdAt, ownerId, category, creatorName }) {

    const formatedDate = (date) => {
        if (date instanceof Date) {
            return date.toDateString()
        } else if (date && date.toDate) {
            return date.toDate().toDateString()
        } else {
            return 'Invalid Date'
        }
    }


    const thisId = postId || id

    return (
        <>
            {/* <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">CATEGORY</span>
                    <span className="mt-1 text-gray-500 text-sm">TODO: Add Created at!</span>
                </div>
                <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{title}</h2>
                    <p className="leading-relaxed">{(body.length > 100) ? body.substring(0, 220) + '...' : body}</p>
                    <Link to={`/posts/details/${thisId}`} className="text-indigo-500 inline-flex items-center mt-4">Details
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div> */}


            <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md mx-auto">
                <div className="flex justify-between items-center">
                    <span className="font-light text-gray-600">{formatedDate(createdAt)}</span>
                    <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" >{category}</a>
                </div>
                <div className="mt-2">
                    <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" >{title}</a>
                    <p className="mt-2 text-gray-600">{(body.length > 100) ? body.substring(0, 202) + '...' : body}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Link to={`/posts/details/${thisId}`} className="text-blue-600 hover:underline">Read more</Link>
                    <div>
                        <Link className="flex items-center" to={`/user/${ownerId}`}>
                            {/* <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar"/> */}
                            <h1 className="text-gray-700 font-bold">{creatorName}</h1>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SmallPostTemplate
