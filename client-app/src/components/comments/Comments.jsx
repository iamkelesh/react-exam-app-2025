import { useEffect } from "react";
import SingleComment from "../singleComment/SingleComment";
import { useParams } from "react-router-dom"
import { useContext } from "react";


import { getCommentsForPost } from "../../services/commentService"
import { useState } from "react";
import AuthContext from "../../contexts/authContext";
import AddComment from "../addComment/AddComment";


function Comments() {
  const [commentsState, setCommentsState] = useState([])
  const { postId } = useParams()

  const { isAuthenticated } = useContext(AuthContext)

  const updateComments = (newComment) => {
    // console.log(newComment)
    // console.log(commentsState)
    let newCommentsState = [...commentsState, newComment]

    setCommentsState(newCommentsState)
    console.log(commentsState)
  }
  useEffect(() => {
    getCommentsForPost({ postId, updateComments })
  }, [postId])
  // useEffect(() => {console.log(commentsState)})
  function demoButtonHandler() {
    console.log(commentsState.length)
    console.log(commentsState)

  }
  return (
    <div className="container mt-5">
      <div className="row  d-flex justify-content-center">
        <div className="col-md-8">
          <div className="headings d-flex justify-content-between align-items-center mb-3">
            <h5>User comments</h5>
            <div className="buttons">
              <span className="badge bg-white d-flex flex-row align-items-center">

              </span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="blog-comments-section">
              <AddComment updateComments={updateComments} />
            </div>)}

            {commentsState.map((comment, index) => (
              <SingleComment key={index} comment={comment} />
            ))}

          {commentsState.length > 0 && (
            <p className="no-comment">show comments or smth.</p>
          )}

          <button onClick={demoButtonHandler}>Demo</button>

        </div>
      </div>
    </div>
  )
}
export default Comments