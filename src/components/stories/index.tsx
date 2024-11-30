import * as React from "react";
import { DocumentResponse } from "../../types";

interface IStoriesProps {
  data: DocumentResponse[];
}

const Stories: React.FunctionComponent<IStoriesProps> = ({ data }) => {
  return (
    <>
      <div>
        <div className="flex flex-row justify-start gap-2 w-full ">
          {data.map((data: any) => (
            <img
              key={data.id}
              src={data.photos[0].cdnUrl}
              alt="No image"
              className="w-20 h-20 border-4 border-slate-800 rounded-full  p-[1px] "
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;
