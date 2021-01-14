import React from "react";
// import { Button } from "../common";
import { Box, Heading, Button, Text } from "grommet";

const Sort = ({ setterFn, sortChoices, currentChoice }) => {
    return (
        <Box fill>
            <Box justify="center" align="center" margin={{ bottom: "medium" }}>
                <Heading level="3" textAlign="center" color="dark-1" margin={{ bottom: "small" }}>
                    Sort
                </Heading>
                <Text color="dark-3">Sort Pokémon alphabetically or by National Pokédex number!</Text>
            </Box>
            <div className="flex flex-col justify-items-stretch items-center space-y-4">
                {sortChoices.map((sortObj) => {
                    const isActive = currentChoice.direction === sortObj.direction && currentChoice.key === sortObj.key;
                    return (
                        <Button
                            key={sortObj.key + sortObj.direction}
                            primary={isActive}
                            plain={false}
                            onClick={(e) => {
                                e.stopPropagation();
                                setterFn(sortObj);
                            }}
                        >
                            {sortObj.displayText}
                        </Button>
                    );
                })}
            </div>
        </Box>
    );
};

export default Sort;
