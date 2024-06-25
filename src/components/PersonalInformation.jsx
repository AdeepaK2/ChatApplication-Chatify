// PersonalInformation.js
import React, { useState } from 'react';
import { firestore, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function PersonalInformation({ user }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);

    const savePersonalInfo = async (e) => {
        e.preventDefault();

        let photoURL = '';
        if (photo) {
            const photoRef = ref(storage, `user_photos/${user.uid}`);
            await uploadBytes(photoRef, photo);
            photoURL = await getDownloadURL(photoRef);
        }

        try {
            await setDoc(doc(firestore, 'users', user.uid), {
                firstName,
                lastName,
                age,
                address,
                email: user.email,
                photoURL
            });
            alert('Personal information saved successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={savePersonalInfo}>
            <h1>Fill Personal Information</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button type="submit">Save</button>
        </form>
    );
}

