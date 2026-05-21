// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHII3CIBvideqyIkeQ6WJ80ogmDqaJSxg",
  authDomain: "third-app-b8e97.firebaseapp.com",
  projectId: "third-app-b8e97",
  storageBucket: "third-app-b8e97.firebasestorage.app",
  messagingSenderId: "52581767753",
  appId: "1:52581767753:web:cb9b96fb826bcb5131bd98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);