import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import useDebounce from "./useDebounce";

export default function useFuzzySearch(list, keys, initialQuery) {
    const [filteredResults, setFilteredResults] = useState(list);
    const [isSearching, setIsSearching] = useState(false);

    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const debouncedSearchTerm = useDebounce(searchTerm, 250);

    useEffect(() => {
        setIsSearching(true);
        const options = {
            includeScore: true,
            keys,
        };

        if (debouncedSearchTerm) {
            const fuse = new Fuse(list, options);

            const results = fuse.search(searchTerm).map((r) => r.item);

            setFilteredResults(results);
        } else {
            setFilteredResults(list);
        }

        setIsSearching(false);
    }, [debouncedSearchTerm]);

    return [isSearching, filteredResults, setSearchTerm];
}
