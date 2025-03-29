import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getPostsDetails } from "../../services/getPostService"
import AuthContext from "../../contexts/authContext";
import { deletePost } from "../../services/otherPostServices";


import Comments from "../comments/Comments";

function PostDetails() {
    const [dataState, setDataState] = useState({})
    const { userId, fullName, isAuthenticated } = useContext(AuthContext)
    const [showComments, setShowComments] = useState(false)
    
    const navigate = useNavigate()


    const { postId } = useParams()

    function deletePostHandler() {

        if (!window.confirm("Are you sure you want to delete this post?")) return
        deletePost(postId)
            .then(() => {
                navigate('/home')
            })
            .catch(error => {
                console.error("Error while deleting post at PostDetails.jsx: ", error)
            })
    }

    function redirectToEdit() {
        if (!window.confirm("Are you sure you want to edit this post?")) return
        navigate(`/posts/edit/${postId}`)
    }


    const formatedDate = (date) => {
        if (date instanceof Date) {
            return date.toDateString()
        } else if (date && date.toDate) {
            return date.toDate().toDateString()
        } else {
            return 'Invalid Date'
        }
    }

    const showCommentsHandler = () => {
        let oldState = showComments
        setShowComments(!oldState)
    }

    useEffect(() => {
        getPostsDetails(postId)
            .then(result => {
                setDataState(result)
            })
            .catch(error => {
                console.error("Error while getting post details at PostDetails.jsx: ", error)
            })
    }, [postId, navigate])

    return (
        <div className="w-full md:w-2/5 mx-auto">
            <div className="mx-5 my-3 text-sm">
                <a href="" className=" text-red-600 font-bold tracking-widest">{dataState.category}</a>
            </div>
            <div className="w-full text-gray-800 text-4xl px-5 font-bold leading-none">
                {dataState.title}
            </div>

            <div className="w-full text-gray-500 px-5 pb-5 pt-2">
                Sub Title {dataState.subTitle}

            </div>

            <div className="w-full text-gray-600 font-thin italic px-5 pt-3">
                By <strong className="text-gray-700">Posted by user name {dataState.publisherName}</strong><br />

                {formatedDate(dataState.createdAt)}<br />

            </div>

            <div className="px-5 w-full mx-auto">
                <p className="my-5">{dataState.body}</p>

            </div>

            <span className="isolate inline-flex rounded-md shadow-sm">
                <>
                    <div id="crudButtons"
                        className="flex flex-col items-center justify-center">

                        <div className="flex h-20 items-center justify-center gap-1 pb-3">

                            <button
                                onClick={showCommentsHandler}
                                className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                {showComments ? 'Hide comments' : 'Show comments'}
                            </button>


                            {dataState.ownerId === userId && (
                                <>
                                    <button onClick={redirectToEdit}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Edit post
                                    </button>

                                    <button
                                        onClick={deletePostHandler}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Delete post
                                    </button>
                                </>

                            )}

                        </div>


                    </div>
                </>

            </span>

            <div className={`pt-6 ` + (showComments ? 'block' : 'hidden')}>
                <Comments currentId={userId} creatorName={fullName} isAuthenticated={isAuthenticated} />
            </div>



        </div>

    )
}

export default PostDetails