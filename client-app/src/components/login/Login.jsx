import { useContext } from 'react';
import { Link } from "react-router-dom";

import AuthContext from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';

const initialValues = {
    email: '',
    password: '',
}

function Login() {
    const { newLoginHandler } = useContext(AuthContext)
    const { values, onChange, onSubmit } = useForm({ submitHandler: newLoginHandler, initialValues })

    return (
        <div className="pt-48 flex items-center justify-center p-4">
            <div className="max-w-md w-full rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log in</h2>

                <form className="space-y-4" action="" onSubmit={onSubmit}>
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

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/user/register" className="text-indigo-600 hover:text-indigo-500 font-medium">   Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;