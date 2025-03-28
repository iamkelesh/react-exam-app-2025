import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import { getAllFavourites } from "../../services/favouritesFirestoreService";

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";

function Favourites() {

    const [favPosts, setFavPosts] = useState([]);
    const [moreAvailable, SetMoreAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { pageNumber } = useParams()

    const { userId } = useContext(AuthContext)


    useEffect(() => {

        let tempPageNumber = pageNumber

        if (typeof pageNumber === 'undefined') {
            tempPageNumber = 0
        } else tempPageNumber = Number(pageNumber)

        if (isNaN(tempPageNumber)) {
            window.alert('Error with URL. Please try again.')
            return
        }

        getAllFavourites(userId, tempPageNumber)
            .then(({ moreFavPostsAvailableResult, latestFavPostResult }) => {

                setCurrentPage(Number(tempPageNumber))

                setFavPosts(latestFavPostResult)

                SetMoreAvailable(moreFavPostsAvailableResult)
            })
            .catch(err => console.error(err))



    }, [pageNumber, currentPage])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">


                    {favPosts.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {favPosts.length === 0 ?
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-center mt-8">
                            There are no posts!
                        </h1> : ''}


                    {moreAvailable === true || currentPage > 0 ?
                        <Pagination
                            defaultUrl={defaultUrl}
                            currentPage={currentPage}
                            moreAvailable={moreAvailable}
                        /> : ""}

                </div>
            </div>
        </section>

    );
}


export default Favourites;