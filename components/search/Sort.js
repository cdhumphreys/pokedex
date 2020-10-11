import React, { useState } from "react";
import Button from "../Button";

const Sort = ({ visible, setVisibleFn, setterFn, sortChoices, currentChoice }) => {
    return (
        <div
            onClick={() => setVisibleFn(false)}
            className={`transition duration-500 bg-black bg-opacity-50 fixed bottom-0 flex justify-center left-0 right-0 top-0 z-50 items-end lg:items-center ${
                visible ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className={`transition duration-500 relative bg-white rounded-lg flex flex-col p-4 w-full lg:w-auto ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
            >
                <div
                    onClick={() => setVisibleFn(false)}
                    className="absolute text-md text-black right-0 top-0 mt-2 mr-2 hidden lg:block"
                >
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
                <div className="mb-6">
                    <h3 className="text-xl font-bold">Sort</h3>
                    <h4 className="text-md text-gray-600">
                        Sort Pokémon alphabetically or by National Pokédex number!
                    </h4>
                </div>
                <div className="flex flex-col justify-items-stretch items-center space-y-4">
                    {sortChoices.map((sortObj) => {
                        const isActive =
                            currentChoice.direction === sortObj.direction && currentChoice.key === sortObj.key;
                        return (
                            <Button
                                key={sortObj.key + sortObj.direction}
                                isPrimary={isActive}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setterFn(sortObj);
                                    setVisibleFn(false);
                                }}
                            >
                                {sortObj.displayText}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sort;
