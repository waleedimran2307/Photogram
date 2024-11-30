import { HashLoader } from "react-spinners";

type Props = {
  height: any;
};

const LoadingSpinner = ({ height }: Props) => {
  return (
    <div
      className="flex justify-center items-center  w-full"
      style={{ height: `${height}`, zIndex: 1000 }}
    >
      <HashLoader color="#1e293b" size={30} />
    </div>
  );
};

export default LoadingSpinner;
