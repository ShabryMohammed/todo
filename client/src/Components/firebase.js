// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQj_LvJvNRJ6_dogI_zL1W7su2VAPjkPE",
  authDomain: "todo-b8547.firebaseapp.com",
  projectId: "todo-b8547",
  storageBucket: "todo-b8547.appspot.com",
  messagingSenderId: "29586812239",
  appId: "1:29586812239:web:091369d5c15bbdc524e93a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db=getFirestore(app)
export default app;