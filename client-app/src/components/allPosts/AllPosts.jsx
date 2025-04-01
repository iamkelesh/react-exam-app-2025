import { useEffect, useState, useContext, useRef } from "react";

import { getAllPost2 } from "../../services/getPostService";
import ErrorContext from "../../contexts/errorContext"

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

function AllPosts() {

    const { showErrorHandler } = useContext(ErrorContext)

    const [posts, setPosts] = useState([]);
    const [lastSnapshot, setLastSnapshot] = useState(null)
    const [moreAvailable, setMoreAvailable] = useState(false)
    const [category, setCategory] = useState(undefined)

    const isMounted = useRef(false);

    const getButtonClass = (btnCategory) =>
        `inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${category === btnCategory ? 'underline decoration-2 decoration-[#7629c8]' : ''
        }`;


    function loadMore() {

        getAllPost2({ lastSnapshot, category })
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

    const categoryHandler = (newCategory) => {

        if (newCategory === category) {

            setCategory(undefined)

        } else {

            setCategory(newCategory)
        }
    }

    useEffect(() => {

        isMounted.current = true

        getAllPost2({ lastSnapshot: null, category })
            .then(({ newPosts, lastDoc, moreAvailable }) => {
                if (!isMounted.current) return

                setPosts(newPosts)

                setMoreAvailable(moreAvailable)

                setLastSnapshot(lastDoc)

            }).catch(error => {
                console.log(error)
                showErrorHandler('Error while fetching posts')
            })

        return () => {
            isMounted.current = false;
        };
    }, [category])

    return (
        <section className="text-gray-600 body-font overflow-hidden">

            <div className="container px-5 pt-0 pb-24 mx-auto">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                    Here you can find all posts.
                </h1>
                <div className="flex h-20 items-center justify-center gap-1 pb-3">

                    <button
                        onClick={() => categoryHandler('News')}
                        className={getButtonClass('News')}
                    >
                        News
                    </button>

                    <button
                        onClick={() => categoryHandler('Discussion')}
                        className={getButtonClass('Discussion')}
                    >
                        Discussion
                    </button>

                    <button
                        onClick={() => categoryHandler('Support')}
                        className={getButtonClass('Support')}
                    >
                        Support
                    </button>

                    <button
                        onClick={() => categoryHandler('Review')}
                        className={getButtonClass('Review')}
                    >
                        Review
                    </button>

                </div>

                <div className="-my-8 divide-y-2 divide-gray-100 ">

                    {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {posts.length === 0 ?

                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                            There are no posts!
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


export default AllPosts;