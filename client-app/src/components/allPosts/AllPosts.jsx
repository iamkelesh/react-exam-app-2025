import { useEffect, useState } from "react";

import { getAllPosts, getByCategory } from "../../services/getPostService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";



function AllPosts() {

    const [posts, setPosts] = useState([]);
    const [lastSnapshot, setLastSnapshot] = useState(null)
    const [moreAvailable, setMoreAvailable] = useState(false)
    const [category, setCategory] = useState('all')


    function loadMore() {
        if (category !== 'all') {
            getByCategory({ lastSnapshot, category })
                .then(({ newPosts, lastDoc, moreAvailable }) => {

                    const newState = [...posts, ...newPosts]

                    setPosts(newState)

                    setMoreAvailable(moreAvailable)

                    setLastSnapshot(lastDoc)

                }).catch(err => {
                    setPosts([])

                    setMoreAvailable(false)

                    setLastSnapshot(null)

                    console.log(err)
                })
        } else {

            getAllPosts({ lastSnapshot })
                .then(({ newPosts, lastDoc, moreAvailable }) => {

                    const newState = [...posts, ...newPosts]

                    console.log(newPosts)
                    setPosts(newState)

                    setMoreAvailable(moreAvailable)

                    setLastSnapshot(lastDoc)

                }).catch(err => {
                    setPosts([])

                    setMoreAvailable(false)

                    setLastSnapshot(null)

                    console.log(err)
                })
        }

    }

    const categoryHandler = (newCategory) => {
        if (newCategory === category) {
            setCategory('all')
        } else {
            setCategory(newCategory)
        }
    }
    useEffect(() => {

        if (category === 'all') {
            getAllPosts({ lastSnapshot })
                .then(({ newPosts, lastDoc, moreAvailable }) => {

                    setPosts(newPosts)

                    setMoreAvailable(moreAvailable)

                    setLastSnapshot(lastDoc)

                }).catch(err => console.error(err))
        } else {
            getByCategory({ lastSnapshot, category })
                .then(({ newPosts, lastDoc, moreAvailable }) => {

                    setPosts(newPosts)

                    setMoreAvailable(moreAvailable)

                    setLastSnapshot(lastDoc)

                }).catch(err => {
                    setPosts([])

                    setMoreAvailable(false)

                    setLastSnapshot(null)

                    console.log(err)
                })
        }


    }, [category])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pt-0 pb-24 mx-auto">

                <div className="flex h-20 items-center justify-center gap-1 pb-3">
                    {/* <!-- button1 --> */}
                    {/* <button
                        className="inline-flex items-center gap-2 rounded border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Outline
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                        </svg>
                    </button> */}

                    {/* <!-- button2 --> */}
                    {/* <button
                        className="inline-flex items-center gap-2 rounded border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Outline
                    </button> */}

                    {/* <!-- button3 --> */}

                    <button
                        onClick={() => categoryHandler('News')}
                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        News
                    </button>

                    <button
                    onClick={() => categoryHandler('Discussion')}
                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Discussion
                    </button>

                    <button
                    onClick={() => categoryHandler('Support')}
                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Support
                    </button>

                    <button
                    onClick={() => categoryHandler('Review')}
                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Review
                    </button>
                    {/* <!-- button4 --> */}
                    {/* <button
                        className="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:rotate-3 hover:scale-105 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Outline
                    </button> */}

                    {/* <!-- button5 --> */}
                    {/* <button
                        className="group relative inline-flex items-center gap-2 border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        <span className="absolute left-0 -z-10 block h-full w-[2px] bg-[#7629c8] transition-all group-hover:w-full"></span>
                        Outline
                    </button> */}

                    {/* <!-- button6 --> */}
                    {/* <button
                        className="group inline-flex items-center gap-2 rounded bg-gradient-to-r from-[#9e58e9] to-blue-500 p-[2px] text-sm font-semibold transition-all hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        <span className="block rounded-sm bg-white px-6 py-2 group-hover:bg-transparent">Download</span>
                    </button> */}
                </div>

                <div className="-my-8 divide-y-2 divide-gray-100 ">

                    {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {posts.length === 0 ? <h1>There are no posts!</h1> : ''}

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