import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCQSx4A9B6P6xiz1m_67A6aRpV3E7xFssA",
  authDomain: "todoist-clone-be06c.firebaseapp.com",
  databaseURL: "https://todoist-clone-be06c.firebaseio.com",
  projectId: "todoist-clone-be06c",
  storageBucket: "todoist-clone-be06c.appspot.com",
  messagingSenderId: "647160804813",
  appId: "1:647160804813:web:e1674ba0a5d1e8d23bc084",
  measurementId: "G-SDC7D6T893",
});

export { firebaseConfig as firebase };
