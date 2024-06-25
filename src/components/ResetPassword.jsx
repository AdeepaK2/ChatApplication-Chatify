// ResetPassword.js
import React, { useState } from "react";
import { auth } from '../firebase.js';
import { sendPasswordResetEmail } from 'firebase/auth';

//styles
import './styles.css';

export default function ResetPassword({ goBack }) {
    const [email, setEmail] = useState('');

    const resetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
                goBack();
            }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <form onSubmit={resetPassword}>
                <h1>Reset Password</h1>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Email</button>
                <button type="button" onClick={goBack}>Back to Login</button>
            </form>
        </>
    );
}
