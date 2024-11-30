import * as React from "react";
import { DocumentResponse, Post, ProfileResponse } from "../../types";
import { useUserAuth } from "../../context/userAuthContext";
import { HeartIcon } from "lucide-react";
import avatar from "../../assets/images/avatar.png";
import { Button } from "../../components/ui/button";
import { getPostByUserId } from "../../repository/post.service";
import { useLocation } from "react-router-dom";
import { getProfileDataById } from "../../repository/user.service";
interface IOtherUserProfileProps {}

const OtherUserProfile: React.FunctionComponent<IOtherUserProfileProps> = (
  _props
) => {
  const { user } = useUserAuth();

  const location = useLocation();

  const { id, photoURL, userEmail, userName, userId } = location.state;

  const initialUserInfo: ProfileResponse = {
    id: id,
    userId: userId,
    Username: userName,
    UserprofileImage: photoURL,
    userBio: "Bio is not updated yet!",
    userEmail: userEmail,
  };

  const [UserInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);

  console.log(UserInfo, "user profile is");

  const handleEditOption = () => {
    console.log(" You have click on it!");
  };

  const [data, setData] = React.useState<DocumentResponse[]>([]);

  console.log(data, " data is in other profile is");

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
              src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
              className="rounded-2xl"
            />
          </div>
        </div>
      );
    });
  };

  const getUserProfile = async (userID: string) => {
    const res = (await getProfileDataById(userID)) || {};

    if (res.Username) {
      setUserInfo(res);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(userId);
      getUserProfile(userId);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Other User Profile
          </h3>

          <div className="p-8 pb-4 border-b ">
            <div className="flex   items-center pb-2 mb-2">
              <div className="ml-0">
                <img
                  src={UserInfo.UserprofileImage ?? avatar}
                  alt="No image"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
            </div>

            <div className="grid grid-rows-2 justify-items-start gap-y-2">
              <div className="text-sm italic">📛 {UserInfo.Username} </div>
              <div className="text-sm italic">📧 {userEmail}</div>
              <div className=" w-full text-sm italic flex flex-row gap-x-1 mb-2 ">
                <span>✍</span>
                <span className="mt-[2px] text-sm">
                  {UserInfo?.userBio
                    ? UserInfo.userBio
                    : "Not updated bio yet!..."}
                </span>
              </div>
              <div>
                <Button onClick={handleEditOption}>
                  <span className="text-sm">Follow</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="mb-5">User Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data.length > 0 ? RenderPost() : <div className="text-black">Data is not available here!</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfile;
