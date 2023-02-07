import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import app from '../firebase';

interface AuthContextProviderProps {
  children: ReactNode;
}

interface PromiseResponse {
  status: 'SUCCESS' | 'FAILED';
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<PromiseResponse>;
  signOut: () => Promise<PromiseResponse>;
}

const authContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Is sign in');
        setUser(() => {
          setLoading(false);
          return user;
        });
      } else {
        console.log('Is sign out');
        setUser(() => {
          setLoading(false);
          return null;
        });
      }
    });
  }, []);

  async function signIn(
    email: string,
    password: string
  ): Promise<PromiseResponse> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      setUser(user);
      return {
        status: 'SUCCESS',
        message: '',
      };
    } catch (err) {
      let message = '';
      if (err instanceof Error) {
        message = err.message;
      }
      return {
        status: 'FAILED',
        message,
      };
    }
  }

  async function signOut(): Promise<PromiseResponse> {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return {
        status: 'SUCCESS',
        message: '',
      };
    } catch (err) {
      let message = '';
      if (err instanceof Error) {
        message = err.message;
      }
      return {
        status: 'FAILED',
        message,
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
