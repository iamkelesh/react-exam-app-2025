import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";

import firebaseApp from "../firebase/config";

// const auth = getAuth(firebaseApp)

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
