import * as React from "react";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import FileUploader from "./FileUploader";
import { EntryFiles, PhotoMeta, Post } from "../../types";
import { useUserAuth } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../repository/post.service";

interface ICreatePostProps {}

const CreatePost: React.FunctionComponent<ICreatePostProps> = (_props) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [entryFiles, setEntryFiles] = React.useState<EntryFiles>({
    files: [],
  });
  const [isImage, setIsImage] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });

  // caption
  const handleOnChangeCaption = (
    _e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost({ ...post, caption: _e.target.value });
  };

  // form submit
  const handleOnSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isImage) {
      setShowMessage(true);
    } else {
      const metaData: PhotoMeta[] = entryFiles.files.map((data) => {
        return {
          cdnUrl: data.cdnUrl,
          uuid: data.uuid,
        };
      });
      if (user != null) {
        const newPost: Post = {
          ...post,
          userId: user?.uid || null,
          photos: metaData,
          userName: user?.displayName || "",
          photoURL: user?.photoURL || "",
          userEmail: user?.email || "",
        };
        console.log("Final Post is: ", newPost);
        createPost(newPost);
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <>
      {/* <Layouts> */}
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg border">
          <h3 className="text-white text-center text-lg bg-slate-950 p-2">
            Create Post
          </h3>

          <div className="p-8">
            <form onSubmit={handleOnSubmit}>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-5 ">
                  <Label className="" htmlFor="caption">
                    Photo Caption
                  </Label>
                  <Textarea
                    className="mb-3 h-10"
                    id="caption"
                    placeholder="What's in your Photo?"
                    value={post.caption}
                    onChange={(_e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleOnChangeCaption(_e)
                    }
                  ></Textarea>
                </div>

                <div className="flex flex-col gap-y-4">
                  <Label className="" htmlFor="photos">
                    Photos
                  </Label>

                  {/* work with firebase storage  */}
                  {/* <WorkWithStorage />  */}

                  {/* work with uploader  */}

                  <div className="flex flex-col gap-0">
                    <FileUploader
                      entryFiles={entryFiles}
                      onChange={setEntryFiles}
                      setIsImage={setIsImage}
                      preview={true}
                    />

                    {showMessage && (
                      <div className="border-[1px] py-1 px-3 bg-opacity-70 rounded-lg border-red-900 text-red-900 w-[40%] text-xs font-thin font-mono relative  -top-5">
                        <span>Please! Select at least one image</span>
                      </div>
                    )}
                  </div>
                  <Button className="w-32" type="submit">
                    Post
                  </Button>
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

export default CreatePost;
