import { useEffect, useState } from "react";

import { getLatestHomePost } from "../../services/getPostService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";



function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        getLatestHomePost()
            .then((latestPosts) => {

                setPosts(latestPosts)

            }).catch(err => console.error(err))

    }, [])

    return (
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

    );
}


export default Home;