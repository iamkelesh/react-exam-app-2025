import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import Button from 'react-bootstrap/Button';

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
        <div className="w-full md:w-2/5 mx-auto">
            <div className="mx-5 my-3 text-sm">
                <a href="" className=" text-red-600 font-bold tracking-widest">TYPE OF POST {dataState.typeOfPost}</a>
            </div>
            <div className="w-full text-gray-800 text-4xl px-5 font-bold leading-none">
                {dataState.title}
            </div>

            <div className="w-full text-gray-500 px-5 pb-5 pt-2">
                Sub Title {dataState.subTitle}

            </div>

            {/* <div className="mx-5">
                <img
                    src="https://static.politico.com/dims4/default/fcd6d6a/2147483647/resize/1920x/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F22%2F87%2F2259ffd444678054896b9fa32b4d%2Fgettyimages-1221513169.jpg"
                    alt="Georgia Gov. Brian Kemp speaks to the media during a press conference. | Kevin C. Cox/Getty Images" />
            </div> */}

            {/* <div className="w-full text-gray-600 text-normal mx-5">
                <p className="border-b py-3">Georgia Gov. Brian Kemp speaks to the media during a press conference. | Kevin C.
                    Cox/Getty Images</p>
            </div> */}

            <div className="w-full text-gray-600 font-thin italic px-5 pt-3">
                By <strong className="text-gray-700">Posted by user name {dataState.publisherName}</strong><br />
                {formatedDate(dataState.createdAt)}<br />
                {/* Updated: 07/17/2020 10:33 AM EDT */}
            </div>

            <div className="px-5 w-full mx-auto">
                <p className="my-5">{dataState.body}</p>

            </div>

            <p>
                TODO: Add comments
            </p>


            <p>
                TODO: Add proper buttons for edit and delete
            </p>
        </div>

    )
}

export default PostDetails





function oldCode() {
    return (
        <article classNameName="blog-post px-3 py-5 p-md-5">
            <div classNameName="container">

                <header classNameName="blog-post-header">
                    <h2 classNameName="title mb-2">{dataState.title}</h2>
                    <div classNameName="meta mb-3">
                        <span classNameName="date">Published on {formatedDate(dataState.createdAt)}</span>

                        {dataState.ownerId === userId && (
                            <>
                                <button onClick={redirectToEdit} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '10px', cursor: 'pointer' }}>Edit</button>{' '}
                                <button onClick={deletePostHandler} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '10px', cursor: 'pointer' }}>Delete</button>{' '}
                            </>
                        )}

                    </div>
                </header>

                <div classNameName="blog-post-body">
                    <figure classNameName="blog-banner">

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

                <div classNameName="blog-comments-section">
                    <Comments currentUser={userId} />
                </div>

            </div>
        </article>
    )
}