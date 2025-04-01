import { useEffect, useState, useContext, useRef } from "react";

import ErrorContext from "../../contexts/errorContext"
import AuthContext from '../../contexts/authContext';
import { getAllPost2 } from "../../services/getPostService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

function MyPosts() {
    const { showErrorHandler } = useContext(ErrorContext)

    const [posts, setPosts] = useState([]);
    const [lastSnapshot, setLastSnapshot] = useState(null)
    const [moreAvailable, setMoreAvailable] = useState(false)

    const isMounted = useRef(false);

    const { userId } = useContext(AuthContext)

    function loadMore() {

        getAllPost2({ lastSnapshot, userId })
            .then(({ newPosts, lastDoc, moreAvailable }) => {
                if (!isMounted.current) return

                const newState = [...posts, ...newPosts]

                setPosts(newState)

                setMoreAvailable(moreAvailable)

                setLastSnapshot(lastDoc)

            }).catch(error => {
                console.log(error)
                showErrorHandler('Error while fetching more posts!')
            })

    }

    useEffect(() => {
        isMounted.current = true

        getAllPost2({ lastSnapshot: null, })
            .then(({ newPosts, lastDoc, moreAvailable }) => {
                if (!isMounted.current) return

                setPosts(newPosts)

                setMoreAvailable(moreAvailable)

                setLastSnapshot(lastDoc)

            }).catch(error => {
                console.log(error)
                showErrorHandler('Error while fetching posts!')
            })
        return () => {
            isMounted.current = false;
        };
    }, [])

    return (
        <section className="text-gray-600 body-font overflow-hidden">

            <div className="container px-5 pt-0 pb-24 mx-auto">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                    Here you can find all your posts.
                </h1>


                <div className="-my-8 divide-y-2 divide-gray-100 pt-8">

                    {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {posts.length === 0 ?

                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                            You have no posts yet!
                        </h1> : ''}


                </div>

                {moreAvailable &&
                    <div className="flex justify-center">
                        <button
                            id="load-more"
                            onClick={loadMore}
                            className="relative inline cursor-pointer text-xl font-medium before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 mt-8 mx-auto">
                            Load more
                        </button>
                    </div>}

            </div>

        </section>

    );
}


export default MyPosts;