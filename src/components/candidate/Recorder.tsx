import React, { useEffect, useState } from "react";
import VideoRecorder from "react-video-recorder";
import { CustomButton } from "../";

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
      }
    });
  }, []);

  if (!permissionGranted) {
    return (
      // TODO: Add reminder to hide content and only if permission is granted, show the content
      <div>Please grant camera and microphone permissions to continue.</div>
    );
  }

  // Start recording count down directly when the camera is on
  let startDirectly = () => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const recordButton = document.querySelector(
            "[class^='record-button__ButtonBorder'] button"
          );
          if (recordButton) {
            // console.log("recordButton", recordButton);
            recordButton.click();
          }

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
        countdownTime={3000}
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