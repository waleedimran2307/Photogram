import * as React from "react";
import { useUserAuth } from "../../context/userAuthContext";
import { getAllUser } from "../../repository/user.service";
import { ProfileResponse } from "../../types";
import avatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface IUserListProps {}

const UserList: React.FunctionComponent<IUserListProps> = (_props) => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<ProfileResponse[]>([]);

  console.log("user list data is : ", data);

  const getUsersList = async (id: string) => {
    console.log("user list data  id is : ", id);

    const res = (await getAllUser(id)) || [];

    console.log(" The res of user list is : ", res);
    setData(res);
  };

  React.useEffect(() => {
    if (user != null) {
      getUsersList(user?.uid);
    }
  }, []);

  const renderUser = () => {
    return data.map((userdata) => {
      return (
        <div
          key={userdata.id}
          className="flex flex-row items-center border-gray-400 mb-4 justify-start "
        >
          <span className="mr-2">
            <img
              src={
                userdata.UserprofileImage ? userdata.UserprofileImage : avatar
              }
              alt="No image"
              className="h-10 w-10 object-cover border-2 border-slate-800 rounded-full"
            />
          </span>
          <span className="text-xs text-white">
            {userdata.Username ? userdata.Username : "Guest_User"}
          </span>

          <Button className="text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto ">
            Follow
          </Button>
        </div>
      );
    });
  };

  return (
    <>
      <Link to="/profile">
        <div className="text-white py-8 px-2">
          <div className="flex flex-row items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer">
            <span className="mr-2  ">
              <img
                src={user?.photoURL ? user.photoURL : avatar}
                alt="NO image"
                className="h-10 w-10 object-cover border-2 border-slate-800 rounded-full"
              />
            </span>
            <span className="text-base">
              {user?.displayName ? user?.displayName : "Guest_User"}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-2">
        <h3 className="text-slate-300 text-base">Suggested Friends</h3>
        <div className="my-4 ">{data.length > 0 ? renderUser() : ""}</div>
      </div>
    </>
  );
};

export default UserList;
