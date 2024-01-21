// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYbuXNY6E3oCEwKRhOw_145Ah4YpTe53U",
  authDomain: "fydp-fbcad.firebaseapp.com",
  projectId: "fydp-fbcad",
  storageBucket: "fydp-fbcad.appspot.com",
  messagingSenderId: "208178969552",
  appId: "1:208178969552:web:2bd26c11f0c215415c97d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };