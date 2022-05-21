// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6s_McxJ4syP9fgw2p2UfrCNHXrX2Ysqs",
    authDomain: "tools-hub-8346f.firebaseapp.com",
    projectId: "tools-hub-8346f",
    storageBucket: "tools-hub-8346f.appspot.com",
    messagingSenderId: "619796025340",
    appId: "1:619796025340:web:d613e183e6aa9a0bdeac79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;