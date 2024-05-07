import React, { useEffect, useState } from "react";
import VideoRecorder from "react-video-recorder";

const Recorder = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Check camera and microphone permissions
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
      <div>Please grant camera and microphone permissions to continue.</div>
      // TODO: Add reminder to hide content and only if permission is granted, show the content
    );
  }

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
          console.log("videoBlob", videoBlob);
          // Set Blob on parent and next to the next question and upload the video
        }}
      />

      {completed && (
        <div className="flex flex-col justify-center gap-y-2 items-center">
          <button className="w-48 h-12 mx-auto mt-10 bg-red-500 text-white rounded-lg text-lg">
            Next/ Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Recorder;
