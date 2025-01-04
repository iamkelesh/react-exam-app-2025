import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react";

import SingleComment from "../singleComment/SingleComment";
import { getLatestsComments, getMoreComments } from "../../services/commentService"
import AuthContext from "../../contexts/authContext";
import AddComment from "../addComment/AddComment";

function Comments() {
    const [commentsState, setCommentsState] = useState([])
    const [commentsBlock, setCommentsBlock] = useState(5);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const { postId } = useParams()
    const { isAuthenticated } = useContext(AuthContext)

    const fetchComments = () => {
        getLatestsComments({ postId })
            .then(result => {
                if (result.length > 5) {
                    result = result.slice(0, 5)
                    SetMoreAvailable(true)
                }
                setCommentsState(result);
                setCommentsBlock(5)
            })
            .catch(error => console.log(error));
    };

    const getMoreCommentsHandler = () => {

        getMoreComments({ postId, commentsBlock, setCommentsBlock}).then(result => {

            if (result.length > 5) {
                result = result.slice(0, 5)
                SetMoreAvailable(true)
            } else (
                SetMoreAvailable(false)
            )
            let newCommentsState = [...commentsState, ...result]
            let newBlock = commentsBlock + 5
            newCommentsState.sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
            setCommentsState(newCommentsState);
            setCommentsBlock(newBlock)


        })
    }

    useEffect(() => {
        getLatestsComments({ postId }).then(result => {
            
            if (result.length > 5) {
                SetMoreAvailable(true)
                result = result.slice(0, 5)
            }

            setCommentsState(result)
        }).catch(error => console.log(error))
    }, [])

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
                            <AddComment fetchComments={fetchComments} />
                        </div>)}

                    <h5>User comments</h5>
                    {commentsState.map((commentData) => {
                        return <SingleComment key={commentData._id} text={commentData.text}
                            _createdOn={commentData._createdOn}
                            authorName={commentData.author.fullname} allInfo={commentData} />
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