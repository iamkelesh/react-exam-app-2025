import { useContext } from 'react';

import { Link } from "react-router-dom";

import { useForm } from '../../hooks/useForm';

import AuthContext from '../../contexts/authContext'
import ErrorContext from '../../contexts/errorContext';

const initialValues = {
    fullName: '',
    jobTitle: '',
    bio: '',
    email: '',
    password: '',
    repeatPassword: ''
}



function Register() {
    const { showErrorHandler } = useContext(ErrorContext)
    const { newRegisterHandler } = useContext(AuthContext)

    const registerSubmit = async (e) => {
        try{
            newRegisterHandler(e)
        } catch (error) {
            console.error('Error during registration:', error)
            showErrorHandler('Error during registration!')
        }
    }

    const {
        values,
        onChange,
        onSubmit } = useForm({
            submitHandler: registerSubmit,
            initialValues
        })

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>

                <form className="space-y-4" action="" onSubmit={onSubmit}>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                        <input
                            type="text"
                            name='fullName'
                            
                            onChange={onChange}
                            value={values.fullName}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Type your full name here"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            
                            onChange={onChange}
                            value={values.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Type your email here"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                        <input
                            type="text"
                            name='jobTitle'
                            
                            onChange={onChange}
                            value={values.jobTitle}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Type what you work here"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            type="text"
                            name='bio'
                            
                            onChange={onChange}
                            value={values.bio}
                            className="w-full rows-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Type your bio here"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            name='password'
                            
                            onChange={onChange}
                            value={values.password}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Repeat your password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            name='repeatPassword'
                            
                            onChange={onChange}
                            value={values.repeatPassword }
                        />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Sign up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/user/login" className="text-indigo-600 hover:text-indigo-500 font-medium">   Sign  in</Link>
                </div>
            </div>
        </div>
    )


}


export default Register;



// return (
//     <div className={styles.container}>
//         <form id={styles.contact} action="" method="post"
//             onSubmit={onSubmit}
//         >
//             <h3 className={styles.h3}>Register</h3>
//             <h4 className={styles.h4}>Enter your login credentials!</h4>
//             <fieldset className={styles.fieldset}>
//                 <input
//                     placeholder="Your full name"
//                     type="text"
//                     tabIndex={2}
//                     
//                     name='fullName'
//                     className={styles.input}
//                     onChange={onChange}
//                     value={values.fullName}
//                 />
//             </fieldset>
//             <fieldset className={styles.fieldset}>
//                 <input
//                     placeholder="Your email"
//                     type="email"
//                     tabIndex={1}
//                     
//                     autoFocus
//                     name='email'
//                     className={styles.input}
//                     onChange={onChange}
//                     value={values.email}
//                 />
//             </fieldset>
//             <fieldset className={styles.fieldset}>
//                 <input
//                     placeholder="Your password"
//                     type="password"
//                     tabIndex={1}
//                     
//                     autoFocus
//                     name='password'
//                     className={styles.input}
//                     onChange={onChange}
//                     value={values.password}
//                 />
//             </fieldset>
//             <fieldset className={styles.fieldset}>
//                 <input
//                     placeholder="Repeat your password"
//                     type="password"
//                     tabIndex={1}
//                     
//                     autoFocus
//                     name='repeatPassword'
//                     className={styles.input}
//                     onChange={onChange}
//                     value={values.repeatPassword}
//                 />
//             </fieldset>
//             <fieldset>
//                 <button
//                     name="submit"
//                     type="submit"
//                     id="contact-submit"
//                     data-submit="...Sending"
//                 >
//                     Submit
//                 </button>
//             </fieldset>

//         </form>
//     </div>
// );