import React, { createContext, useContext, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { authen, db } from "../config/FirebaseConfig"; // RN Firebase instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface User {
  email: string;
  password: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * The AuthProvider component is the top-level component that wraps the entire app.
 * It provides an AuthContext that can be used to access the current user and
 * perform authentication actions (login and register). It also provides a
 * callback to update the current user.
 *
 * @param {React.ReactNode} children The child elements to be rendered within the
 *                                    AuthProvider.
 * @returns {JSX.Element} The AuthProvider component with the provided children.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(authen,email, password);
      setUser({ email, password });
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authen,email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });
      setUser({ email, password });
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn: login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
