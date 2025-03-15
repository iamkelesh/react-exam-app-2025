import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

import { getPostsDetails, deletePost } from "../../services/postFirestoreService"
import AuthContext from "../../contexts/authContext";

import Comments from "../comments/Comments";
import AddToFavourites from "../addToFavourites/AddToFavourites";

function PostDetails() {
    const [dataState, setDataState] = useState({})
    const { userId } = useContext(AuthContext)
    const navigate = useNavigate()

    const { postId } = useParams()

    function deletePostHandler() {
        deletePost(postId)
            .then(() => {
                navigate('/home')
            })
            .catch(error => {
                console.error("Error while deleting post at PostDetails.jsx: ", error)
            })
    }

    function redirectToEdit() {
        navigate(`/posts/edit/${postId}`)
    }


    const formatedDate = (date) => {
        if (date instanceof Date) {
            return date.toDateString()
        } else if (date && date.toDate) {
            return date.toDate().toDateString()
        } else {
            return 'Invalid Date'
        }
    }

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
                        <span className="date">Published on {formatedDate(dataState.createdAt)}</span>

                        {dataState.ownerId === userId && (
                            <>
                                <Button onClick={redirectToEdit} variant="danger">Edit</Button>{' '}
                                <Button onClick={deletePostHandler} variant="danger">Delete</Button>{' '}
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

                {dataState.id && <AddToFavourites
                    userId={userId}
                    postId={dataState.id}
                    ownerId={dataState.ownerId}
                    title={dataState.title}
                    body={dataState.body}
                />}

                <div className="blog-comments-section">
                    <Comments currentUser={userId} />
                </div>

            </div>
        </article>

    )
}

export default PostDetails