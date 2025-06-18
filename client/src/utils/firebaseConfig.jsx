// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXweqE2Ww9HiKPahCX72gtgd33k1bOcyY",
    authDomain: "rest06-7c56d.firebaseapp.com",
    projectId: "rest06-7c56d",
    storageBucket: "rest06-7c56d.appspot.com",
    messagingSenderId: "15864987251",
    appId: "1:15864987251:web:d7177eb926148c2be1b406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth