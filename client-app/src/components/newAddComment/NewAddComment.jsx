import { useForm } from "../../hooks/useForm"

import { useParams } from "react-router";


import { addComment } from "../../services/commentsFirestoreService";


function NewAddComment({
    currentId,
    addNewToState,
    creatorName,
    showAddHandler
}) {
    const { postId } = useParams()
    const initialValues = {
        text: '',
        ownerId: currentId,
        creatorName: creatorName,
        postId: postId,
    }

    const {
        values,
        onChange,
        onSubmit,
    } = useForm({

        submitHandler: addComment,
        initialValues,
        addNewToState,
    });

    return (

        <>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    <form className="relative rounded-2xl bg-white p-6 shadow" onSubmit={onSubmit}>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Leave comment</h2>
                            <button className="absolute right-5 top-5 text-gray-400 hover:text-gray-600" onClick={(event) => {
                                event.preventDefault()
                                showAddHandler()
                            }}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="mb-4 text-center text-sm">Tell other people what you think about this topic.
                        </p>
                        <textarea
                            id="text"
                            name="text"
                            onChange={onChange}
                            value={values.text}
                            className="mb-3 w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Your feedback..."></textarea>

                        <button className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-gray-800">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewAddComment;

