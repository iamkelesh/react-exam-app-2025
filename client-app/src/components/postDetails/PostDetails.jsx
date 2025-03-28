import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getPostsDetails } from "../../services/getPostService"
import AuthContext from "../../contexts/authContext";
import { deletePost } from "../../services/otherPostServices";


import Comments from "../comments/Comments";
import AddToFavourites from "../addToFavourites/AddToFavourites";
import AddComment from "../addComment/AddComment";

function PostDetails() {
    const [dataState, setDataState] = useState({})
    const { userId } = useContext(AuthContext)
    const navigate = useNavigate()

    const { isAuthenticated } = useContext(AuthContext)


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
                <a href="" className=" text-red-600 font-bold tracking-widest">{dataState.category}</a>
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



            <span className="isolate inline-flex rounded-md shadow-sm">
                {/* <button type="button" className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">share</button> */}
                {dataState.ownerId === userId && (
                    <>
                        <div id="crudButtons"
                        className="flex flex-col items-center justify-center">
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                {/* <button
                                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-full py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none"
                                >
                                    Like
                                </button>
                                <button
                                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-transparent duration-150 hover:border-stone-600 rounded-full hover:opacity-60 hover:shadow-none"
                                >
                                    Dislike
                                </button> */}
                                <button onClick={redirectToEdit}
                                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 border-stone-900 text-stone-50 rounded-full transition antialiased"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={deletePostHandler}
                                    className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-full hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
                                >
                                    Delete
                                </button>
                            </div>


                        </div>
                    </>
                )}
            </span>

            <div>
                <Comments currentUser={userId} />
            </div>



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