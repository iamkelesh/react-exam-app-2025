import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

import SearchComponent from "../searchComponent/SearchComponent";

function Header() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <header className='flex items-center justify-between border-b py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50'>
            <div className='flex items-center'>
                <Link to="/">
                    <h3 className="text-2xl font-semibold">Project app</h3>
                </Link>

            </div>

            {/* POST BUTTONS AKA CREATE ALL POSTS AND DROPDOWN FOR MORE OPTIONS */}
            <div
                className='lg:!flex lg:flex-auto lg:ml-12 max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>

                <div
                    className="lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">

                    <ul className='lg:flex lg:gap-x-8 max-lg:space-y-2'>
                        <li className='mb-6 hidden max-lg:block'>
                            <Link to="/"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                            </Link>
                        </li>
                        <li className='max-lg:border-b max-lg:py-3'>
                            <Link to="/"
                                className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Home</Link>
                        </li>

                        <li className='max-lg:border-b max-lg:py-3'>
                            <Link to="/posts/all-posts"
                                className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>All posts</Link>
                        </li>

                        {isAuthenticated &&
                            <>
                                {/* <li className='max-lg:border-b max-lg:py-3'>
                                        <Link to="/user/posts"
                                            className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>My posts</Link>
                                    </li>
                                    <li className='max-lg:border-b max-lg:py-3'>
                                        <Link to="/user/favourites"
                                            className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Favourites</Link>
                                    </li> */}

                                <li className='max-lg:border-b max-lg:py-3'>
                                    <Link to="/posts/create"
                                        className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Create</Link>
                                </li>
                            </>
                        }

                    </ul>

                </div>
            </div>


            {/* SEARCH COMPONENT */}
            <div className="flex-grow mx-8 flex justify-center">
                <SearchComponent />
            </div>



            {/* AUTH BUTTONS LOGIN REGISTER LOGOUT */}
            <div className='flex items-center space-x-6'>
                {isAuthenticated ? (
                    <>
                        <Link to="/my-profile" className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>
                            My profile
                        </Link>
                        <Link to="/user/logout" className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>
                            Log out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/user/login" className='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>
                            Log in
                        </Link>
                        <div className="border-l border-[#333] h-6 max-lg:hidden"></div>
                        <Link
                            to="/user/register"
                            className='px-4 py-2.5 text-sm rounded font-bold text-white border-2 border-[#1d294f] bg-[#1d294f] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#1d294f]'
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>


        </header >
    )
}
export default Header;