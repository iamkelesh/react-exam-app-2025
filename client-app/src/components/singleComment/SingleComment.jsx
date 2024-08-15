

function SingleComment({ text, author, _createdOn }) {
    // console.log('singlecomment.jsx')
    // console.log(text, author, _createdOn)
    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                    <img
                        src="https://i.imgur.com/hczKIze.jpg"
                        width={30}
                        className="user-img rounded-circle mr-2"
                    />
                    <span>
                        <small className="font-weight-bold text-primary">
                            {author.fullName}
                        </small>{" "}
                        <small className="font-weight-bold">
                            {text}
                        </small>
                    </span>
                </div>
                <small>{new Date(_createdOn).toDateString()}</small>
            </div>
            <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="reply px-4">
                    <small>Remove</small>
                    <span className="dots" />
                    <small>Reply</small>
                    <span className="dots" />
                    <small>Translate</small>
                </div>
                <div className="icons align-items-center">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-check-circle-o check-icon" />
                </div>
            </div>
        </div>
    )
}

export default SingleComment