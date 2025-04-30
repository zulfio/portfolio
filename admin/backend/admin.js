"use server";

import secureFetch from "../actions/secureFetch";

/**
 * Sends a request to add a new admin.
 * @param {Object} body - The body for adding a new admin.
 * @param {string} body.name - The name of the admin.
 * @param {string} body.email - The email of the admin.
 * @param {string} body.phoneNumber - The phone number of the admin.
 * @param {string} body.password - The password of the admin.
 * @param {string} body.role - The role of the admin.
 * @returns {Promise<Response>} - A promise that resolves to the response of the request.
 */
export async function reqAddAdmin(body) {
    return secureFetch(`api/v1/admin`, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

/**
 * Retrieves an admin by their ID.
 *
 * @param {string} admin_id - The ID of the admin.
 * @returns {Promise<Response>} - A Promise that resolves to the admin data.
 */
export async function getAdminById(admin_id) {
    return secureFetch(`api/v1/admin/${admin_id}`, {
        cache: "no-store",
        method: "GET",
    });
}

/**
 * Retrieves a list of admins based on the provided options.
 * @param {Object} options - The options for the request.
 * @param {number} options.page - The page number to retrieve (default: 1).
 * @param {number} options.limit - The maximum number of admins to retrieve per page (default: 5).
 * @param {string} options.search - The search query to filter admins by (default: "").
 * @param {string} options.role - The role to filter admins by (default: "").
 * @returns {Promise<Response>} - A promise that resolves to the response of the request.
 */
export async function reqGetAdmins(options = {}) {
    const { page = 1, limit = 5, search = "", role = "" } = options;
    let ENDPOINT = `api/v1/admin?page=${page}`;

    if (limit) {
        ENDPOINT += `&limit=${limit}`;
    }

    if (search) {
        ENDPOINT += `&search=${search}`;
    }

    if (role) {
        ENDPOINT += `&role=${role}`;
    }

    return secureFetch(ENDPOINT, {
        cache: "no-store",
        method: "GET",
    });
}

/**
 * Updates the admin with the specified ID.
 * @param {string} admin_id - The ID of the admin to update.
 * @param {Object} body - The data to update the admin with.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 */
export async function reqUpdateAdmin(admin_id, body) {
    return secureFetch(`api/v1/admin/${admin_id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

/**
 * Deletes an admin by admin ID.
 *
 * @param {string} admin_id - The ID of the admin to be deleted.
 * @returns {Promise<Response>} - A promise that resolves to the response of the delete request.
 */
export async function reqDeleteAdmin(admin_id) {
    return secureFetch(`api/v1/admin/${admin_id}`, {
        cache: "no-store",
        method: "DELETE",
    });
}
