import { useState, useEffect } from "react";

export default function useSort(list, initialSortKey, initialSortDirection) {
    // Constants
    const SORT_ASCENDING = "+";
    const SORT_DESCENDING = "-";

    const [sortedList, setSortedList] = useState([...list]);
    const [sortKey, setSortKey] = useState(initialSortKey);
    const [sortDirection, setSortDirection] = useState(initialSortDirection);

    useEffect(() => {
        const sortedList = [...list];

        // Sort ascending or descending by key
        sortedList.sort((a, b) => {
            let sortRank = 0;

            // Rank by fuzzy search score first if exists
            if (a.sortScore && b.sortScore) {
                if (a.sortScore > b.sortScore) {
                    sortRank = 1;
                } else if (a.sortScore < b.sortScore) {
                    sortRank = -1;
                }
            }

            // Then sort by selected criteria
            if (sortRank === 0) {
                if (sortDirection === SORT_ASCENDING) {
                    sortRank = a[sortKey] > b[sortKey] ? 1 : -1;
                } else if (sortDirection === SORT_DESCENDING) {
                    sortRank = a[sortKey] < b[sortKey] ? 1 : -1;
                }
            }

            return sortRank;
        });
        setSortedList(sortedList);
    }, [list, sortKey, sortDirection]);

    return [sortedList, setSortKey, setSortDirection];
}
