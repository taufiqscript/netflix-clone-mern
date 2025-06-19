// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1dBS6c4fYuoZvtbXVtJBNqtiGaM9F3cQ",
    authDomain: "netflix-clone-taufiq.firebaseapp.com",
    projectId: "netflix-clone-taufiq",
    storageBucket: "netflix-clone-taufiq.firebasestorage.app",
    messagingSenderId: "678677782871",
    appId: "1:678677782871:web:77804601dd6b62c40d9e12",
    measurementId: "G-YKTYQT6W41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)