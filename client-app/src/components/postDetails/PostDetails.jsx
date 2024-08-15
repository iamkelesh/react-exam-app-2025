import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useContext } from "react";

import { getOneService } from "../../services/postsServices"
import { removeService } from "../../services/postsServices"
import AuthContext from "../../contexts/authContext";
import AddComment from "../addComment/AddComment";


function PostDetails() {
    const [dataState, setDataState] = useState({})
    const { accessToken, userId, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    // console.log(isAuthenticated)
    // if (isAuthenticated) {
    //     console.log('You are authenticated')
    // } else {
    //     console.log('You are not authenticated')
    // }

    const deletePostHandler = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')

        if (confirmDelete) {
            try {
                await removeService(postId, accessToken)
                navigate('/')
            } catch (error) {
                console.error(error)
                navigate('/*')
            }
        }
    }

    const redirectToEdit = () => {
        navigate(`/posts/edit/${postId}`)
    }

    const { postId } = useParams()
    console.log(postId)
    useEffect(() => {
        getOneService(postId)
            .then(result => {
                const date = new Date(result._createdOn)
                const humanDate = date.toDateString()
                setDataState({ ...result, humanDate })
            })
            .catch(err => {
                console.error(err)
                alert('Post not found!')
                navigate('/*')
            })
    }, [postId])
    return (
        <article className="blog-post px-3 py-5 p-md-5">
            <div className="container">
                <header className="blog-post-header">
                    <h2 className="title mb-2">{dataState.title}</h2>
                    <div className="meta mb-3">
                        <span className="date">Published on {dataState.humanDate}</span>
                        {/* <span className="comment">
                            <a href="#">4 comments</a>
                        </span> */}


                        {dataState._ownerId === userId && (
                            <>
                                <Button onClick={redirectToEdit} variant="danger">Edit</Button>{' '}
                                <Button onClick={deletePostHandler} variant="danger">Delete</Button>{' '}
                            </>
                        )}

                    </div>
                </header>
                <div className="blog-post-body">
                    <figure className="blog-banner">
                        {/* <a href="https://made4dev.com">
                            <img
                                className="img-fluid"
                                src="assets/images/blog/blog-post-banner.jpg"
                                alt="image"
                            />
                        </a> */}
                    </figure>
                    <p>
                        {dataState.body}
                    </p>
                </div>
                {/* <nav className="blog-nav nav nav-justified my-5">
                    <a
                        className="nav-link-prev nav-item nav-link rounded-left"
                        href="index.html"
                    >
                        Previous
                        <i className="arrow-prev fas fa-long-arrow-alt-left" />
                    </a>
                    <a
                        className="nav-link-next nav-item nav-link rounded-right"
                        href="blog-list.html"
                    >
                        Next
                        <i className="arrow-next fas fa-long-arrow-alt-right" />
                    </a>
                </nav> */}
                <div className="blog-comments-section">
                    <AddComment/>
                </div>
                {/*//blog-comments-section*/}
            </div>
            {/*//container*/}
        </article>

    )
}

export default PostDetails