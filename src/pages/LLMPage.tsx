import React from "react";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBell } from 'react-icons/fa';
import { FaMoon } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

function LLM() {
    return (
        <div className="tw-min-h-screen tw-relative tw-bg-gray-100">
            <div className="tw-relative tw-flex tw-justify-between">
                <span className="tw-mt-2 tw-ml-2 tw-text-black tw-text-lg tw-font-bold">TalentTap Copilot</span>
                <div className="tw-mt-2 tw-mr-2 tw-w-80 tw-h-12 tw-bg-red-700 tw-rounded-md">
                    <div className="tw-relative tw-w-3/4">
                        <input
                                type="text"
                                placeholder="Search"
                                className="tw-mt-2 tw-ml-2 tw-w-48 tw-text-xs tw-pl-2 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-outline-none"
                        />
                        <FaSearch className="tw-absolute tw-top-2 tw-right-10 tw-mt-2 tw-mr-2 tw-text-gray-500 tw-cursor-pointer"/>
                    </div>
                    <FaBell className="tw-absolute tw-top-3 tw-right-0 tw-mt-3 tw-mr-24 tw-text-white tw-cursor-pointer"/>
                    <FaMoon className="tw-absolute tw-top-3 tw-right-0 tw-mt-3 tw-mr-16 tw-text-white tw-cursor-pointer"/>
                    <FaInfoCircle className="tw-absolute tw-top-3 tw-right-0 tw-mt-3 tw-mr-8 tw-text-white tw-cursor-pointer"/>
                </div>
            </div>
            
            <div className="tw-relative tw-top-20">
                <div className="tw-flex tw-flex-col tw-items-center tw-space-y-6 tw-w-full tw-bg-gray-100">
                    <span className="tw-text-red-700 tw-text-3xl tw-font-bold">TalentTap Copilot</span>
                    <span className="tw-text-black tw-text-lg tw-font-bold">How can I help you today?</span>
                </div>

                <div className="tw-flex tw-flex-wrap tw-justify-center tw-mt-10 tw-absolute tw-w-full">
                    <div className="tw-flex">
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">How often do I get feedback?</h2>
                        </div>
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">How's the team organized?</h2>
                        </div>
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">Where are company policies?</h2>
                        </div>
                    </div>
                    <div className="tw-flex">
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">How can I access resources?</h2>
                        </div>
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">How are reviews done?</h2>
                        </div>
                        <div className="tw-bg-white tw-p-4 tw-m-2 tw-rounded-md tw-shadow-md tw-max-w-xs tw-text-center">
                            <h2 className="tw-text-lg tw-font-semibold">What's the company culture like?</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tw-flex tw-flex-col tw-items-center tw-space-y-2 tw-fixed tw-bottom-10 tw-w-full tw-bg-gray-100">
                <div className="tw-relative tw-w-3/4">
                    <input
                        type="text"
                        placeholder="Message TalentTap Copilot..."
                        className="tw-h-12 tw-w-full tw-text-xs tw-pl-2 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-outline-none"
                    />
                    <MdSend className="tw-absolute tw-top-2 tw-right-2 tw-mt-2 tw-mr-2 tw-text-black tw-cursor-pointer" />
                </div>
                <FaMicrophone className="tw-absolute tw-top-2 tw-right-6 tw-mt-2 tw-mr-24 tw-text-green-500 tw-cursor-pointer" />
            </div>
        </div>
    );
}

export default LLM;