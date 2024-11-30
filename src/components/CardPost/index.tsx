import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUserAuth } from "../../context/userAuthContext";
import { updateLikesOnPost } from "../../repository/post.service";
import { DocumentResponse } from "../../types";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";

interface ICardPostProps {
  data: DocumentResponse;
}

const CardPost: React.FunctionComponent<ICardPostProps> = ({ data }) => {
  console.log(data, "item is in card post");

  const { user } = useUserAuth();

  console.log(user, "user");

  const [likeInfo, setlikeInfo] = React.useState<{
    likes: number;
    isLikes: boolean;
  }>({
    likes: data.likes,
    isLikes: data.userLikes?.includes(user?.uid || "") ?? false,
  });

  const handleAddLikes = async (isVal: boolean) => {
    console.log("add Likes", isVal);

    if (isVal) {
      if (user != null) {
        setlikeInfo({
          likes: likeInfo.likes + 1,
          isLikes: true,
        });

        data.userLikes?.push(user!.uid);
      }
    } else {
      setlikeInfo({
        likes: likeInfo.likes - 1,
        isLikes: false,
      });
      data.userLikes?.splice(data.userLikes.indexOf(user!.uid), 1);
    }

    await updateLikesOnPost(
      data.id!,
      data.userLikes!,
      isVal ? likeInfo.likes + 1 : likeInfo.likes - 1
    );
  };

  console.log(data, " data of card is photo in home section");

  const navigate = useNavigate();

  const handleViewIndividualProfile = () => {
    console.log("data is in click form : ", data);

    if (data.userId === user?.uid) {
      navigate("/profile");
    } else {
      navigate("/otherUser-profile", { state: data });
    }
  };

  return (
    <>
      <Card className="mb-6 ">
        <CardHeader className="flex flex-col p-0">
          <CardTitle className="text-sm  text-center  flex  justify-start items-center mt-3 ml-1 mb-2">
            <span className="mr-2">
              <img
                src={ data && data.photoURL ? data.photoURL : avatar }
                alt="No image"
                loading="eager"
                className="w-10 h-10 rounded-full border-2 object-cover border-slate-800"
              />
            </span>

            {/* <Link to="/profile"  > */}
            <span
              onClick={handleViewIndividualProfile}
              className="cursor-pointer"
            >
              {user
                ? data.userName
                  ? data.userName?.replace(" ", "_")
                  : "Guest_User "
                : "Guest_User"}
            </span>
            {/* </Link> */}
          </CardTitle>

          <CardContent className="p-0">
            <img
              src={
                data.photos && data.photos[0]?.cdnUrl
                  ? data.photos[0].cdnUrl
                  : ""
              }
              alt="No image"
              className="object-cover w-full h-full"
              loading="eager"
            />
          </CardContent>

          <CardFooter className="flex flex-col p-2">
            <div className="flex justify-between w-full mb-1">
              <HeartIcon
                className={cn(
                  "mr-0",
                  "ml-0",
                  "cursor-pointer",
                  likeInfo.isLikes ? "fill-red-600 text-red-600" : "fill-none"
                )}
                onClick={() => handleAddLikes(!likeInfo.isLikes)}
              ></HeartIcon>

              <MessageCircle className="mr-1" />
            </div>

            <div className="w-full text-sm">
              {likeInfo.likes}
              {likeInfo.likes > 1 ? "Likes" : "Like"}
            </div>

            <div className="w-full text-sm flex flex-row  gap-x-1 font-medium">
              <h4 className="">
                {user
                  ? data.userName
                    ? data.userName?.replace(" ", "_")
                    : "Guest_User "
                  : "Guest_User"} <span className="text-sm font-normal">{data?.caption}</span>
              </h4>

            </div>
          </CardFooter>
        </CardHeader>
      </Card>
    </>
  );
};

export default CardPost;
