import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8uFDalz-QpalfTq8Vmx38oszHAkhHCig",
  authDomain: "crud-app-8144c.firebaseapp.com",
  projectId: "crud-app-8144c",
  storageBucket: "crud-app-8144c.appspot.com",
  messagingSenderId: "840688057866",
  appId: "1:840688057866:web:b915a9c8fe3695745ae9f3",
  measurementId: "G-CYXR9GV03Q",
};


const app= initializeApp(firebaseConfig)

export const db = getFirestore(app)