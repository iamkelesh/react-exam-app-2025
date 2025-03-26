import { Link } from "react-router-dom";

function Pagination({ defaultUrl, currentPage, moreAvailable }) {

    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">

                    <li className="page-item disabled">

                        {currentPage > 0 ?
                            <Link to={`/${defaultUrl}/${currentPage - 1}`}

                                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#" >Previous</Link> : ""}
                    </li>

                    {/* TODO: Add the pagination logic here */}

                    {/* <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">1</a></li>

                    <li className="page-item active"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                        href="#">2 <span className="visually-hidden"></span></a></li>

                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">3</a></li>
                         */}

                    <li className="page-item">
                        {moreAvailable === true ?
                            <Link to={`/${defaultUrl}/${currentPage + 1}`}
                                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >Next</Link> : ""}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;