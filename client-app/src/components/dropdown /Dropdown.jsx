



import React, { useEffect } from 'react'




export default function Dropdown() {

    // Just copy the code and paste.Feel free to report  issues, or bugs

    // Utility function to toggle the dropdown
    function toggleDropdown(menuButton, dropdown) {
        const expanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", !expanded);
        dropdown.classList.toggle("hidden", expanded);
    }

    // Initializing dropdowns
    function initDropdown(menuButtonId, dropdownSelector) {
        const menuButton = document.getElementById(menuButtonId);
        const dropdown = document.querySelector(dropdownSelector);

        if (!menuButton || !dropdown) return;

        // Set dropdown to be off by default
        toggleDropdown(menuButton, dropdown);

        // Add click event listener to the button
        menuButton.addEventListener("click", () => toggleDropdown(menuButton, dropdown));

        // Close the dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
                menuButton.setAttribute("aria-expanded", "false");
                dropdown.classList.add("hidden");
            }
        });
    }


    useEffect(() => {
        // Initialize the dropdowns after the component mounts
        initDropdown("menu-button", '[role="menu"]');
        initDropdown("menu-button2", '[role="menu2"]');
    }, []);


    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    Sort By
                    <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div
                className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                    >
                        Low to High
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                    >
                        High to Low
                    </a>
                </div>
            </div>
        </div>



    )
}


