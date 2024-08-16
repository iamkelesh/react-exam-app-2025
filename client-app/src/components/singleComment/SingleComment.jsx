

// eslint-disable-next-line react/prop-types
function SingleComment({text}) {
    // console.log(commentData.text, commentData.owner, commentData._createdOn)
    return (
        <div className="card p-3" >
            <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                    <span>
                        <small className="font-weight-bold text-primary">
                            {/*{commentData.owner}*/}
                        </small>{" "}
                        <small className="font-weight-bold">
                            {text}
                        </small>
                    </span>
                </div>
                {/*<small>{new Date(commentData._createdOn).toDateString()}</small>*/}
            </div>
            <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="icons align-items-center">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-check-circle-o check-icon" />
                </div>
            </div>
            <h1>
                Here is a Comment!
            </h1>
        </div>
    )
}

export default SingleComment