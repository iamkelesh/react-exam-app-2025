import { useParams } from "react-router-dom"
import {  useState, useEffect } from "react";

import { deleteComment } from "../../services/commentsService";
import { getComments } from "../../services/commentsService";

import SingleComment from "../singleComment/SingleComment";
import AddComment from "../addComment/AddComment";

function Comments({ currentId, creatorName, isAuthenticated }) {

    const [commentsState, setCommentsState] = useState([])
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [lastSnapshot, setLastSnapshot] = useState(null)

    const { postId } = useParams()

    const [showAdd, setShowAdd] = useState(false)

    const getMoreCommentsHandler = () => {

        getComments({ postId, lastSnapshot })
            .then(({ newComments, moreAvailable, lastComment }) => {

                const oldComments = commentsState

                setCommentsState([...oldComments, ...newComments])

                SetMoreAvailable(moreAvailable)

                setLastSnapshot(lastComment)
            })
            .catch(error => {
                console.error("Error while getting more comments at Comments.jsx: ", error)
            })
    }

    function deletehandler({ postId, commentId }) {

        if (!window.confirm("Are you sure you want to delete this comment?")) return
        deleteComment({ postId, commentId })
            .then(() => {
                let oldComments = commentsState

                let newComments = oldComments.filter(predicate => predicate.id !== commentId)

                setCommentsState(newComments)
            })
            .catch(error => {
                console.error("Error while deleting comment at Comments.jsx: ", error)
            })
    }

    function showAddHandler() {
        setShowAdd(!showAdd)
    }

    function addNewToState(newComment) {

        let currentState = commentsState

        let newState = [newComment, ...currentState]

        setCommentsState(newState)
    }

    useEffect(() => {

        getComments({ postId }).then(({ newComments, moreAvailable, lastComment }) => {
            setCommentsState(newComments)
            SetMoreAvailable(moreAvailable)
            setLastSnapshot(lastComment)
        })
            .catch(error => {
                console.log(error)
                window.alert(error.message)
            })

    }, [postId])


    if (commentsState.length === 0) {

        return (
            <>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                    There are no comments!
                </h1>
                {isAuthenticated && (
                    <AddComment
                        showAdd={showAdd}
                        showAddHandler={showAddHandler}
                        currentId={currentId}
                        addNewToState={addNewToState}
                        creatorName={creatorName} />
                )}</>)
    } else {

        return (
            <>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-1">
                    Comments left by users
                </h1>
                <section className="relative flex flex-col justify-center overflow-hidden antialiased">
                    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 "
                    >
                        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">

                            <div className="w-full max-w-3xl mx-auto">

                                {/* <!-- Vertical Timeline #3 --> */}
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">


                                    {commentsState.map((commentData) => {
                                        return <SingleComment
                                            key={commentData.id}
                                            commentData={commentData}
                                            deletehandler={deletehandler}
                                            postId={postId}
                                        />
                                    })}



                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <>
                    <span className="isolate inline-flex rounded-md shadow-sm">
                        <div id="crudButtons" className="flex flex-col items-center justify-center">
                            <div className="flex h-20 items-center justify-center gap-1 pb-3">
                                {isAuthenticated && (
                                    <button
                                        onClick={showAddHandler}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Add new comment
                                    </button>
                                )}
                                {moreAvailable && (
                                    <button
                                        onClick={getMoreCommentsHandler}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        Load more comments
                                    </button>
                                )}
                            </div>
                        </div>
                    </span>

                    {showAdd && isAuthenticated && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                            <div className="relative z-10">
                                <AddComment
                                    showAdd={showAdd}
                                    showAddHandler={showAddHandler}
                                    currentId={currentId}
                                    addNewToState={addNewToState}
                                    creatorName={creatorName}
                                    setShowAdd={setShowAdd}
                                />
                            </div>
                            <button
                                className="absolute inset-0 z-0"
                                onClick={showAddHandler}
                                aria-label="Close modal"
                            ></button>
                        </div>
                    )}
                </>

            </>
        )
    }
}

export default Comments