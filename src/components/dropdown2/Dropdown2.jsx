import { useState } from "react";

export default function Dropdown2({ onSelect, categories, currentChoice }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        // e.preventDefault()
        setIsOpen(!isOpen)
    }

    const handleItemClick = (item) => {
        onSelect(item)
        setIsOpen(false)
    }

    return (
        <div className=" flex items-center justify-left">
            <div className="relative group">
                <button
                    id="dropdown-button"
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    <span className="mr-2">{currentChoice ? currentChoice : 'Chose a category'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                <div id="dropdown-menu" className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpen ? '' : 'hidden'}`}>

                    {/* <!-- Dropdown content goes here --> */}
                    {categories.map((item, index) => (

                        <p
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{item}</p>
                    ))}
                </div>


            </div>
        </div>

    )
}