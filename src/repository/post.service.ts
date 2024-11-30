import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { DocumentResponse, Post, ProfileData } from "../types";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const SnapShots = await getDocs(q);
    const TempArray: DocumentResponse[] = [];

    if (SnapShots.size > 0) {
      SnapShots.forEach((doc) => {
        const data = doc.data() as Post;
        const ResponseObj: DocumentResponse = {
          id: doc.id,
          ...data,
        };

        console.log(" ResponseObj of home is :  ", ResponseObj);
        TempArray.push(ResponseObj);
      });

      return TempArray;
    } else {
      console.log("No such DOcument!");
    }
  } catch (error) {
    console.log(" Error!", error);
  }
};

export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateLikesOnPost = (
  id: string,
  userLikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const data = updateDoc(docRef, {
    likes: likes,
    userLikes: userLikes,
  });

  return data;
};

export const updateProfileInfoOnPosts = async (profileInfo: ProfileData) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", profileInfo.user?.uid)
  );
  const SnapShots = await getDocs(q);

  if (SnapShots.size > 0) {
    SnapShots.forEach((document) => {
      const docRef = doc(db, COLLECTION_NAME, document.id);
      return updateDoc(docRef, {
        userName: profileInfo.userName!,
        photoURL: profileInfo.userProfileImage!,
      });
    });
  } else {
    console.log("The user does not have any post!");
  }
};
