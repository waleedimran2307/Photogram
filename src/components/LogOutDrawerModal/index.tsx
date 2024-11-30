import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import * as React from "react";
import { useLocation } from "react-router-dom";

interface LogOutDrawerModalProps {
  handleClick: any;
  closeModal: any;
  title: string;
  img: string;
  content: string;
}

const LogOutDrawerModal: React.FunctionComponent<LogOutDrawerModalProps> = ({
  handleClick,
  closeModal,
  title,
  img,
  content,
}) => {
  const { pathname } = useLocation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>{title} </span>
      </AlertDialogTrigger>
      <AlertDialogContent className="  bg-slate-950 flex flex-col gap-y-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl flex flex-row items-start justify-start gap-x-1 mb-2">
            <span>
              <img
                src={img}
                alt="No image"
                className=" w-6 h-6 relative top-[3px]"
                style={{
                  filter: ` ${
                    pathname === "/login" ? " invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>
            <span className="text-white"> {title} </span>
          </AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => closeModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOutDrawerModal;
