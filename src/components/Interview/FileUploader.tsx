import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

const FileUploader = () => {
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  return (
    <>
      <div
        className="flex flex-col justify-center items-center border-dashed border-2 h-52 cursor-pointer rounded-sm py-10"
        onClick={() => (document.querySelector(".uploader-field") as HTMLInputElement)?.click()}
      >
        <input
          type="file"
          id="file"
          className="uploader-field"
          accept="application/pdf"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setFileName(file.name);
              const reader = new FileReader();
              reader.onload = () => {
                setResume(reader.result);
              };
              reader.readAsDataURL(file);
            }

            event.target.value = "";
          }}
        />
        {resume ? (
          <embed src={resume} className="w-52 h-56" />
        ) : (
          <>
            <img
              className="h-3/6 w-3/6 object-contain"
              src={require("../../assets/resume.png")}
              alt="Resume Icon"
            ></img>
            <p className="mt-1">Browse Files to Upload Resume</p>
          </>
        )}
      </div>
      {resume ? (
        <div className="flex justify-between items-center mt-2 py-2 bg-red-200 rounded-2xl">
            
          <div className="flex items-center ml-4"><AiFillFileImage className="mr-2"/>{fileName}</div>
          <button className="hover:bg-red-400 hover:rounded-full hover:p-0.5 mr-2">
            <MdDelete
              color="#D20584"
              className=" w-5 h-5"
              onClick={() => {
                setResume(null);
                setFileName("No selected file");
              }}
            />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FileUploader;
