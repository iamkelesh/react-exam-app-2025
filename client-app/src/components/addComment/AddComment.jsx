import { useForm } from "../../hooks/useForm"
// import { useContext, useEffect } from 'react';

import { useParams } from "react-router";

import styles from './AddComment.module.css';
// import AuthContext from '../../contexts/authContext';
// import { createCommentService } from "../../services/commentService"

import { addComment } from "../../services/commentsFirestoreService";


function AddComment({ 
    currentUser
    // fetchComments 
}) {
    // const { accessToken } = useContext(AuthContext)
    const { postId } = useParams()

    const initialValues = {
        text: '',
        ownerId: currentUser,   
    }

    const {
        values,
        onChange,
        onSubmit,
        //  clearState 
    } = useForm({

        submitHandler: addComment,
        // createCommentService,
        initialValues,
        // accessToken,
        postId,
        // fetchComments,
    });

    return (
        <div className={styles.container}>
            <form id={styles.contact} action="" method="post" onSubmit={onSubmit}>
                <h4 className={styles.h4}>Enter your comment.</h4>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Your comment"
                        type="text"
                        tabIndex={2}
                        required
                        name='text'
                        className={styles.input}
                        onChange={onChange}
                        value={values.text}
                    />
                </fieldset>
                <fieldset>
                    <button
                        name="submit"
                        type="submit"
                        id="contact-submit"
                        data-submit="...Sending"
                    >
                        Submit
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default AddComment;