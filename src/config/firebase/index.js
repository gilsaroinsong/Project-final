import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyAAQZXPbgUN97jCAMgYFqPKv2HGi7bNjN0",
    authDomain: "project-final-3e31e.firebaseapp.com",
    projectId: "project-final-3e31e",
    storageBucket: "project-final-3e31e.appspot.com",
    messagingSenderId: "389603341478",
    appId: "1:389603341478:web:feb860db3165c157323067"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  export default firebase;