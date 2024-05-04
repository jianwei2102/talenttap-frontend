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
      return <div className="h-4 w-4 rounded-full border border-red-700 border-4 ml-1 mr-1"></div>
  }
  
  const PageItem = ({index} : PageItemProps) => {
    const navigateToPage = () => {
        setActivePageIndex(index);
    }

    return <div className="h-4 w-4 rounded-full bg-red-700 ml-1 mr-1 cursor-pointer" onClick={navigateToPage}></div>;
  };

  return (
    <div className="w-full h-10 flex justify-center items-center">
      <div className={activePageIndex <= 0 ? "w-24 h-full" : "w-24 h-full border border-red-700 rounded-sm flex items-center p-2 cursor-pointer"} onClick={previousPageHandle}>
        <svg
          className={activePageIndex <= 0 ? "h-5 w-5 hidden" : "h-5 w-5 text-red-500"}
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
        <span className={activePageIndex <= 0 ? "hidden" :"text-red-700 text-sm text-center ml-2"}>Previous</span>
      </div>
      <div className="flex items-center ml-5 mr-5">
        {
          Array.from({ length: totalPages }, (_, i) => (
            i === Number(activePageIndex) ? <ActivePageItem key={i} /> : <PageItem key={i} index={i}/>
          ))
        }
      </div>
      <div className={activePageIndex >= totalPages - 1 ? "w-24 h-full" : "w-24 h-full border border-red-700 rounded-sm flex justify-center items-center p-2 cursor-pointer"} onClick={nextPageHandle}>
        <span className={activePageIndex >= totalPages - 1 ? "hidden" : "text-red-700 text-sm text-center mr-2"}>Next</span>
        <svg
          className={activePageIndex >= totalPages - 1 ? "h-5 w-5 hidden" : "h-5 w-5 text-red-500"}
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