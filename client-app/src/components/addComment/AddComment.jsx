import { useForm } from "../../hooks/useForm"
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './AddComment.module.css';
import AuthContext from '../../contexts/authContext';
import { createCommentService } from "../../services/commentService"
import { useParams } from "react-router";

const initialValues = {
    text: '',
}

function AddComment() {
    const { accessToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const {postId} = useParams()
    // console.log(postId)
    // const { loginSubmitHandler } = useContext(AuthContext)
    const { values, onChange, onSubmit } = useForm({ submitHandler: createCommentService, initialValues, accessToken, postId, navigate})

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
                        value={values.email}
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