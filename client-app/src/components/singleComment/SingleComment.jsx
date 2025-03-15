function SingleComment({
    text,
    createdAt,
    currentUser,
    ownerId,
    deletehandler,
    commentId,
    postId,
}) {


    const formatedDate = (date) => {

        if (date instanceof Date) {

            return date.toDateString()

        } else if (date && date.toDate) {

            return date.toDate().toDateString()

        } else {
            return 'Invalid Date'
        }
    }

    function newDeleteHandler() {
        deletehandler({ postId, commentId })
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
                <small>{formatedDate(createdAt)}</small>
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