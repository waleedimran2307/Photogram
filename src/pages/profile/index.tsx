import * as React from "react";
import { DocumentResponse, Post, ProfileResponse } from "../../types";
import { useUserAuth } from "../../context/userAuthContext";
import { Edit2Icon, HeartIcon } from "lucide-react";
import avatar from "../../assets/images/avatar.png";
import { Button } from "../../components/ui/button";
import { deletePost, getPostByUserId } from "../../repository/post.service";
import { useNavigate } from "react-router-dom";
import { getProfileDataById } from "../../repository/user.service";
import LoadingSpinner from "../../components/LoaderSpinner";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (_props) => {
  const { user } = useUserAuth();

  const navigate = useNavigate();

  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    Username: user?.displayName ? user.displayName : "Guest_User",
    UserprofileImage: user?.photoURL ? user.photoURL : avatar,
    userBio: "Please update your bio...",
    userEmail: user?.email ? user.email : "",
  };

  const [UserInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);

  console.log(UserInfo, "UserInfo in profile section!  ");

  const handleEditOption = () => {
    navigate("/edit-profile", { state: UserInfo });
  };

  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    console.log("id is:  ", id);

    try {
      const SnapShots = await getPostByUserId(id);
      const TempArray: DocumentResponse[] = [];

      if (SnapShots.size > 0) {
        SnapShots.forEach((doc) => {
          const data = doc.data() as Post;
          const ResponseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };

          console.log(" The ResponseObj is: ", ResponseObj);
          TempArray.push(ResponseObj);
        });
        setData(TempArray);
      } else {
        console.log("No such Document!");
      }
    } catch (error) {
      console.log(" Error!", error);
    }
  };

  const handleRemoveClick = async (id: string) => {
    console.log("delete post id is :", id);

    try {
      await deletePost(id);

      setData((prevData) => prevData.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error, "Error!");
    }
  };

  const RenderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.id}>
          <div className="relative">
            <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
              <div className="flex flex-col justify-center items-center  w-full h-full">
                <HeartIcon className="hidden group-hover:block fill-white" />
                <div className="hidden group-hover:block text-white">
                  {item.likes} likes
                </div>
              </div>
            </div>
            <img
              src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/600x600/center/`}
              className="rounded-2xl"
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(item.id)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const getUserProfile = async (userID: string) => {
    const res = (await getProfileDataById(userID)) || {};

    console.log(" The res of profile is :", res);

    if (res.Username) {
      setUserInfo(res);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfile(user.uid);
    }
  }, [user, user?.uid]);

  return (
    <>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>

          <div className="p-8 pb-4 border-b ">
            <div className="flex   items-center pb-2 mb-2">
              <div className="ml-0">
                <img
                  src={user?.photoURL ? user?.photoURL : avatar}
                  alt="No image"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
            </div>

            <div className="grid grid-rows-2 justify-items-start gap-y-2">
              <div className="text-sm italic">📛 {UserInfo.Username} </div>
              <div className="text-sm italic">
                📧 {user?.email ? user.email : ""}
              </div>
              <div className=" w-full text-sm italic flex flex-row gap-x-1 mb-2 ">
                <span>✍</span>
                <span className="mt-[2px] text-sm">
                  {UserInfo?.userBio
                    ? UserInfo.userBio
                    : "Please update your bio..."}
                </span>
              </div>
              <div>
                <Button onClick={handleEditOption}>
                  <Edit2Icon className="mr-1 h-3 w-3 "></Edit2Icon>
                  <span className="text-sm">Edit Profile</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="mb-5">My Posts</h2>

            {!(data && data.length > 0) ? (
              <div className=" bg-slate-900 block w-full text-white text-center p-2 rounded-lg text-base font-serif font-thin">
                There is no post!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {RenderPost()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
