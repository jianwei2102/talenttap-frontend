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
    className='w-full bg-white border border-black rounded-lg p-2 flex text-lg'
  >
    {children}
    ▼
  </button>
));

export default CustomToggle;