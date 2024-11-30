import * as React from "react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../../components/ui/textarea";
import FileUploader from "../post/FileUploader";
import { Button } from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { EntryFiles, ProfileData, UserProfile } from "../../types";
import { Input } from "../../components/ui/input";
import {
  updateUserProfile,
  userProfileData,
} from "../../repository/user.service";
import { useUserAuth } from "../../context/userAuthContext";
import { updateProfileInfoOnPosts } from "../../repository/post.service";

interface IEditProfileProps {}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (_props) => {
  // for fileuploader
  const [isImage, setIsImage] = React.useState(false);
  const [entryFiles, setEntryFiles] = React.useState<EntryFiles>({
    files: [],
  });
  React.useEffect(() => {
    if (entryFiles.files.length > 0) {
      setData({ ...data, UserprofileImage: entryFiles.files[0].cdnUrl || "" });
    }
  }, [entryFiles]);

  //   for user info  and data
  const navigate = useNavigate();
  const { user, updateProfileInfo } = useUserAuth();

  const location = useLocation();
  const { id, userId, userBio, Username, UserprofileImage , userEmail} = location.state;
  
   console.log( " User email is in edit profile ", userEmail)
  
  const [data, setData] = React.useState<UserProfile>({
    userId: userId,
    Username,
    UserprofileImage,
    userBio,
    userEmail
  });

  const handleOnChangeUserName = (_e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, Username: _e.target.value });
  };

  const handleOnChangeCaption = (
    _e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, userBio: _e.target.value });
  };

  const handleEditProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(data, "data of edit profile is");

    try {
      if (id) {
        await updateUserProfile(id, data);
      } else {
        await userProfileData(data);
      }

      if (user != null) {
        const ProfileInfoData: ProfileData = {
          user: user,
          userName: data.Username,
          userProfileImage: data.UserprofileImage,
          userEmail: data.userEmail!
        };
        updateProfileInfo(ProfileInfoData);
        updateProfileInfoOnPosts(ProfileInfoData);
      }

      navigate("/profile");
    } catch (error) {
      console.log(" The error is: ", error);
    }
  };

  return (
    <>
      {/* <Layouts> */}
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg border">
            <h3 className="text-white text-center text-lg bg-slate-950 p-2">
              Edit Profile
            </h3>

            <div className="p-8">
              <form onSubmit={handleEditProfile}>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-3 ">
                    {/* image section*/}
                    <div className="flex flex-col gap-y-2">
                      <Label htmlFor="profilePicture">Profile Picture</Label>

                      <div className="mb-4">
                        {entryFiles.files.length > 0 ? (
                          <img
                            src={data.UserprofileImage}
                            alt="No image"
                            className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                          />
                        ) : (
                          <img
                            src={data.UserprofileImage}
                            alt="No image"
                            className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                          />
                        )}
                      </div>

                      <div className="flex flex-col gap-0 mb-5">
                        <FileUploader
                          entryFiles={entryFiles}
                          onChange={setEntryFiles}
                          setIsImage={setIsImage}
                          preview={false}
                        />
                      </div>
                    </div>

                    {/* Name Section */}
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor="userName">
                        User Name
                      </Label>
                      <Input
                        className="mb-8 "
                        type="text"
                        id="userName"
                        placeholder="Enter your UserName..."
                        value={data.Username}
                        onChange={(_e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOnChangeUserName(_e)
                        }
                      ></Input>
                    </div>

                    {/* Bio Section */}
                    <div className="flex flex-col">
                      <Label className="mb-2" htmlFor="userBio">
                        Bio
                      </Label>
                      <Textarea
                        className="mb-3 h-2 "
                        id="caption"
                        placeholder="What's in your mind!"
                        value={data.userBio}
                        onChange={(
                          _e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => handleOnChangeCaption(_e)}
                      ></Textarea>
                    </div>

                    <div className="flex flex-row gap-x-4">
                      <Button className="w-32 " type="submit">
                        Update
                      </Button>
                      <Button
                        className="w-32"
                        variant="destructive"
                        onClick={() => navigate("/profile")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      {/* </Layouts> */}
    </>
  );
};

export default EditProfile;
