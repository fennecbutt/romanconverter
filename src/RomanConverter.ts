const symbolsByPlace = [
    "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
];

const symbolsByValue = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

export class RomanConverter {
    ArabicToRoman(input: string) {
        /**
         * For each of the 1s, 10s and 100s places, we can use a precalculated map of symbols for the values
         */
        let digits = input.split('').map(n => Number(n)), place = 3, output = '';
        while (place-- && digits.length) {
            output = symbolsByPlace[digits.pop()! + (place * 10)] + output;
        }
        // For the 1000s place, only 1 symbol M is used, so we just repeat M for all 1000s place and beyond
        return 'M'.repeat(parseInt(digits.join(''), 10)) + output;
    }

    RomanToArabic(input: string) {
        let symbols = input.split(''), total = 0, prev = null;
        while (symbols.length) {
            let value = symbolsByValue[symbols.pop()!];
            if (prev && value < prev) {
                value = -value;
            }
            prev = value;
            total += value || 0;
        }
        return total.toString();
    }
}