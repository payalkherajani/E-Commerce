import React, { useState } from 'react';
import styles from './register.module.css';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Config from '../../config/Config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { serverUrl } = Config

const Register = () => {
    const history = useHistory()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const { name, email, password, confirmpassword } = formData;

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmpassword) {
            const { name, email, password } = formData;
            const toSend = { name, email, password }
            try {
                const response = await axios.post(`${serverUrl}/api/users/register`, toSend);
                if (response.status === 200) {
                    history.push("/login")
                }
            }
            catch (err) {
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
                setFormData({ ...formData, name: '', email: '', password: '', confirmpassword: '' })
            }

        }
        else {
            toast.error(`Password does not match`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return (
        localStorage.getItem('TOKEN') ? (<Redirect to="/products" />) : (
            <div className={styles.login__container}>
                <h1>Register</h1>
                <form onSubmit={onFormSubmit} className={styles.form}>
                    <div className={styles.form_container}>
                        <input
                            className={styles.input_login}
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleFormData}
                        />
                    </div>

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

                    <div className={styles.form_container}>
                        <input
                            className={styles.input_login}
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange={handleFormData}
                        />
                    </div>
                    <button className={`btn btn-primary ${styles.login_button}`}>Register</button>
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
    )
}

export default Register;