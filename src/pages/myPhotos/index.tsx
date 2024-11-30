import * as React from "react";
import { useUserAuth } from "../../context/userAuthContext";
import { DocumentResponse, Post } from "../../types";
import { getPostByUserId } from "../../repository/post.service";
import { HeartIcon } from "lucide-react";
import LoadingSpinner from "../../components/LoaderSpinner";

interface IMyPhotosProps {}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (_props) => {
  const { user } = useUserAuth();
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

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
    }
  }, []);

  const RenderPost = () => {
    return data.map((item) => {
      return (
        <>
          <div key={item.photos[0].uuid} className="relative">
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
        </>
      );
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="border max-w-full w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            My Photos
          </h3>
          <div className="p-8 ">
            {!(data && data.length > 0) ? (
              <div className="relative">
                <LoadingSpinner height = {120} />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {RenderPost()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPhotos;
