// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7t5Vq5UXGrcvi0j0XAvsqWVCpAGJWqt8",
  authDomain: "greywood-hotel-app.firebaseapp.com",
  projectId: "greywood-hotel-app",
  storageBucket: "greywood-hotel-app.appspot.com",
  messagingSenderId: "274229111270",
  appId: "1:274229111270:web:21e9e49d96e98a0880ce27",
  measurementId: "G-8K556SP10Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };