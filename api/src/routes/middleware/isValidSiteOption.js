// how we call this middleware? like this authRoutes.use("/admin/otp/*", validSiteOption("admin_login_methods", ["otp"]));

/**
 * Validates the site option based on the provided option name and value.
 * @param {string} optionName - The name of the option to validate.
 * @param {*} value - The value to validate against the option.
 * @returns {Function} - The middleware function that performs the validation.
 */
const isValidSiteOption = (optionName, value) => async (context, next) => {
    try {
        const siteOptions = context.get("siteOptions");
        const currentOption = siteOptions[optionName];

        const isTypeMatch = typeof currentOption === typeof value;
        const isStringMatch = typeof currentOption === "string" && currentOption === value;
        const areArrayValuesValid = Array.isArray(currentOption) && value.every((val) => currentOption.includes(val));

        if (
            !currentOption ||
            !isTypeMatch ||
            (typeof currentOption === "string" && !isStringMatch) ||
            (Array.isArray(currentOption) && !areArrayValuesValid)
        ) {
            throw new Error();
        }

        await next();
    } catch (error) {
        return context.json(
            {
                success: false,
                message: "Access denied",
            },
            403
        );
    }
};

export default isValidSiteOption;
