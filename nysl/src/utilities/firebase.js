// Import the functions you need from the SDKs you need  ;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { useDatabaseValue } from "@react-query-firebase/database";
import { getDatabase, onValue, ref, off, set } from 'firebase/database';
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsvfIcVL9UTTjEPqpfRFa278mIyahM0Gs",
  authDomain: "nysl-app-23.firebaseapp.com",
  databaseURL: "https://nysl-app-23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nysl-app-23",
  storageBucket: "nysl-app-23.appspot.com",
  messagingSenderId: "784199603135",
  appId: "1:784199603135:web:06d9d8cd6f171d5ac1c70a",
  measurementId: "G-JTN84BVY88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);
console.log(analytics)

export const useData = (path, transform) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const databaseRef = ref(database, path);

    const handleValue = (snapshot) => {
      const data = snapshot.val();
      const transformedData = transform ? transform(data) : data;
      setData(transformedData);
      setIsLoading(false);
      setError(null);
    };

    const handleError = (error) => {
      setIsLoading(false);
      setError(error);
    };

    onValue(databaseRef, handleValue, handleError);

    // Clean up the event listener when the component unmounts
    return () => {
      // Unsubscribe the event listener
      off(databaseRef, "value", handleValue);
    };
  },[]);

  return [data, isLoading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);



/*
 const usedata = (path, transform) => {
  const { data, isLoading, error } = useDatabaseValue(path, ref(database, path), { subscribe: true });
  const value = (!isLoading && !error && transform) ? transform(data) : data;
  console.log(data)
  console.log(isLoading)
  console.log(error)
  return [ value, isLoading, error ];
};
export const useData = (path, transform) => {
  const database = getDatabase();
  const dataRef = ref(database, path);

  const { data, isLoading, error } = useDatabaseValue(dataRef, {
    subscribe: true,
    transform: transform,
  });

  return [data, isLoading, error];
}*/