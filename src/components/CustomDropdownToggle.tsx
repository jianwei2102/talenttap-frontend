import React, { MouseEvent, ReactNode, Ref } from 'react';

interface CustomToggleProps {
  children: ReactNode;
  onClick: (event: MouseEvent) => void;
}

const CustomToggle = React.forwardRef<HTMLAnchorElement, CustomToggleProps>(({ children, onClick }, ref) => (
  <button
    onClick={(e: MouseEvent) => {
      e.preventDefault();
      onClick(e);
    }}
    className='tw-w-full tw-bg-white tw-border tw-border-black tw-rounded-lg tw-p-2 tw-flex tw-text-lg'
  >
    {children}
    ▼
  </button>
));

export default CustomToggle;