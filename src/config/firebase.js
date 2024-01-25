// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5D_cNsdn7JMqdAPLs0nO_QLPgC86dORY",
  authDomain: "vite-contactapp-b219b.firebaseapp.com",
  projectId: "vite-contactapp-b219b",
  storageBucket: "vite-contactapp-b219b.appspot.com",
  messagingSenderId: "428902962335",
  appId: "1:428902962335:web:d89debfc15cdad7f6a7eaa"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);