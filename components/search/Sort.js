import React from "react";
import { Button, Popup } from "../common";

const Sort = ({ visible, setVisibleFn, setterFn, sortChoices, currentChoice }) => {
    return (
        <Popup visible={visible} closeFn={() => setVisibleFn(false)}>
            <div className="mb-6">
                <h3 className="text-xl font-bold">Sort</h3>
                <h4 className="text-md text-gray-600">Sort Pokémon alphabetically or by National Pokédex number!</h4>
            </div>
            <div className="flex flex-col justify-items-stretch items-center space-y-4">
                {sortChoices.map((sortObj) => {
                    const isActive = currentChoice.direction === sortObj.direction && currentChoice.key === sortObj.key;
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
        </Popup>
    );
};

export default Sort;
