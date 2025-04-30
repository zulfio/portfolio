/**
 * Formats a given phone number to WhatsApp format.
 *
 * This function removes all non-digit characters from the input number
 * and appends "@c.us" if it is not already present at the end.
 *
 * @param {string} number - The phone number to format.
 * @returns {string} - The formatted phone number in WhatsApp format.
 */
export function toWhatsAppFormat(number) {
    let formatted = number.replace(/\D/g, "");

    if (!formatted.endsWith("@c.us")) {
        formatted += "@c.us";
    }

    return formatted;
}

/**
 * Filters an object by a given array of keys, returning a new object with only the specified keys.
 *
 * @param {Object} object - The source object to filter.
 * @param {Array<string>} keys - An array of keys to retain in the filtered object.
 * @returns {Object} A new object containing only the specified keys from the source object.
 */
export function filterObject(object, keys) {
    return keys.reduce((acc, key) => {
        if (object[key] !== undefined) {
            acc[key] = object[key];
        }

        return acc;
    }, {});
}

/**
 * Converts a given number to its Roman numeral representation.
 *
 * @param {number} num - The number to be converted to Roman numeral.
 * @returns {string|NaN} The Roman numeral representation of the number, or NaN if the input is not a number.
 */
export function numberToRoman(num) {
    if (isNaN(num)) return NaN;
    var digits = String(+num).split(""),
        key = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ],
        roman = "",
        i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export default { toWhatsAppFormat, filterObject };
