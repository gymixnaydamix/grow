import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface FirebaseContextType {
  user: User | null;
  isAuthReady: boolean;
  userRole: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within a FirebaseProvider');
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Check if user document exists, if not create it
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // Determine role based on email for bootstrapping
            const role = currentUser.email === 'yasseljebari@gmail.com' ? 'admin' : 'staff';
            
            await setDoc(userDocRef, {
              email: currentUser.email,
              name: currentUser.displayName || 'Unknown User',
              role: role,
              createdAt: serverTimestamp()
            });
            setUserRole(role);
          } else {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching/creating user doc:", error);
        }
      } else {
        setUserRole(null);
      }
      
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, isAuthReady, userRole, login, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};
