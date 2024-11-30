import * as React from "react";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import Stories from "../../components/stories";
import { DocumentResponse } from "../../types";
import { useUserAuth } from "../../context/userAuthContext";
import { getPosts } from "../../repository/post.service";
import CardPost from "../../components/CardPost";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (_props) => {
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const { user } = useUserAuth();

  const getAllPost = async () => {
    const Response: DocumentResponse[] = (await getPosts()) || [];

    console.log(" Response of home Page is: ", Response);

    setData(Response);
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost();
    }
  }, []);

  const RenderPost = () => {
    return data.map((item) => {
      return <CardPost data={item} key={item.id} />;
    });
  };

  return (
    // <Layouts>
    <div className="flex flex-col">
      <div className="relative mb-5  w-full text-grey-600 ">
        <Input
          className="border-2 focus:outline-none border-gray-300 bg-white h-10 px-5 pr-16 text-base rounded-sm"
          placeholder="Search"
          name="search"
          type="search"
        />

        <button type="submit" className="absolute top-2.5 right-2.5">
          <Search className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      <div className="mb-5 overflow-y-auto pb-3">
        <h3 className="mb-3">Stories</h3>
        <Stories data={data} />
      </div>

      <div className="mb-5">
        <h3 className="mb-5">Feed</h3>
        <div className="flex justify-center w-full">
          <div className="flex flex-col max-w-sm rounded-sm overflow-hidden">
            {data ? (
              RenderPost()
            ) : (
              <>
                <div>...Loading</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    // </Layouts>
  );
};

export default Home;
