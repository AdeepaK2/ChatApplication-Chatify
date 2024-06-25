// SignUp.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PersonalInformation from './PersonalInformation';

//styles
import './styles.css';

export default function SignUp({ goBack }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user);
                alert('Sign up successful! Please fill in your personal information.');
            }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            {user ? (
                <PersonalInformation user={user} />
            ) : (
                <form onSubmit={signUp}>
                    <h1>Sign Up</h1>
                    <input
                        type="email"
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
                    <button type="submit">Sign Up</button>
                    <button type="button" onClick={goBack}>Back to Login</button>
                </form>
            )}
        </>
    );
}
