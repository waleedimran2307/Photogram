import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import add from "@/assets/icons/add.svg";
import myphotos from "@/assets/icons/myphotos.svg";
import home from "@/assets/icons/home.svg";
import profile from "@/assets/icons/profile.svg";
import logout from "@/assets/icons/logout.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { useUserAuth } from "../../context/userAuthContext";
import LogOutDrawerModal from "../LogOutDrawerModal";
import { toast } from "react-toastify";

interface ISideBarProps {}

const SideBar: React.FunctionComponent<ISideBarProps> = (_props) => {
  const { pathname } = useLocation();
  const { logOut, deleteAccount } = useUserAuth();
  const navigate = useNavigate();

  const navBarItems = [
    {
      title: "Home",
      link: "/",
      icon: home,
    },
    {
      title: "Add Photos",
      link: "/createpost",
      icon: add,
    },
    {
      title: "My Photos",
      link: "/myphotos",
      icon: myphotos,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: profile,
    },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState(true);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCloseModal(true);
  };

  const handleLogout = async () => {
    setOpenModal(false);
    try {
      await logOut()
        .then(() => {
          toast.success("You have logout successfully!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.log("The error is: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    setOpenModal(false);

    try {
      deleteAccount()
        .then(() => {
          toast.success("Account has been successfully deleted!");
          navigate("/register");
        })
        .catch((error) => {
          console.log(error, "error");
          if (error.message) {
            toast.error(error.message);
          }
        });
    } catch (error) {
      console.log("The error is :", error);
    }
  };

  return (
    <>
      <nav className="flex flex-col space-y-4 space-x-1 relative h-screen max-w-sm w-full pr-3">
        <div className=" flex justify-center m-5">
          <div className="text-white text-xl flex flex-row items-center gap-x-0">
            <img
              src="/photogram-logo.png"
              alt="No image"
              className="w-12 h-12"
            />
            <h6 className=" relative -left-2">Photogram</h6>
          </div>
        </div>

        {navBarItems.map((nav) => (
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              pathname === nav.link
                ? " bg-white text-black rounded-lg hover:bg-white"
                : "hover:bg-slate-950 hover:text-white bg-transparent rounded-lg",
              "justify-start cursor-pointer"
            )}
            key={nav.title}
          >
            <Link to={nav.link} className="flex flex-row gap-x-2 items-center">
              <span>
                <img
                  src={nav.icon}
                  alt="No image"
                  className=" w-6 h-6"
                  style={{
                    filter: ` ${
                      pathname === nav.link ? " invert(0)" : "invert(1)"
                    }`,
                  }}
                />
              </span>
              <span>{nav.title}</span>
            </Link>
          </div>
        ))}

        <div
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === "/login"
              ? " bg-white text-black rounded-none hover:bg-white"
              : "hover:bg-slate-950 hover:text-white bg-transparent rounded-lg",
            "justify-start gap-x-2"
          )}
        >
          <div
            className="cursor-pointer flex flex-row gap-x-2 items-center"
            onClick={handleModalOpen}
          >
            <span>
              <img
                src={logout}
                alt="No image"
                className=" w-6 h-6"
                style={{
                  filter: ` ${
                    pathname === "/login" ? " invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>

            <span>
              <LogOutDrawerModal
                handleClick={handleLogout}
                closeModal={handleCloseModal}
                title={"Logout"}
                img={logout}
                content={
                  " Are you absolutely sure you want to logout this account?"
                }
              />
            </span>
          </div>
        </div>

        <div
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === "/login"
              ? " bg-white text-black rounded-none hover:bg-white"
              : "hover:bg-slate-950 hover:text-white bg-transparent rounded-lg",
            "justify-start gap-x-2"
          )}
        >
          <div
            className="cursor-pointer flex flex-row gap-x-2 items-center"
            onClick={handleModalOpen}
          >
            <span>
              <img
                src={deleteIcon}
                alt="No image"
                className=" w-6 h-6"
                style={{
                  filter: ` ${
                    pathname === "/login" ? " invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>

            <span>
              <LogOutDrawerModal
                handleClick={handleDeleteAccount}
                closeModal={handleCloseModal}
                title={"Delete Account"}
                img={deleteIcon}
                content={
                  " Are you absolutely sure you want to delete this account?"
                }
              />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
