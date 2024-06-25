import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzdBgwB8tfBkXZhKBO04BFjtGnriE0l88",
    authDomain: "chatfy-beff6.firebaseapp.com",
    projectId: "chatfy-beff6",
    storageBucket: "chatfy-beff6.appspot.com",
    messagingSenderId: "629132039665",
    appId: "1:629132039665:web:29e0d148df4af721bce050",
    measurementId: "G-TMB60HPVSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

