import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useContext } from "react";

import { getPostsDetails } from "../../services/postFirestoreService"
// import { getOneService } from "../../services/postsServices"
// import { removeService } from "../../services/postsServices"
import AuthContext from "../../contexts/authContext";
// import Comments from "../comments/Comments";


function PostDetails() {
    const [dataState, setDataState] = useState({})
    const {accessToken, userId} = useContext(AuthContext)
    const navigate = useNavigate()

    const { postId } = useParams()

    useEffect(() => {
        getPostsDetails(postId)
            .then(result => {
                setDataState(result)
            })
            .catch(error => {
                console.error("Error while getting post details at PostDetails.jsx: ", error)
            })
    }, [postId, navigate])

    return (
        <article className="blog-post px-3 py-5 p-md-5">
            <div className="container">
                <header className="blog-post-header">
                    <h2 className="title mb-2">{dataState.title}</h2>
                    <div className="meta mb-3">
                        <span className="date">Published on {dataState.humanDate}</span>

                        {dataState.ownerId === userId && (
                            <>
                                {/* <Button onClick={redirectToEdit} variant="danger">Edit</Button>{' '} */}
                                {/* <Button onClick={deletePostHandler} variant="danger">Delete</Button>{' '} */}
                            </>
                        )} 

                    </div>
                </header>
                <div className="blog-post-body">
                    <figure className="blog-banner">

                    </figure>
                    <p>
                        {dataState.body}
                    </p>
                </div>

                <div className="blog-comments-section">
                    {/* <Comments /> */}
                </div>
            </div>
        </article>

    )
}

export default PostDetails