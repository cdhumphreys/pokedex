import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import useDebounce from "./useDebounce";

export default function useFuzzySearch(list, keys, initialQuery, minimumTimeout) {
    const minTimeout = minimumTimeout || 250;

    // State
    const [filteredResults, setFilteredResults] = useState(list);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    // Limiting search to every 250ms minimum
    const debouncedSearchTerm = useDebounce(searchTerm, minTimeout);

    useEffect(() => {
        let res = [];
        setIsSearching(true);
        const options = {
            includeScore: true,
            keys,
        };

        if (debouncedSearchTerm) {
            // Fuzzy search
            const fuse = new Fuse(list, options);
            res = fuse.search(searchTerm).map((r) => {
                return { ...r.item, sortScore: r.score };
            });
        } else {
            // Full list
            res = list;
        }

        setFilteredResults(res);
        setIsSearching(false);
    }, [debouncedSearchTerm, list]);

    return [isSearching, filteredResults, setSearchTerm];
}
