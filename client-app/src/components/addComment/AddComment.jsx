import { useForm } from "../../hooks/useForm"
import { useContext, useEffect } from 'react';

import { useParams } from "react-router";

import styles from './AddComment.module.css';
import AuthContext from '../../contexts/authContext';
import { createCommentService } from "../../services/commentService"

const initialValues = {
    text: '',
}

function AddComment({fetchComments}) {
    const { accessToken } = useContext(AuthContext)
    const { postId } = useParams()
    // console.log(updateComments)
    // const { values, onChange, onSubmit } = useForm({ submitHandler: createCommentService, 
    //     initialValues, accessToken, postId })

    const { values, onChange, onSubmit } = useForm({
        // submitHandler: async (values) => {
        //     await createCommentService({ values, accessToken, postId });
        //     fetchComments();
        // },
        submitHandler:createCommentService,
        createCommentService,
        initialValues,
        accessToken,
        postId,
        fetchComments
    });

    useEffect(() => {
        console.log('mounted')

        return () => {
            console.log('unmounted')
        }
    })
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