import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAnsBT61j3Vz9ll94z7xD9QOs8mwSGt04c",
    authDomain: "react-diary-8a2e0.firebaseapp.com",
    projectId: "react-diary-8a2e0",
    storageBucket: "react-diary-8a2e0.appspot.com",
    messagingSenderId: "829437305822",
    appId: "1:829437305822:web:934d0a88ba7d21c299334f",
    measurementId: "G-P4ES4E584T"
};

export const app = initializeApp(firebaseConfig)
export const Firestore = getFirestore(app)