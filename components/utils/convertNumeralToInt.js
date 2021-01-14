export default function convertNumeralToInt(numeral) {
    const numeralMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    const number = [...numeral].reduce((total, character, i, arr) => {
        if (i > 0 && numeralMap[character] > numeralMap[arr[i - 1]]) {
            total += numeralMap[character] - 2 * numeralMap[arr[i - 1]];
        } else {
            total += numeralMap[character];
        }
        return total;
    }, 0);

    return number;
}
