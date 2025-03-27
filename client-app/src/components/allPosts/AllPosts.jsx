import { useEffect, useState } from "react";

import { getAllPosts } from "../../services/getPostService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";



function AllPosts() {

    const [posts, setPosts] = useState([]);
    const [lastSnapshot, setLastSnapshot] = useState(null)
    const [moreAvailable, setMoreAvailable] = useState(false)
    const [category, setCategory] = useState('all')


    function loadMore() {
        getAllPosts({ lastSnapshot })
            .then(({ newPosts, lastDoc, moreAvailable }) => {

                const newState = [...posts, ...newPosts]

                console.log(newPosts)
                setPosts(newState)

                setMoreAvailable(moreAvailable)

                setLastSnapshot(lastDoc)

            }).catch(err => console.error(err))
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
            window.alert('Category is not all')
        }


    }, [])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
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