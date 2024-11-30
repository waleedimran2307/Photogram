import { OutputFileEntry } from "@uploadcare/react-uploader";
import { User } from "firebase/auth";

// User Login
export interface UserLogIn {
  email: string;
  password: string;
}

// User SignIn
export interface UserSignIn {
  email: string;
  password: string;
  confirm_password: string;
}

//  Post
export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: [];
  userId: string | null;
  userName?: string;
  photoURL?: string;
  userEmail?: string ;
  date: Date;
}

// PhotoMeta
export interface PhotoMeta {
  cdnUrl: string | null;
  uuid: string | null;
}

// Entry Files
export interface EntryFiles {
  files: OutputFileEntry[];
}

export interface DocumentResponse {
  id: string;
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes?: string[]; // Define as an array of strings
  userId: string | null;
  userName?: string;
  photoURL?: string;
  date: Date;
}

export interface ProfileData {
  user?: User;
  userName?: string;
  userProfileImage?: string;
  userEmail: string;
}

export interface UserProfile {
  userId?: string;
  Username?: string;
  UserprofileImage?: string;
  userBio?: string;
  userEmail?: string ; 
}

export interface ProfileResponse {
  id?: string;
  userId?: string;
  Username?: string;
  UserprofileImage?: string;
  userBio?: string;
  userEmail? : string; 
}
