// AuthDetail.js
import React, { useEffect, useState } from "react";
import { auth, firestore } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function AuthDetail() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is signed in
                setUser(currentUser);
                fetchUserData(currentUser.uid);
            } else {
                // User is signed out
                setUser(null);
                setUserData(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const fetchUserData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(firestore, "users", uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    {userData ? (
                        <div>
                            <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
                            {userData.photoURL && <img src={userData.photoURL} alt="User Photo" style={{ width: '100px', height: '100px' }} />}
                            <p>Email: {user.email}</p>
                            <p>Age: {userData.age}</p>
                            <p>Address: {userData.address}</p>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            ) : (
                <h2>No user is signed in</h2>
            )}
        </div>
    );
}

export default AuthDetail;

