import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import app from '../firebase';

const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Is sign in');
        setUser((prev) => {
          setLoading(false);

          return user;
        });
      } else {
        console.log('Is sign out');
        setUser((prev) => {
          setLoading(false);
          return null;
        });
      }
    });
  }, []);

  async function signIn(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      setUser(user);
      return {
        status: 'SUCCESS',
      };
    } catch (err) {
      return {
        status: 'FAILED',
        message: err.message,
      };
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return {
        status: 'SUCCESS',
      };
    } catch (err) {
      console.log(err.message);
      return {
        status: 'FAILED',
        message: err.message,
      };
    }
  }

  return (
    <authContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
