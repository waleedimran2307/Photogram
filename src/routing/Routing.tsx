import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes/index.tsx";
import Layouts from "../components/Layouts/index.tsx";
import Home from "../pages/home/index.tsx";
import Error from "../pages/error/index.tsx";
import MyPhotos from "../pages/myPhotos/index.tsx";
import CreatePost from "../pages/post/index.tsx";
import Profile from "../pages/profile/index.tsx";
import EditProfile from "../pages/profile/EditProfile.tsx";
import Login from "../pages/login/index.tsx";
import Register from "../pages/register/index.tsx";
import OtherUserProfile from "../components/otherUserProfile/index.tsx";
import LogOutDrawerModal from "../components/LogOutDrawerModal/index.tsx";

export const Routing = createBrowserRouter([
  {
    element: (
      <Suspense>
        <ProtectedRoutes />
      </Suspense>
    ),
    children: [
      {
        element: <Layouts />,
        children: [
          {
            path: "/",
            element: <Home />,
            errorElement: <Error />,
          },
          {
            path: "/myphotos",
            element: <MyPhotos />,
            errorElement: <Error />,
          },
          {
            path: "/createpost",
            element: <CreatePost />,
            errorElement: <Error />,
          },
          {
            path: "/profile",
            element: <Profile />,
            errorElement: <Error />,
          },
          {
            path: "/edit-profile",
            element: <EditProfile />,
            errorElement: <Error />,
          },
          {
            path: "/otherUser-profile",
            element: <OtherUserProfile />,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <Register />
      </Suspense>
    ),
    errorElement: <Error />,
  },
]);
