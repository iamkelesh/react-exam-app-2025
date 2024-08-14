import styles from './Login.module.css';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';

const initialValues = {
    email: '',
    password: '',
}

function Login() {
    const { loginSubmitHandler } = useContext(AuthContext)
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, initialValues)

    return (
        <div className={styles.container}>
            <form id={styles.contact} action="" method="post" onSubmit={onSubmit}>
                <h3 className={styles.h3}>Login</h3>
                <h4 className={styles.h4}>Enter your login credentials!</h4>
                <fieldset className={styles.fieldset}>
                    <input
                        placeholder="Your Email Address"
                        type="email"
                        tabIndex={2}
                        required
                        name='email'
                        className={styles.input}
                        onChange={onChange}
                        value={values.email}
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
                        onChange={onChange}
                        value={values.password}
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

export default Login;