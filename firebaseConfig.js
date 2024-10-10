// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "notitiaapp-rn.firebaseapp.com",
  projectId: "notitiaapp-rn",
  storageBucket: "notitiaapp-rn.appspot.com",
  messagingSenderId: "1087137037590",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
