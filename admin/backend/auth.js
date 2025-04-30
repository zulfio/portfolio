"use server";

const { API_URL } = process.env;

/**
 *
 * @method POST
 * @param {String} username
 * @description Request OTP to server
 *
 * @returns {Promise}
 */
export async function reqOTP(username) {
    const req = await fetch(`${API_URL}/api/v1/auth/admin/otp/req`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
        }),
        cache: "no-store",
    });
    const res = await req.json();

    return res;
}

/**
 * Validates the OTP (One-Time Password) for a given username.
 * @param {Object} options - The options for validating the OTP.
 * @param {string} options.username - The username for which the OTP is being validated.
 * @param {string} options.otp - The OTP to be validated.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 */
export async function reqValidateOTP({ username, otp }) {
    return fetch(`${API_URL}/api/v1/auth/admin/otp/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            otp,
            username,
        }),
        cache: "no-store",
    });
}

/**
 * Validates the password for a given username.
 * @param {Object} params - The parameters for password validation.
 * @param {string} params.username - The username to validate the password for.
 * @param {string} params.password - The password to validate.
 * @returns {Promise<Response>} - A Promise that resolves to the response from the server.
 */
export async function reqValidatePassword({ username, password }) {
    return fetch(`${API_URL}/api/v1/auth/admin/password/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            username,
        }),
        cache: "no-store",
    });
}
