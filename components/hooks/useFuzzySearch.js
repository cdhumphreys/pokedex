import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import useDebounce from "./useDebounce";

export default function useFuzzySearch(list, keys, initialQuery, sortObj) {
    // Constants
    const SORT_ASCENDING = "+";
    const SORT_DESCENDING = "-";

    // State
    const [filteredResults, setFilteredResults] = useState(list);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [sort, setSort] = useState(sortObj);

    // Limiting search to every 250ms minimum
    const debouncedSearchTerm = useDebounce(searchTerm, 250);

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

        // Sort ascending or descending by key
        res.sort((a, b) => {
            let sortRank = 0;
            // Rank by search first if exists
            if (debouncedSearchTerm && a.sortScore && b.sortScore) {
                console.log(a.name, a.sortScore);
                console.log(b.name, b.sortScore);
                if (a[sort.sortScore] > b[sort.sortScore]) {
                    sortRank = 1;
                } else if (a[sort.sortScore] < b[sort.sortScore]) {
                    sortRank = -1;
                }
            }

            // Then sort by selected criteria
            if (sortRank === 0) {
                if (sort.direction === SORT_ASCENDING) {
                    sortRank = a[sort.key] < b[sort.key] ? 1 : -1;
                } else if (sort.direction === SORT_DESCENDING) {
                    sortRank = a[sort.key] > b[sort.key] ? 1 : -1;
                }
            }
            return sortRank;
        });

        setFilteredResults(res);
        setIsSearching(false);
    }, [debouncedSearchTerm, sort]);

    return [isSearching, filteredResults, setSearchTerm, setSort];
}
