import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../LoaderSpinner";

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (
  _props
) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [delayedLoading, setDelayedLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setDelayedLoading(false);
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      setDelayedLoading(false);
    }
  }, [loading]);

  if (loading || delayedLoading) {
    return (
      <>
        <div className="bg-black">
          <LoadingSpinner height={"100vh"} />;
        </div>
      </>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
