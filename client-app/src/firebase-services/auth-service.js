import { getAuth, onAuthStateChanged} from "firebase/auth";

import firebaseApp from "../firebase/config";

const auth = getAuth(firebaseApp)

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in.");
    } else {
        console.log("No user is signed in.");
    }
})
