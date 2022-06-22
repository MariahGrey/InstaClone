// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBjlQCur6WYlMUrMdLz6JiHiLa--QIEiLI",
   authDomain: "rn-instagram-clone-327c1.firebaseapp.com",
   projectId: "rn-instagram-clone-327c1",
   storageBucket: "rn-instagram-clone-327c1.appspot.com",
   messagingSenderId: "358900282210",
   appId: "1:358900282210:web:bc904a32e5fd5e1e38323b",
   measurementId: "G-51W74VDB7V"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore()

export { firebase, db };
