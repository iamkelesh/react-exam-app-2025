function SingleComment({
    commentData, 
    // postId, 
    // deletehandler
}) {


    const formatedDate = (date) => {

        if (date instanceof Date) {

            return date.toDateString()

        } else if (date && date.toDate) {

            return date.toDate().toDateString()

        } else {
            return 'Invalid Date'
        }
    }

    // function newDeleteHandler() {
    //     deletehandler({ postId, commentId })
    // }
    
    return (





        < div className="relative" >
            <div className="md:flex items-center md:space-x-4 mb-3">
                <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    {/* <!-- Icon --> */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                            <path className="fill-slate-300" d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z" />
                            <path className="fill-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z" />
                        </svg>
                    </div>
                    {/* <!-- Date --> */}
                    <time className="text-sm font-medium text-indigo-500 md:w-28">{formatedDate(commentData.createdAt)} </time>
                </div>
                {/* <!-- Title --> */}
                <div className="text-slate-500 ml-14"><span className="text-slate-900 font-bold">{commentData.creatorName}</span> commented </div>
            </div>
            {/* <!-- Card --> */}
            <div className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">{commentData.text}</div>
        </div >




    )
}

export default SingleComment