import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  // apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
  // authDomain: "instagram-clone-23884.firebaseapp.com",
  // databaseURL: "https://instagram-clone-23884.firebaseio.com",
  // projectId: "instagram-clone-23884",
  // storageBucket: "instagram-clone-23884.appspot.com",
  // messagingSenderId: "671034896143",
  // appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
  apiKey: "AIzaSyCo1V6Tk86SGGgunLwc4SKJ_cxGOttOQU0",
  authDomain: "instagram-clone-234f3.firebaseapp.com",
  projectId: "instagram-clone-234f3",
  storageBucket: "instagram-clone-234f3.appspot.com",
  messagingSenderId: "40702504244",
  appId: "1:40702504244:web:7b259c82874ad4bea34961",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
