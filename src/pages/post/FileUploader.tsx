import * as React from "react";
import {
  FileUploaderRegular,
  OutputFileEntry,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { EntryFiles } from "../../types";

interface IFileUploaderProps {
  entryFiles: EntryFiles;
  onChange: (entryFiles: EntryFiles) => void;
  setIsImage: React.Dispatch<React.SetStateAction<boolean>>;
  preview :  boolean
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  entryFiles,
  onChange,
  setIsImage,
  preview
}) => {
  const ctxProviderRef = React.useRef<InstanceType<UploadCtxProvider>>(null);

  // change event of images
  const handleChangeEvent = (files: { allEntries: any[] }) => {
    const successfulFiles = files.allEntries.filter(
      (f) => f.status === "success"
    ) as OutputFileEntry<"success">[];

    setIsImage(true);

    onChange({
      ...entryFiles, // Spread the existing properties of entryFiles
      files: [...successfulFiles], // Keep the updated files array
    });
  };

  // handle remove the image
  const handleRemoveClick = React.useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({
        ...entryFiles, // Spread the existing properties of entryFiles
        files: entryFiles.files.filter((f) => f.uuid !== uuid),
      }),
    [entryFiles, onChange]
  );

  return (
    <>
      <div>
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox"
          classNameUploader="uc-light"
          pubkey="b736b7618ded8555bd79"
          apiRef={ctxProviderRef}
          onChange={handleChangeEvent}
          imgOnly
          multiple={preview}
          removeCopyright
          confirmUpload={false}
        />
      </div>

      {(preview) && <div className="grid grid-cols-2 gap-4 mt-8">
        {entryFiles.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
              alt="Uploaded"
            />
            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>}
    </>
  );
};

export default FileUploader;