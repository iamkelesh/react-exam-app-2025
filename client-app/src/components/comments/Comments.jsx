import SingleComment from "../singleComment/SingleComment";
import style from "./Comments.module.css";

function Comments({commentsState}) {
  // console.log('comments.jsx')
  // console.log(commentsState)
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


          {commentsState.length > 0 && commentsState.map((commentData) => (
              <SingleComment key={commentData._id} 
              text={commentData.text} 
              author={commentData.author} 
              _createdOn={commentData._createdOn}  />
            ))
          }

          {commentsState.length === 0 && (
            <p className="no-comment">No comments.</p>
          )}



        </div>
      </div>
    </div>

  )
}
export default Comments