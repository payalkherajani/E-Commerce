import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import Config from '../../config/Config';
import useCustomContext from '../../customHooks/Hook'
import { toast } from 'react-toastify';
import { USER_LOGGED_IN } from '../../constants/type';
import { Redirect, useHistory } from 'react-router-dom';
const { serverUrl } = Config;

const Login = () => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { dispatch } = useCustomContext();

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
            history.push("/products");
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
        finally {
            setFormData({ ...formData, email: '', password: '' })
        }

    }


    return (
        localStorage.getItem('TOKEN') ?
            (<Redirect to="/products" />) :

            (
                <div className={styles.login__container}>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className={styles.form}>
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
                    </form>
                </div>
            )
    )
}
export default Login;