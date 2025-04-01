import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom"

import ErrorContext from '../../contexts/errorContext';

import SmallPostTemplate from "../smallPostTemplate/SmallPostTemplate";


import { searchPost } from "../../services/otherPostServices";


function SearchResultsComponent() {
    const { showErrorHandler } = useContext(ErrorContext)

    const [result, setResult] = useState([]);

    const { searchInput } = useParams()

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true

        searchPost(searchInput)
            .then(results => {
                if (!isMounted.current) return

                setResult(results)
            })
            .catch(error => {
                showErrorHandler('Error while searching posts!')
                console.log(error)
            })

        return () => {
            isMounted.current = false;
        };
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