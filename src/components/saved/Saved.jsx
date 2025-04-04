import { useEffect, useState, useContext, useRef } from "react";

import AuthContext from "../../contexts/authContext";
import ErrorContext from '../../contexts/errorContext';

import { getSaved } from "../../services/savedService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

function Saved() {
    const { showErrorHandler } = useContext(ErrorContext)

    const [savedPosts, setSaved] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [lastSnapshot, setLastSnapshot] = useState(null);

    const { userId } = useContext(AuthContext)

    const isMounted = useRef(false);

    function loadMore() {

        getSaved({ userId, lastSnapshot })
            .then(({ newPosts, lastDoc, moreAvailable }) => {
                if (!isMounted.current) return

                const oldState = savedPosts

                const newState = [...oldState, ...newPosts]

                setSaved(newState)

                setMoreAvailable(moreAvailable)

                setLastSnapshot(lastDoc)

            }).catch(error => {
                console.log(error)
                showErrorHandler('Error while fetching more posts!')
            })

    }

    useEffect(() => {

        isMounted.current = true

        getSaved({ userId, lastSnapshot })
            .then(({ newPosts, lastDoc, moreAvailable }) => {
                if (!isMounted.current) return

                setSaved(newPosts)
                setLastSnapshot(lastDoc)
                SetMoreAvailable(moreAvailable)
            })
            .catch(error => {
                showErrorHandler('Error while fetching more posts!')
                console.error(error)
            })

        return () => {
            isMounted.current = false;
        };

    }, [])

    return (
        <section className="text-gray-600 body-font overflow-hidden">

            <div className="container px-5 pt-0 pb-24 mx-auto">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                    Here you can find all your saved posts.
                </h1>


                <div className="-my-8 divide-y-2 divide-gray-100 pt-20 ">

                    {savedPosts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {savedPosts.length === 0 ?

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


export default Saved