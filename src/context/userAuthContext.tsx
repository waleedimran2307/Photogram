import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { ProfileData } from "../types";

interface IUserContextProviderProps {
  children: React.ReactNode;
}

type authContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
  updateProfileInfo: typeof updateProfileInfo;
  deleteAccount: typeof deleteAccount;
};

//  login
const logIn = (_email: string, _password: string) => {
  return signInWithEmailAndPassword(auth, _email, _password);
};

// sign Up
const signUp = (_email: string, _password: string) => {
  return createUserWithEmailAndPassword(auth, _email, _password);
};

// logout
const logOut = () => {
  return signOut(auth);
};

// googlesignIn
const googleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  return signInWithPopup(auth, googleProvider);
};

// update profile data
const updateProfileInfo = (profileData: ProfileData) => {
  console.log(" profileData of firebase is :  ", profileData);

  return updateProfile(profileData?.user!, {
    displayName: profileData.userName,
    photoURL: profileData.userProfileImage,
  });
};

const deleteAccount = () => {
  const user = auth.currentUser;

  console.log(user, " user of deleted user id is ");

  return deleteUser(user!);
};

export const userAuthContext = createContext<authContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
  updateProfileInfo,
  deleteAccount,
});

// provider for User
export const UserContextProvider: React.FunctionComponent<
  IUserContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log("I am in useEffect and user is : ", user);

      if (user) {
        console.log("The logged in user state is : ", user);
        setUser(user);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const value: authContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateProfileInfo,
    deleteAccount,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
