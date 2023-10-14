
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCMM5XYH8KPjBGTd0wF9cnc2ns0_k92FKk",
  authDomain: "fir-authentication-42871.firebaseapp.com",
  projectId: "fir-authentication-42871",
  storageBucket: "fir-authentication-42871.appspot.com",
  messagingSenderId: "530773889321",
  appId: "1:530773889321:web:cb7a4367c77fa0ba392738",
  measurementId: "G-3501V44EKQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)