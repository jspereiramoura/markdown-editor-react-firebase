import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getFirebase from "../../config/firebase";

interface AuthContextType {
  logout?: () => void;
  login?: (email: string, password: string) => void;
  signUp?: (email: string, password: string) => void;
  isAuthenticated?: boolean;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = getFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("loggedInUid")
  );
  const { state } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("loggedInUid");
      navigate("/login");
    });
  };

  const login = (email: string, password: string) => {
    setIsAuthenticated(true);

    signInWithEmailAndPassword(auth, email, password).then(() => {
      localStorage.setItem("loggedInUid", auth.currentUser.uid);
      navigate(state?.from ?? "/");
    });
  };

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      login(email, password);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
