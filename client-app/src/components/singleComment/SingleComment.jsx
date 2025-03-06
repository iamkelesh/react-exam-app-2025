// eslint-disable-next-line react/prop-types
import AuthContext from "../../contexts/authContext"
import { useContext } from "react"
import { deleteComment } from "../../services/commentService"

function SingleComment({
    text,
    createdAt,
    // allInfo, 
    currentUser,
    ownerId, 
    // fetchComments 
}) {

    // const { accessToken, userId } = useContext(AuthContext)

    // async function deleteHandler() {
    //     const confirmDelete = window.confirm('Are you sure you want to delete this post?')

    //     if (confirmDelete) {
    //         try {
    //             await deleteComment(allInfo._id, accessToken)
    //             fetchComments()
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    // }


    function newDeleteHandler() {
        // deleteComment(currentUser, ownerId)
        console.log('deleted comment')
    }
    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                    <span>
                        <small className="font-weight-bold text-primary">
                            {/* {allInfo.author.fullName} */}
                        </small>{" "}
                        <small className="font-weight-bold">
                            {text}
                        </small>
                    </span>
                </div>
                <small>{createdAt.toDate().toDateString()}</small>
            </div>
            <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="icons align-items-center">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-check-circle-o check-icon" />
                </div>
            </div>
            {ownerId === currentUser ? (
                <button onClick={newDeleteHandler}>Delete</button>
            ) : ''}
        </div>
    )
}

export default SingleComment