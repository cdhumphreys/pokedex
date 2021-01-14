export default function findClosest(values, currentValue) {
    const { index: closestIndex } = values.reduce((acc, value, index) => {
        const distance = Math.abs(currentValue - value);

        if (acc === null || distance < acc.distance || distance === acc.distance) {
            return {
                distance,
                index,
            };
        }

        return acc;
    }, null);
    return closestIndex;
}
