import React, { useEffect, useState } from "react";
import VideoRecorder from "react-video-recorder";
import { CustomButton } from "../";
import { useNavigate } from "react-router-dom";

const Recorder = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  useEffect(() => {
    // Disable F5 and r key for refreshing the page (to prevent candidate retrying the interview)
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "F5" || e.key === "r") {
        e.preventDefault();
      }
    });

    // Check if camera and microphone permissions are granted
    Promise.all([
      navigator.permissions.query({ name: "camera" }),
      navigator.permissions.query({ name: "microphone" }),
    ]).then((results) => {
      if (results.every((result) => result.state === "granted")) {
        setPermissionGranted(true);
      } else {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => {
              console.log(track);
            });
          });
      }
    });
  }, []);

  if (!permissionGranted) {
    return (
      <div className="tw-fixed tw-inset-0 bg-black tw-opacity-95 tw-flex tw-items-center tw-justify-center tw-z-50">
        <div className="bg-white border-black border p-4 tw-w-96 tw-rounded-md">
          <p className="mb-4">Please ensure that camera and microphone access are always granted during the general interview.</p>
          <div className="tw-w-full tw-flex tw-justify-center">
          <button
            className="tw-bg-pink-500 hover:tw-bg-pink-700 tw-text-white tw-font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          </div>
        </div>
      </div>
    );
  }
  

  // Start recording count down directly when the camera is on
  let startDirectly = () => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const intervalId = setInterval(() => {
            const recordButton = document.querySelector(
              "[class^='record-button__ButtonBorder'] button"
            );
            console.log("clicking record button");
            if (recordButton) {
              // console.log("recordButton", recordButton);
              recordButton.click();
            }
          }, 100);

          const actionWrapper = document.querySelector(
            "[class^='render-actions__ActionsWrapper']"
          );
          if (actionWrapper) {
            // console.log("actionWrapper", actionWrapper);
            actionWrapper.style.marginTop = "10rem";
            observer.disconnect(); // Stop observing when the button is found and clicked
          }
        }
      }
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
  };

  // Hide the retry button after recording is completed
  const hideRetryButton = () => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const retryButton = document.querySelector(
            "[class^='button__Button']"
          );
          if (retryButton) {
            // console.log("retryButton", retryButton);
            retryButton.style.display = "none";
            observer.disconnect(); // Stop observing when the button is found and hidden
          }
        }
      }
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
  };

  const uploadVideoToDB = () => {
    // TODO: Set Blob on parent and next to the next question and upload the video to the database
  };

  return (
    <>
      <VideoRecorder
        isOnInitially
        isFliped
        showReplayControls
        countdownTime={20000}
        timeLimit={600000}
        onCameraOn={startDirectly}
        onStopRecording={hideRetryButton}
        onRecordingComplete={(videoBlob) => {
          setCompleted(true);
          setVideoBlob(videoBlob);
          console.log("videoBlob", videoBlob);
        }}
      />

      {completed && (
        <CustomButton title={"Next/ Submit"} customFunction={uploadVideoToDB} />
      )}
    </>
  );
};

export default Recorder;
