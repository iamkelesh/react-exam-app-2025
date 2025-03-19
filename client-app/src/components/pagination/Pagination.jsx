import { Link } from "react-router-dom";

function Pagination({ defaultUrl, currentPage, moreAvailable }) {

    return (
        <div class="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul class="flex list-style-none">

                    <li class="page-item disabled">

                        {currentPage > 0 ?
                            <Link to={`/${defaultUrl}/${currentPage - 1}`}

                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                href="#" >Previous</Link> : ""}
                    </li>

                    {/* TODO: Add the pagination logic here */}

                    {/* <li class="page-item"><a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">1</a></li>

                    <li class="page-item active"><a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                        href="#">2 <span class="visually-hidden"></span></a></li>

                    <li class="page-item"><a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">3</a></li>
                         */}

                    <li class="page-item">
                        {moreAvailable === true ?
                            <Link to={`/${defaultUrl}/${currentPage + 1}`}
                                class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            >Next</Link> : ""}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;