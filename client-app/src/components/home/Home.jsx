import { useEffect, useState } from "react";

import { getLatestHomePost } from "../../services/getPostService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

import { Link } from "react-router";

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        getLatestHomePost()
            .then((latestPosts) => {

                setPosts(latestPosts)

            }).catch(err => console.error(err))

    }, [])

    return (

        <>

            {/* <!-- component --> */}
            {/* <!-- Hero --> */}
            <div className="relative overflow-hidden">
                {/* <!-- Gradients --> */}
                {/* <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
                    <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
                </div> */}
                {/* <!-- End Gradients --> */}

                <div className="relative z-10">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                        <div className="max-w-2xl text-center mx-auto">
                            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                                Made by wanna be web dev
                            </p>

                            {/* <!-- Title --> */}
                            <div className="mt-5 max-w-2xl">
                                <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-400">
                                    This is demo project app
                                </h1>
                            </div>
                            {/* <!-- End Title --> */}

                            <div className="mt-5 max-w-3xl">
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    I have no idea what to add here. Keep in mind that this is in alpha version. Expect a lot of bugs and errors.
                                </p>
                            </div>

                            {/* <!-- Buttons --> */}
                            <div className="mt-8 gap-3 flex justify-center">
                                <Link to="/posts/all-posts" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                    Show more posts
                                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </Link>

                            </div>
                            {/* <!-- End Buttons --> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Hero --> */}
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="-my-8 divide-y-2 divide-gray-100">


                        {posts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                        {posts.length === 0 ?
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                                There are no posts!
                            </h1> : ''}

                    </div>
                </div>
            </section>
        </>

    );
}


export default Home;