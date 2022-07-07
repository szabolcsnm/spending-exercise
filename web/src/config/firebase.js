// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSyOp0GXBfGvUYR3iU-BANxMyDxMAPpp4",
  authDomain: "polygence-coding-challenge.firebaseapp.com",
  databaseURL: "https://polygence-coding-challenge-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "polygence-coding-challenge",
  storageBucket: "polygence-coding-challenge.appspot.com",
  messagingSenderId: "1078017263585",
  appId: "1:1078017263585:web:4aef15becedd9a97b5f4a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);