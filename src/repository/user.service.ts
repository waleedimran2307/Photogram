import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProfileResponse, UserProfile } from "../types";

const COLLECTION_NAME = "userProfile";

// add the profile data in db
export const userProfileData = (userData: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), userData);
  } catch (error) {
    console.log("Error is: ", error);
  }
};

// get profile data
export const getProfileDataById = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const SnapShots = await getDocs(q);
    let tempData: ProfileResponse = {};

    if (SnapShots.size > 0) {
      SnapShots.forEach((doc) => {
        const data = doc.data() as UserProfile;
        tempData = {
          id: doc.id,
          ...data,
        };

        console.log(" tempData of home is :  ", tempData);
      });
      return tempData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error is: ", error);
  }
};

// update the profile data in db
export const updateUserProfile = (id: string, user: UserProfile) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id);
  return updateDoc(docRef, {
    ...user,
  });
};

export const getAllUser = async (userId: string) => {
  try {
    const SnapShots = await getDocs(collection(db, COLLECTION_NAME));

    const TempArray: ProfileResponse[] = [];

    if (SnapShots.size > 0) {
      SnapShots.forEach((doc) => {
        const data = doc.data() as UserProfile;
        const ResponseObj: ProfileResponse = {
          id: doc.id,
          ...data,
        };

        console.log(" ResponseObj of home is :  ", ResponseObj);
        TempArray.push(ResponseObj);
      });

      return TempArray.filter((item) => item.userId !== userId);
    } else {
      console.log(" No such document found!");
    }
  } catch (error) {
    console.log(" Error is :", error);
  }
};
