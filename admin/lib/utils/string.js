export function isEmail(data) {
    // eslint-disable-next-line
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        data,
    );
}

export function formatIndonesianCurrency(number = 0) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

export const formatWhatsappNumber = function (number) {
    let formatted = number.replace(/\D/g, "");

    if (!formatted.endsWith("@c.us")) {
        formatted += "@c.us";
    }

    return formatted;
};

export function generateRamdongString({ length = 12, special_chars = true, extra_special_chars = false }) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (special_chars) {
        chars += "!@#$%^&*()";
    }
    if (extra_special_chars) {
        chars += "-_ []{}<>~`+=,.;:/?|";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

const BYTE_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const BIBYTE_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
const BIT_UNITS = ["b", "kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"];
const BIBIT_UNITS = ["b", "kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"];

/*
Formats the given number using `Number#toLocaleString`.
- If locale is a string, the value is expected to be a locale-key (for example: `de`).
- If locale is true, the system default locale is used for translation.
- If no value for locale is specified, the number is returned unmodified.
*/
const toLocaleString = (number, locale, options) => {
    let result = number;
    if (typeof locale === "string" || Array.isArray(locale)) {
        result = number.toLocaleString(locale, options);
    } else if (locale === true || options !== undefined) {
        result = number.toLocaleString(undefined, options);
    }

    return result;
};

export function prettyBytes(number, options) {
    if (!Number.isFinite(number)) {
        return 'invalid number';
    }

    options = {
        bits: false,
        binary: false,
        space: true,
        ...options,
    };

    const UNITS = options.bits
        ? options.binary
            ? BIBIT_UNITS
            : BIT_UNITS
        : options.binary
            ? BIBYTE_UNITS
            : BYTE_UNITS;

    const separator = options.space ? " " : "";

    if (options.signed && number === 0) {
        return ` 0${separator}${UNITS[0]}`;
    }

    const isNegative = number < 0;
    const prefix = isNegative ? "-" : options.signed ? "+" : "";

    if (isNegative) {
        number = -number;
    }

    let localeOptions;

    if (options.minimumFractionDigits !== undefined) {
        localeOptions = { minimumFractionDigits: options.minimumFractionDigits };
    }

    if (options.maximumFractionDigits !== undefined) {
        localeOptions = { maximumFractionDigits: options.maximumFractionDigits, ...localeOptions };
    }

    if (number < 1) {
        const numberString = toLocaleString(number, options.locale, localeOptions);
        return prefix + numberString + separator + UNITS[0];
    }

    const exponent = Math.min(
        Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3),
        UNITS.length - 1
    );
    number /= (options.binary ? 1024 : 1000) ** exponent;

    if (!localeOptions) {
        number = number.toPrecision(3);
    }

    const numberString = toLocaleString(Number(number), options.locale, localeOptions);

    const unit = UNITS[exponent];

    return prefix + numberString + separator + unit;
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} string - The string to be slugified.
 * @returns {string} - The slugified string.
 */
export function slugify(string) { return string.toLowerCase().trim().replace(/\W+/g, "-"); }