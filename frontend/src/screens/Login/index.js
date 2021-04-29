import React from 'react';
import styles from './login.module.css';

const Login = () => {
    return (
        <div className={styles.login__container}>
            <h1>Login</h1>
            <form>
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


                <button className={`btn btn-primary ${styles.login_button}`}>Login</button>
            </form>
        </div>
    )
}
export default Login;