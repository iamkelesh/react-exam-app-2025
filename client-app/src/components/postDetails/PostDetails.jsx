import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import AuthContext from "../../contexts/authContext";
import ErrorContext from "../../contexts/errorContext"

import { getPostsDetails } from "../../services/getPostService"
import { deletePost } from "../../services/otherPostServices";
import { addToSaved, checkForSaved, removeFromSaved } from "../../services/savedService";
import { checkIfLiked, dislikePost, likePost } from "../../services/likeServices";

import Comments from "../comments/Comments";

function PostDetails() {
    const { showErrorHandler } = useContext(ErrorContext)
    const { userId, fullName, isAuthenticated } = useContext(AuthContext)

    const [dataState, setDataState] = useState({})
    const [showComments, setShowComments] = useState(false)
    const [saveState, setSaveState] = useState({ canBeSaved: false })
    const [wasLiked, setWasLiked] = useState(false)

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
                showErrorHandler('Error while deleting post!')
            })
    }

    function redirectToEdit() {
        if (!window.confirm("Are you sure you want to edit this post?")) return
        navigate(`/posts/edit/${postId}`)
    }

    function addSavedHandler() {
        addToSaved({ dataState, userId }).then(result => {
            if (result) {
                setSaveState({ canBeSaved: false })
            }
        }).catch(error => {
            showErrorHandler('Error while saving post!')
            console.error("Error while saving post at PostDetails.jsx: ", error)
        })
    }

    function removeSavedHandler() {
        removeFromSaved({ postId, userId }).then(result => {
            if (result) {
                setSaveState({ canBeSaved: true })
            }
        }).catch(error => {
            showErrorHandler('Error while unsaving post!')
            console.error("Error while unsaving post at PostDetails.jsx: ", error)
        })
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

    const likeHandler = () => {
        likePost({ postId, userId })
            .then(() => {
                setWasLiked(true)
            })
            .catch(error => {
                console.error("Error while liking post at PostDetails.jsx: ", error)
                showErrorHandler('Error while liking post!')
            })
    }

    const dislikeHandler = () => {
        dislikePost({ postId, userId })
            .then(() => {
                setWasLiked(false)
            })
            .catch(error => {
                console.error("Error while disliking post at PostDetails.jsx: ", error)
                showErrorHandler('Error while disliking post!')
            })
    }

    useEffect(() => {
        getPostsDetails(postId)
            .then(result => {
                setDataState(result)
            })
            .catch(error => {
                console.error("Error while getting post details at PostDetails.jsx: ", error)
                showErrorHandler('Error while getting post details!')
            })
    }, [postId, navigate])

    useEffect(() => {
        if (!postId || !userId) return
        checkIfLiked({ postId, userId })
            .then(result => {
                setWasLiked(result)
            })
            .catch(error => {
                console.error("Error while checking if post was liked: ", error)
                showErrorHandler('Error while checking if post was liked!')
            })
    }, [userId, postId])

    useEffect(() => {
        if (!userId) return
        checkForSaved({ postId, userId })
            .then(({ canBeSaved }) => {
                setSaveState({ canBeSaved })
            })
            .catch(error => {
                console.error("Error while checking for saved posts: ", error)
            })
    }, [userId, postId])

    return (
        <div className="w-full md:w-2/5 mx-auto">
            {/* CATEGORY */}
            <div className="mx-5 my-3 text-sm">
                <a href="" className=" text-red-600 font-bold tracking-widest">{dataState.category}</a>
            </div>
            {/* TITLE */}
            <div className="w-full text-gray-800 text-4xl px-5 font-bold leading-none">
                {dataState.title}
            </div>
            {/* SUBTITLE */}
            <div className="w-full text-gray-500 px-5 pb-5 pt-2">
                Sub Title {dataState.subTitle}

            </div>
            {/* CREATOR */}
            <div className="w-full text-gray-600 font-thin italic px-5 pt-3">
                By <strong className="text-gray-700">Posted by {dataState.creatorName}</strong><br />

                {formatedDate(dataState.createdAt)}<br />

            </div>

            {/* BODY */}
            <div className="px-5 w-full mx-auto">
                <p className="my-5">{dataState.body}</p>

            </div>

            {/* A LOT OF BUTTONS  */}
            <span className="isolate inline-flex rounded-md shadow-sm">

                <div id="crudButtons"
                    className="flex flex-col items-center justify-center">

                    <div className="flex h-20 items-center justify-center gap-1 pb-3">

                        <button
                            onClick={showCommentsHandler}
                            className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            {showComments ? 'Hide comments' : 'Show comments'}
                        </button>

                        {/* BUTTONS FOR AUTH USERS */}
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


                        {/* SAVE BUTOTNS */}
                        {isAuthenticated &&
                            (saveState.canBeSaved ?
                                <button
                                    onClick={addSavedHandler}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Save post
                                </button> :
                                <button
                                    onClick={removeSavedHandler}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Unsave post
                                </button>
                            )}


                        {/* LIKE BUTTONS */}
                        {isAuthenticated &&
                            (!wasLiked ? <button
                                onClick={likeHandler}
                                className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Like post
                            </button> :
                                <button
                                    onClick={dislikeHandler}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Dislike post
                                </button>
                            )
                        }

                    </div>
                </div>
            </span>

            {/* COMMENTS */}
            <div className={`pt-6 ` + (showComments ? 'block' : 'hidden')}>
                <Comments currentId={userId} creatorName={fullName} isAuthenticated={isAuthenticated} />
            </div>



        </div>

    )
}

export default PostDetails