import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import Config from '../../config/Config';
import useCustomContext from '../../customHooks/Hook'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_LOGGED_IN } from '../../constants/type';
const { serverUrl } = Config;

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { state, dispatch } = useCustomContext();

    const { password, email } = formData;

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${serverUrl}/api/users/login`, formData);
            dispatch({ type: USER_LOGGED_IN, payload: data.user })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        finally {
            setFormData({ ...formData, email: '', password: '' })
        }

    }

    return (
        <div className={styles.login__container}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleFormData}
                    />
                </div>

                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleFormData}
                    />
                </div>
                <button className={`btn btn-primary ${styles.login_button}`}>Login</button>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </form>
        </div>
    )
}
export default Login;