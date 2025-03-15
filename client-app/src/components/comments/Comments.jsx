import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react";

import { deleteComment } from "../../services/commentsFirestoreService";
import { getlatestsComments, getMoreComments } from "../../services/commentsFirestoreService";
import AuthContext from "../../contexts/authContext";

import SingleComment from "../singleComment/SingleComment";
import AddComment from "../addComment/AddComment";

function Comments({ currentUser }) {
    const [commentsState, setCommentsState] = useState([])
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const { postId } = useParams()
    const { isAuthenticated } = useContext(AuthContext)



    const getMoreCommentsHandler = () => {

        const lastCommentId = commentsState[commentsState.length - 1].id

        getMoreComments({ postId, lastCommentId })
            .then(({ newComments, moreAvailable }) => {

                const oldComments = commentsState

                setCommentsState([...oldComments, ...newComments])

                SetMoreAvailable(moreAvailable)
            })
            .catch(error => {
                console.error("Error while getting more comments at Comments.jsx: ", error)
            })
    }

    function deletehandler({ postId, commentId }) {
        deleteComment({ postId, commentId })
            .then(() => {
                let oldComments = commentsState

                let newComments = oldComments.filter(predicate => predicate.id !== commentId)

                setCommentsState(newComments)
            })
            .catch(error => {
                console.error("Error while deleting comment at Comments.jsx: ", error)
            }
            )
    }


    function addNewToState(newComment) {

        let currentState = commentsState

        let newState = [newComment, ...currentState]

        setCommentsState(newState)
    }

    useEffect(() => {

        getlatestsComments({ postId }).then(({ comments, moreAvailable }) => {
            setCommentsState(comments)
            SetMoreAvailable(moreAvailable)
        })
            .catch(error => {
                console.log(error)
                window.alert(error.message)
            })

    }, [postId])

    return (
        <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <div className="buttons">
                            <span className="badge bg-white d-flex flex-row align-items-center"></span>
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="blog-comments-section">
                            <AddComment
                                currentUser={currentUser}
                                addNewToState={addNewToState}
                            />
                        </div>)}

                    <h5>User comments</h5>
                    {commentsState.map((commentData) => {
                        return <SingleComment
                            key={commentData.id}
                            currentUser={currentUser}
                            text={commentData.text}
                            ownerId={commentData.ownerId}
                            createdAt={commentData.createdAt}
                            deletehandler={deletehandler}
                            commentId={commentData.id}
                            postId={postId}
                        />
                    })}

                    {commentsState.length === 0 && (
                        <p className="no-comment">There are no comments.</p>
                    )}

                </div>
            </div>
            {moreAvailable === true ?
                <button onClick={getMoreCommentsHandler} >
                    <a> Load more comments</a>
                </button> : ""}
        </div>
    )
}

export default Comments