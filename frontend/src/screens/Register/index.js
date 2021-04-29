import React, { useState } from 'react';
import styles from './register.module.css';

const Register = () => {

    return (
        <div className={styles.login__container}>
            <h1>Register</h1>
            <form>

                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Name"
                        type="text"
                        name="name"
                    />
                </div>

                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Email"
                        type="email"
                        name="email"
                    />
                </div>

                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Password"
                        type="password"
                        name="password"

                    />
                </div>

                <div className={styles.form_container}>
                    <input
                        className={styles.input_login}
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmpassword"

                    />
                </div>

                <button className={`btn btn-primary ${styles.login_button}`}>Register</button>
            </form>
        </div>
    )
}

export default Register;