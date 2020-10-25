import React from "react";

const Popup = ({ visible, closeFn, children }) => {
    return (
        <div
            onClick={closeFn}
            className={`transition duration-500 bg-black bg-opacity-50 fixed bottom-0 flex justify-center left-0 right-0 top-0 z-50 items-end lg:items-center ${
                visible ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className={`max-h-4/5 overflow-y-auto transition duration-500 relative bg-white rounded-lg flex flex-col p-4 w-full lg:w-auto lg:m-4 lg:max-w-screen-lg ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
            >
                <div onClick={closeFn} className="absolute text-md text-black right-0 top-0 mt-2 mr-2">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Popup;
