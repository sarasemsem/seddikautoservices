import 'react-native-get-random-values';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBm7ggkXx0YXSXUQpKN3NNxMdN2LLtNze4",
  authDomain: "seddiksautoservices.firebaseapp.com",
  projectId: "seddiksautoservices",
  storageBucket: "seddiksautoservices.firebasestorage.app",
  messagingSenderId: "700587274975",
  appId: "1:700587274975:web:63e30c9e60656ab39def6a",
  measurementId: "G-64G2RJ89HM"
};

const app = initializeApp(firebaseConfig);

export const authen = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const storage = getStorage(app);
