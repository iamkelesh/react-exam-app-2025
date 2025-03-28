import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";


import { searchPost } from "../../services/otherPostServices";


function SearchResultsComponent() {

    const [result, setResult] = useState([]);

    const { searchInput } = useParams()

    useEffect(() => {

        searchPost(searchInput)
            .then(results => setResult(results))
            .catch(err => console.error(err))


    }, [
        searchInput
    ])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">


                    {result.map(data => <SmallPostTemplate key={data.id} {...data} />)}
                    {result.length === 0 ? <h1>Sorry, couldn't sind anything!</h1> : ''}

                </div>
            </div>
        </section>

    );
}


export default SearchResultsComponent;