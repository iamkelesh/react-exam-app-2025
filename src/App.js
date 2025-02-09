import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        console.log('User is signed in:', user);
      } else {
        // No user is signed in
        setUser(null);
        console.log('No user is signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful
      setUser(null);
      console.log('User signed out');
    }).catch((error) => {
      // An error happened
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className="App">
      {/* ...existing code... */}
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please sign in</p>
      )}
      {/* ...existing code... */}
    </div>
  );
}

export default App;
