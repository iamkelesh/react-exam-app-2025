import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

import styles from './Header.module.css';

function Header() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <header class='flex border-b py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50'>
            <div class='flex flex-wrap items-center gap-4 w-full'>
                <Link to="/">
                    <h3 class="text-2xl font-semibold">Logo</h3>
                </Link>

                <div
                    class='lg:!flex lg:flex-auto lg:ml-12 max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>

                    <div
                        class="lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">

                        <ul class='lg:flex lg:gap-x-8 max-lg:space-y-2'>
                            <li class='mb-6 hidden max-lg:block'>
                                <Link to="/"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
                                </Link>
                            </li>
                            <li class='max-lg:border-b max-lg:py-3'>
                                <Link to="/"
                                    class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Home</Link>
                            </li>

                            {isAuthenticated &&
                                <>
                                    <li class='max-lg:border-b max-lg:py-3'>
                                        <Link to="/user/posts"
                                            class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>My posts</Link>
                                    </li>
                                    <li class='max-lg:border-b max-lg:py-3'>
                                        <Link to="/user/favourites"
                                            class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Favourites</Link>
                                    </li>
                                </>}

                            <li class='max-lg:border-b max-lg:py-3'>
                                <Link to="/posts/create"
                                    class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Create</Link>
                            </li>
                        </ul>

                        <ul class='lg:flex lg:items-center ml-auto max-lg:block lg:space-x-8 ml-auto'>
                            <li class='max-lg:border-b max-lg:py-3 max-lg:mt-2'><Link to="/"
                                class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {!isAuthenticated &&
                    <>
                        <div class="border-l border-[#333] h-6 max-lg:hidden"></div>
                        <div class='flex items-center ml-auto space-x-6'>
                            <Link to="/user/login" class='hover:text-[#007bff] text-gray-600 block font-bold text-[15px]'>Log
                                in</Link>
                            <Link to="/user/register"
                                class='px-4 py-2.5 text-sm rounded font-bold text-white border-2 border-[#1d294f] bg-[#1d294f] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#1d294f]'>Register
                            </Link>
                        </div>
                    </>}
            </div>
        </header>
    )
}
export default Header;