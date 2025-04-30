"use server";

import secureFetch from "../actions/secureFetch";

/**
 * Adds a new role.
 *
 * @param {Object} options - The options for adding a role.
 * @param {string} options.name - The name of the role.
 * @param {Array} options.permissions - The permissions associated with the role.
 * @param {string} options.description - The description of the role.
 * @returns {Promise} A promise that resolves when the role is added.
 */
export async function reqAddRole(options) {
    return await secureFetch(`api/v1/role`, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
}

/**
 * Retrieves roles from the server.
 * @param {Object} options - The options for the request.
 * @param {number} options.page - The page number to retrieve (default: 1).
 * @param {number} options.limit - The maximum number of roles to retrieve per page (default: 5).
 * @param {string} options.search - The search query to filter roles (default: "").
 * @returns {Promise} - A promise that resolves with the response from the server.
 */
export async function reqGetRoles(options = {}) {
    const { page = 1, limit = 5, fields = "" } = options;
    let ENDPOINT = `api/v1/role?page=${page}`;

    if (limit) {
        ENDPOINT += `&limit=${limit}`;
    }

    if (fields) {
        ENDPOINT += `&fields=${fields}`;
    }

    return await secureFetch(ENDPOINT, {
        cache: "no-store",
        method: "GET",
    });
}

/**
 * Deletes a role by its ID.
 * @param {string} id - The ID of the role to be deleted.
 * @returns {Promise<Response>} - A promise that resolves to the response of the DELETE request.
 */
export async function reqDeleteRole(id) {
    return await secureFetch(`api/v1/role/${id}`, {
        cache: "no-store",
        method: "DELETE",
    });
}

/**
 * Updates a role with the specified ID.
 * @param {string} id - The ID of the role to update.
 * @param {Object} options - The options for the update request.
 * @param {string} options.name - The name of the role.
 * @param {Array} options.permissions - The permissions associated with the role.
 * @param {string} options.description - The description of the role.
 * @returns {Promise<Response>} - A promise that resolves to the response of the update request.
 */
export async function reqUpdateRole(id, options) {
    return await secureFetch(`api/v1/role/${id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
}
