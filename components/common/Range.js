import React, { useState, useRef } from "react";

const Range = ({ min, minValue = 0, max, maxValue = 151, onMinChange, onMaxChange }) => {
    const [minXTransform, setMinXTransform] = useState(0);
    const [maxXTransform, setMaxXTransform] = useState(0);

    const [activeHandle, setActiveHandle] = useState(null);

    const containerEl = useRef(null);
    const sliderEl = useRef(null);
    const minHandleEl = useRef(null);
    const maxHandleEl = useRef(null);

    const MIN_HANDLE = "MIN";
    const MAX_HANDLE = "MAX";

    function handleMouseMove(e) {
        if (!activeHandle) return;
        const normalisedX = e.clientX - containerEl.current.getBoundingClientRect().x;

        // bounded translate
        const x = Math.max(normalisedX, 0);
        activeHandle === MIN_HANDLE ? setMinXTransform(x) : setMaxXTransform(x);
    }

    return (
        <div
            ref={containerEl}
            className="relative w-full flex justify-items-center items-center my-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveHandle(null)}
            onMouseUp={() => setActiveHandle(null)}
        >
            <div ref={sliderEl} className="rounded-full w-full h-2 bg-gray-300"></div>
            <button
                onMouseDown={() => setActiveHandle(MIN_HANDLE)}
                ref={minHandleEl}
                className="absolute rounded-full bg-red-600 w-6 h-6 left-0 top-0 my-1 z-10 focus:outline-none"
                style={{ transform: `translate(${minXTransform}px, -50%)` }}
            >
                <div className="rounded-full absolute top-0 left-0 right-0 bottom-0 m-1 bg-white"></div>
                <div className="absolute bottom-0 text-gray-600 -my-5 text-center left-0 right-0 text-sm">
                    {minValue}
                </div>
            </button>
            <button
                onMouseDown={() => setActiveHandle(MAX_HANDLE)}
                ref={maxHandleEl}
                className="absolute rounded-full bg-red-600 w-6 h-6 right-0 top-0 my-1 z-10 focus:outline-none"
                style={{ transform: `translate(${maxXTransform}px, -50%)` }}
            >
                <div className="rounded-full absolute top-0 left-0 right-0 bottom-0 m-1 bg-white"></div>
                <div className="absolute bottom-0 text-gray-600 -my-5 text-center left-0 right-0 text-sm">
                    {maxValue}
                </div>
            </button>
        </div>
    );
};

export default Range;
