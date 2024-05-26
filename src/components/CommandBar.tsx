import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type HeaderItem = {
    type: 'header';
    label: string;
};

type FooterItem = {
    type: 'footer';
    label: string;
}

type ActionItem = {
    type: 'action';
    label: string;
    action: () => void;
    icon: JSX.Element;
};

type NavigationItem = {
    type: 'navigate';
    label: string;
    icon: JSX.Element;
}

type Item = HeaderItem | ActionItem | FooterItem;

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const goToLLMPage = () =>{
        navigate("/LLM")
    }

    const goToDashboardPage = () => {
        navigate("/admin");
    };

    const goToCampaignPage = () => {
        navigate("/campaign-list");
    };

    const goToCreateCampaignPage = () => {
        navigate("/create-campaign");
    };

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Prevent the browser's default behavior
        onClose();
        }
    };

    if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    }, [isOpen, onClose]);

    const handleClose = () => {
        onClose();
    };

    const actionsHeader: HeaderItem = { type: 'header', label: 'Actions' };
    const navigationHeader: HeaderItem = {type: 'header', label: 'Navigation'};
    const footer: FooterItem = {type: 'footer', label: 'Powered by TalentTap'};

    const items: Item[] = [
        {type: 'action', label: 'Ask Copilot', action: goToLLMPage, icon: (
            <svg className="h-8 w-8 text-red-300" viewBox="0 0 24 24" fill="none" height="1em" width="1em" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
        )},
        actionsHeader,
        {type: 'action', label: 'Create campaign', action: goToCreateCampaignPage, icon: (
            <svg className="h-8 w-8 text-red-300" viewBox="0 0 24 24" fill="none" height="1em" width="1em" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  
                <line x1="12" y1="8" x2="12" y2="16" />  
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        )},
        {type: 'action', label: 'Browse candidates', action: () => {}, icon: (
            <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
            </svg>
        )},
        {type: 'action', label: 'Edit campaigns', action: () => {}, icon: (
            <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
            </svg>
        )},
        {type: 'action', label: 'Generate reports', action: () => {}, icon: (
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                <path d="M9 17v-5M12 17v-1M15 17v-3" />
            </svg>
        )},
        navigationHeader,
        {type: 'action', label: 'Main dashboard', action: goToDashboardPage, icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" />   
            </svg>
        )},
        {type: 'action', label: 'Campaign', action: goToCampaignPage, icon: (
            <svg viewBox="0 0 24 24" fill="none" height="1em" width="1em" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
        )},
        footer
    ];

    const footerItems: NavigationItem[] =[
        {type: 'navigate', label: 'Navigate',  icon: (
            <svg className="tw-ml-4 h-8 w-8 text-red-300" viewBox="0 0 24 24" fill="none" height="1em" width="1em" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
        )},
        {type: 'navigate', label: 'Select',  icon: (
            <svg className="tw-ml-4 h-8 w-8 text-red-300" viewBox="0 0 24 24" fill="none"  height="1em" width="1em" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  
                <polyline points="9 10 4 15 9 20" />  
                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
        )},
        {type: 'navigate', label: 'Return',  icon: (
            <svg className="tw-ml-4 h-8 w-8 text-red-300" viewBox="0 0 24 24" fill="none" height="1em" width="1em" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">  
                <path stroke="none" d="M0 0h24v24H0z"/>  
                <line x1="5" y1="12" x2="19" y2="12" />  
                <line x1="5" y1="12" x2="11" y2="18" />  
                <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
        )},
    ]

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
        {isOpen && (
            <div id='popupContainer' className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-50 tw-z-50">
            <div className="tw-w-5/12 tw-bg-white tw-rounded tw-shadow-md">
                <div className="tw-flex tw-justify-evenly tw-items-center">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Your Website or ask Copilot"
                        className="tw-w-10/12 tw-text-xs tw-pl-2 tw-py-2 tw-border tw-border-gray-300 tw-text-base tw-outline-none"
                    />
                    <svg onClick={handleClose} className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <line x1="18" y1="6" x2="6" y2="18" />  
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <div className="tw-flex tw-flex-col">
                     {filteredItems.map((item, index) => (
                        item.type === 'header' ? (
                            <div key={index} className='tw-p-2 tw-font-bold tw-text-black tw-bg-[#e7e5e4]'>
                                {item.label}
                            </div>
                        ) : item.type === 'footer' ?(
                            <>
                                <div className="tw-h-0.5 tw-bg-gray-400 tw-mt-2"></div>
                                <div key={index} className='tw-p-2 tw-flex tw-justify-between tw-items-center tw-text-sm tw-text-gray-500'>
                                    <span>{item.label}</span>
                                        <div className='tw-flex tw-items-center'>
                                            {footerItems.map((item, index) => (
                                                <div key={index} className='tw-flex tw-items-center'>
                                                    <span>{item.icon}</span>
                                                    <span className= "tw-ml-1">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                </div>
                            </>
                        ):(
                         <button 
                             key={index} 
                             onClick={item.action} 
                             className='tw-p-2 tw-flex tw-items-center tw-font-bold tw-text-gray-500 hover:tw-bg-red-500 hover:tw-text-white' 
                             tabIndex={0}
                             onFocus={(e) => e.currentTarget.classList.add('tw-bg-red-500', 'tw-text-white')}
                             onBlur={(e) => e.currentTarget.classList.remove('tw-bg-red-500', 'tw-text-white')}
                         >
                             <span>{item.icon}</span>
                             <span className="tw-ml-2">{item.label}</span>
                         </button>
                        )
                     ))}
                 </div>
             </div>
         </div>         
        )}
        </>
    );
};

const CommandBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Prevent the browser's default behavior
        setIsOpen(true);
      }else if (isOpen && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault(); // Prevent the browser's default behavior
        
        const focusableElements = document.querySelectorAll('#popupContainer [tabindex="0"]');
        const focusedElement = document.activeElement as HTMLElement;

        const currentIndex = Array.from(focusableElements).indexOf(focusedElement);

        let nextIndex = currentIndex;
        if (event.key === 'ArrowUp') {
          nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        } else if (event.key === 'ArrowDown') {
          nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1;
        }

        (focusableElements[nextIndex] as HTMLElement).focus();
      }else if(isOpen && event.key === 'Enter'){
        event.preventDefault(); // Prevent the browser's default behavior
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement.click();
      }else if(isOpen && event.key === 'ArrowLeft'){
        event.preventDefault(); // Prevent the browser's default behavior
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? "tw-w-screen tw-h-screen tw-absolute tw-flex tw-items-center tw-justify-center" : "tw-hidden"} onClick={closePopup}>
      <Popup isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default CommandBar;