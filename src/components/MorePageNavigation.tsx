import React, { useEffect } from "react";
import { useState } from "react";

interface MorePageNavigationProps {
  currentActivePageIndex: number;
  totalPages: number;
}

interface PageItemProps {
    index: number;
}

function MorePageNavigation({
  currentActivePageIndex,
  totalPages,
}: MorePageNavigationProps) {
  const [activePageIndex, setActivePageIndex] = useState(
    currentActivePageIndex
  );

  const previousPageHandle = () => {
    setActivePageIndex(activePageIndex - 1);
  }

  const nextPageHandle = () => {
    setActivePageIndex(activePageIndex + 1);
  }
  
  const ActivePageItem = () => {
      return <div className="tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-red-700 tw-border-4 tw-ml-1 tw-mr-1"></div>
  }
  
  const PageItem = ({index} : PageItemProps) => {
    const navigateToPage = () => {
        setActivePageIndex(index);
    }

    return <div className="tw-h-4 tw-w-4 tw-rounded-full tw-bg-red-700 tw-ml-1 tw-mr-1 tw-cursor-pointer" onClick={navigateToPage}></div>;
  };

  return (
    <div className="tw-w-full tw-h-10 tw-flex tw-justify-center tw-items-center">
      <div className={activePageIndex <= 0 ? "tw-w-24 tw-h-full" : "tw-w-24 tw-h-full tw-border tw-border-red-700 tw-rounded-sm tw-flex tw-items-center tw-p-2 tw-cursor-pointer"} onClick={previousPageHandle}>
        <svg
          className={activePageIndex <= 0 ? "tw-h-5 tw-w-5 tw-hidden" : "tw-h-5 tw-w-5 tw-text-red-500"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className={activePageIndex <= 0 ? "tw-hidden" :"tw-text-red-700 tw-text-sm tw-text-center tw-ml-2"}>Previous</span>
      </div>
      <div className="tw-flex tw-items-center tw-ml-5 tw-mr-5">
        {
          Array.from({ length: totalPages }, (_, i) => (
            i === Number(activePageIndex) ? <ActivePageItem key={i} /> : <PageItem key={i} index={i}/>
          ))
        }
      </div>
      <div className={activePageIndex >= totalPages - 1 ? "tw-w-24 tw-h-full" : "tw-w-24 tw-h-full tw-border tw-border-red-700 tw-rounded-sm tw-flex tw-justify-center tw-items-center tw-p-2 tw-cursor-pointer"} onClick={nextPageHandle}>
        <span className={activePageIndex >= totalPages - 1 ? "tw-hidden" : "tw-text-red-700 tw-text-sm tw-text-center tw-mr-2"}>Next</span>
        <svg
          className={activePageIndex >= totalPages - 1 ? "tw-h-5 w-5 tw-hidden" : "tw-h-5 tw-w-5 tw-text-red-500"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </div>
  );
}

export default MorePageNavigation;