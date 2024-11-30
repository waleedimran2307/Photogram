import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./routing/Routing";
import { UserContextProvider } from "./context/userAuthContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={Routing} />
      </UserContextProvider>
    </>
  );
};

export default App;
