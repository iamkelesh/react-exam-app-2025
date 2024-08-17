import {useParams} from "react-router-dom"
import {useContext, useState, useEffect} from "react";


import SingleComment from "../singleComment/SingleComment";
import {getCommentsForPost} from "../../services/commentService"
import AuthContext from "../../contexts/authContext";
import AddComment from "../addComment/AddComment";


function Comments() {
    const [commentsState, setCommentsState] = useState([])
    const {postId} = useParams()

    const {isAuthenticated} = useContext(AuthContext)

    const updateComments = (newComment) => {

        if (newComment.length > 0) {
            let newCommentsState = [...commentsState, ...newComment]
            setCommentsState(newCommentsState)
        }
        console.log(commentsState)
    }

    useEffect(() => {
        getCommentsForPost({postId, updateComments}).catch(error => console.log(error))
    }, [postId])

    useEffect(() => {
        console.log(commentsState)
    })

    return (
        <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <div className="buttons">
              <span className="badge bg-white d-flex flex-row align-items-center">

              </span>
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="blog-comments-section">
                            <AddComment updateComments={updateComments}/>
                        </div>)}

                    <h5>User comments</h5>
                    {commentsState.map((commentData) => {
                        return <SingleComment key={commentData.id} text={commentData.text}
                                              _createdOn={commentData._createdOn} commentData={commentData}/>
                    })}

                    {commentsState.length === 0 && (
                        <p className="no-comment">There are no comments.</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Comments