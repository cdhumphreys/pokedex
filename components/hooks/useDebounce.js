import React, { useState, useEffect } from "react";

// Our hook
export default function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Set debouncedValue to value (passed in) after the specified delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Return a cleanup function that will be called every time
            //  useEffect is re-called. useEffect will only be re-called
            // if value changes
            return () => {
                clearTimeout(handler);
            };
        },
        // Only re-call effect if value changes
        [value]
    );

    return debouncedValue;
}
