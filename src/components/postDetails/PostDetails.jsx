import { useEffect, useState, useContext, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"

import AuthContext from "../../contexts/authContext";
import ErrorContext from "../../contexts/errorContext"

import { getPostsDetails } from "../../services/getPostService"
import { checkForSaved } from "../../services/savedService";
import { checkIfLiked } from "../../services/likeServices";
import {
    deletePostHandler,
    redirectToEdit,
    addSavedHandler,
    removeSavedHandler,
    formatedDate,
    showCommentsHandler,
    likeHandler,
    dislikeHandler
} from "../../utils/postDetailsHandlers"

import Comments from "../comments/Comments";

function PostDetails() {
    const { showErrorHandler } = useContext(ErrorContext)
    const { userId, fullName, isAuthenticated } = useContext(AuthContext)

    const [dataState, setDataState] = useState({})
    const [showComments, setShowComments] = useState(false)
    const [saveState, setSaveState] = useState({ canBeSaved: false })
    const [wasLiked, setWasLiked] = useState(false)

    const navigate = useNavigate()

    const isMounted = useRef(false);

    const { postId } = useParams()

    useEffect(() => {
        isMounted.current = true

        getPostsDetails(postId)
            .then(result => {
                if (!isMounted.current) return
                setDataState(result)
            })
            .catch(error => {
                console.error("Error while getting post details at PostDetails.jsx: ", error)
                showErrorHandler('Error while getting post details!')
            })

        return () => {
            isMounted.current = false;
        };
    }, [postId, navigate])

    useEffect(() => {
        isMounted.current = true
        
        if (!postId || !userId) return

        checkIfLiked({ postId, userId })
            .then(result => {
                if (!isMounted.current) return
                setWasLiked(result)
            })
            .catch(error => {
                console.error("Error while checking if post was liked: ", error)
                showErrorHandler('Error while checking if post was liked!')
            })

        return () => {
            isMounted.current = false;
        };
    }, [userId, postId])

    useEffect(() => {
        isMounted.current = true

        if (!userId) return

        checkForSaved({ postId, userId })
            .then(({ canBeSaved }) => {
                setSaveState({ canBeSaved })
            })
            .catch(error => {
                console.error("Error while checking for saved posts: ", error)
            })

        return () => {
            isMounted.current = false;
        };
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

            {/* LIKES */}
            <div className="flex items-center gap-2 px-5 py-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-red-500">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-lg font-semibold">{dataState.likes || 0} Likes</span>
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
                            onClick={() => showCommentsHandler({ showComments, setShowComments })}
                            className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            {showComments ? 'Hide comments' : 'Show comments'}
                        </button>

                        {/* BUTTONS FOR AUTH USERS */}
                        {dataState.ownerId === userId && (
                            <>
                                <button onClick={() => redirectToEdit({ postId, navigate, showErrorHandler })}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Edit post
                                </button>

                                <button
                                    onClick={() => deletePostHandler({ postId, showErrorHandler, navigate })}
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
                                    onClick={() => addSavedHandler({ dataState, userId, setSaveState, showErrorHandler })}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Save post
                                </button> :
                                <button
                                    onClick={() => removeSavedHandler({ postId, userId, setSaveState, showErrorHandler })}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Unsave post
                                </button>
                            )}


                        {/* LIKE BUTTONS */}
                        {isAuthenticated &&
                            (!wasLiked ? <button
                                onClick={() => likeHandler({ postId, userId, setWasLiked, showErrorHandler })}
                                className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Like post
                            </button> :
                                <button
                                    onClick={() => dislikeHandler({ postId, userId, setWasLiked, showErrorHandler })}
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