import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDgLqMhC1vlduesnz3slLFzNJFO-Nn2fHo",
    authDomain: "klan-chat-26777.firebaseapp.com",
    projectId: "klan-chat-26777",
    storageBucket: "klan-chat-26777.appspot.com",
    messagingSenderId: "867320986860",
    appId: "1:867320986860:web:06906ef094b3ffa524f9c9"
  }).auth();