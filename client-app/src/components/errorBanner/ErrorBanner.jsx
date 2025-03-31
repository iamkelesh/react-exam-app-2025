import { useContext } from "react"

import ErrorContext from "../../contexts/errorContext"

export default function ErrorBanner() {


    const { errorState, hideErrorHandler } = useContext(ErrorContext)

    return (
        <div
            className={`fixed top-0 justify-center left-1/3 z-50 w-4/12 transition-transform duration-300 ${errorState.showError ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                }`}
        >
            <div role="alert" className="relative w-full text-base font-regular px-4 py-4 rounded-lg bg-red-500 text-white flex shadow-lg">
                <div className=" mr-12">
                    <p className="font-bold text-black">
                        ☹️ There was an error
                        <span className="text-white">
                            - {errorState.errorMessage}
                        </span>
                    </p>
                </div>
                <button
                    onClick={hideErrorHandler}
                    className=" align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 !absolute top-3 right-3" type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </span>
                </button>
            </div>
        </div>

    )
}