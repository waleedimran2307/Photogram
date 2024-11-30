import * as React from "react";
import SideBar from "../sidebar/SideBar";
import UserList from "../userList";
import { Outlet } from "react-router-dom";

const Layouts: React.FunctionComponent = () => {
  return (
    <div className="flex bg-white ">
      <aside className="fixed top-0 left-0 flex gap-x-4 z-40 lg:w-60 h-screen bg-slate-800">
        <SideBar />
      </aside>
      <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ">
        <Outlet />
      </div>
      <aside className="hidden lg:block fixed top-0 right-0 gap-x-4 z-40 lg:w-60 h-screen bg-slate-800">
        <UserList />
      </aside>
    </div>
  );
};

export default Layouts;
