// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQ-TTEfqxZg0wAERVShv6pCQQQFZJnYAA",
  authDomain: "notitiaapp-rn.firebaseapp.com",
  projectId: "notitiaapp-rn",
  storageBucket: "notitiaapp-rn.appspot.com",
  messagingSenderId: "1087137037590",
  appId: "1:1087137037590:web:e3590a1d7c7efe1f26a437",
  measurementId: "G-Q0NL52C614"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
