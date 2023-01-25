// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC64tznnJBsU7TizEKtGNNdisZnZJtiRsc",
  authDomain: "react-social-app-5bef9.firebaseapp.com",
  projectId: "react-social-app-5bef9",
  storageBucket: "react-social-app-5bef9.appspot.com",
  messagingSenderId: "800141068563",
  appId: "1:800141068563:web:ea9f7872a74fbe74fcf2e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
