// SignIn.js
import React, { useState } from "react";
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp';
import AuthDetail from './AuthDetail';

//styles
import './styles.css';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [user, setUser] = useState(null);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user);
            }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            {user ? (
                <AuthDetail />
            ) : showResetPassword ? (
                <ResetPassword goBack={() => setShowResetPassword(false)} />
            ) : showSignUp ? (
                <SignUp goBack={() => setShowSignUp(false)} />
            ) : (
                <form onSubmit={signIn}>
                    <h1>Log In</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="forget-pw"
                        type="button"
                        onClick={() => setShowResetPassword(true)}
                    >
                        Forget Password?
                    </button>
                    <button type="submit">Log In</button>
                    <p>New here?
                        <button
                            className="forget-pw"
                            type="button"
                            onClick={() => setShowSignUp(true)}
                        >
                            Sign Up
                        </button>
                    </p>
                </form>
            )}
        </>
    );
}



