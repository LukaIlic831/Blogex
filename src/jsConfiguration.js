import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1ylmj7LJFsML301nkRFgz1Me5Py7MGI0",
    authDomain: "blogex-f057f.firebaseapp.com",
    projectId: "blogex-f057f",
    storageBucket: "blogex-f057f.appspot.com",
    messagingSenderId: "66095290062",
    appId: "1:66095290062:web:105dbb2b243a33a3e0229f",
    measurementId: "G-VCRNQ9F579"
  };


  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const provider = new GoogleAuthProvider();

  export const db = getFirestore(app);

  