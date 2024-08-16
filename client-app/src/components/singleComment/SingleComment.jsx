

function SingleComment(key, text, owner, _createdOn) {
    // console.log('singlecomment.jsx')
    console.log(text, owner, _createdOn)
    return (
        <div className="card p-3" key={key}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                    <span>
                        <small className="font-weight-bold text-primary">
                            {owner}
                        </small>{" "}
                        <small className="font-weight-bold">
                            {text}
                        </small>
                    </span>
                </div>
                <small>{new Date(_createdOn).toDateString()}</small>
            </div>
            <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="icons align-items-center">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-check-circle-o check-icon" />
                </div>
            </div>
        </div>
    )
}

export default SingleComment