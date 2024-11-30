import React, { useState, useCallback } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

interface IWorkWithStorageProps {}

const WorkWithStorage: React.FC<IWorkWithStorageProps> = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>("");

  const handleImageUpload = useCallback(async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `photogram/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageURL(downloadURL);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }, []);

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file).catch((err) =>
        console.error("Upload error: ", err)
      );
    }
  };

  return (
    <>
      {uploadProgress > 0 && (
        <div className="relative border rounded-xl">
          <div
            className="pl-3 py-1 bg-slate-950 text-white text-sm rounded-xl"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress < 100
              ? `Uploading ${uploadProgress}%`
              : `Upload Complete  ${uploadProgress}% `}
          </div>
        </div>
      )}

      <input
        type="file"
        className="py-3 h-14 border rounded-lg px-3"
        onChange={handleImageChange}
      />

      {imageURL && (
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          disabled
          className="border-2 p-3 rounded-xl text-sm opacity-50 truncate"
        />
      )}
    </>
  );
};

export default WorkWithStorage;
