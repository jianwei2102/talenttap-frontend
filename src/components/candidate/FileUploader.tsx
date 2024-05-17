import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

const FileUploader = () => {
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleFileChange = (event) => {
    const file = event.target?.files[0];
    if (file) {
      setFileName(file.name);
      console.log(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setResume(reader.result);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <>
      <div
        className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-h-56 tw-cursor-pointer tw-rounded-sm tw-py-10"
        onClick={() =>
          (
            document.querySelector(".uploader-field") as HTMLInputElement
          )?.click()
        }
      >
        <input
          type="file"
          id="file"
          className="uploader-field tw-hidden"
          accept="application/pdf"
          tw-hidden
          onChange={handleFileChange}
        />

        {resume ? (
          <embed src={resume} className="tw-w-52 tw-h-56" />
        ) : (
          <>
            <img
              className="tw-h-3/6 tw-w-3/6 tw-object-contain"
              src={require("../../assets/resume.png")}
              alt="Resume Icon"
            ></img>
            <p className="tw-mt-1">Browse Files to Upload the Documents</p>
          </>
        )}
      </div>

      {resume ? (
        <div className="tw-flex tw-justify-between tw-items-center tw-mt-2 tw-py-2 tw-bg-red-200 tw-rounded-2xl">
          <div className="tw-flex tw-items-center tw-ml-4">
            <AiFillFileImage className="tw-mr-2" />
            {fileName}
          </div>
          <button className="tw-hover:bg-red-400 tw-hover:rounded-full tw-hover:p-0.5 tw-mr-2">
            <MdDelete
              color="#D20584"
              className=" tw-w-5 tw-h-5"
              onClick={() => {
                setResume(null);
                setFileName("No selected file");
              }}
            />
          </button>
        </div>
      ) : <></>}
    </>
  );
};

export default FileUploader;
