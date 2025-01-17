// import  { useContext } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Register.module.css'
// import { useForm } from '../../hooks/useForm';
// import AuthContext from '../../contexts/authContext'

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    repeatPassword: ''
}



function Register() {

    // const { registerSubmitHandler } = useContext(AuthContext)
    // const { values, onChange, onSubmit } = useForm({submitHandler:registerSubmitHandler, initialValues})

    return (
        <div className={styles.container}>
            <form id={styles.contact} action="" method="post" 
            // onSubmit={onSubmit}
            >
                <h3 className={styles.h3}>Login</h3>
                <h4 className={styles.h4}>Enter your login credentials!</h4>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Your full name"
                        type="text"
                        tabIndex={2}
                        required
                        name='fullName'
                        className={styles.input}
                        // onChange={onChange}
                        // value={values.fullName}
                    />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Your email"
                        type="email"
                        tabIndex={1}
                        required
                        autoFocus
                        name='email'
                        className={styles.input}
                        // onChange={onChange}
                        // value={values.email}
                    />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Your password"
                        type="password"
                        tabIndex={1}
                        required
                        autoFocus
                        name='password'
                        className={styles.input}
                        // onChange={onChange}
                        // value={values.password}
                    />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Repeat your password"
                        type="password"
                        tabIndex={1}
                        required
                        autoFocus
                        name='repeatPassword'
                        className={styles.input}
                        // onChange={onChange}
                        // value={values.repeatPassword}
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
    );
}

export default Register;