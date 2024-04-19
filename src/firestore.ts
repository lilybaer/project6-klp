import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6jLVmHRrdUJszjo53I-SODyRcapOSuf0",
  authDomain: "project6-klp.firebaseapp.com",
  projectId: "project6-klp",
  storageBucket: "project6-klp.appspot.com",
  messagingSenderId: "700073965367",
  appId: "1:700073965367:web:74046f3e00105be7fe4cb2",
  measurementId: "G-B6TQ202NWY",
};

//initialize firebase
const myapp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(myapp);
export default db;
