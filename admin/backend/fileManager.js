"use server";

import secureFetch from "../actions/secureFetch";

/**
 * Get static dirrectory.
 * * @returns {Promise}
 */
export async function reqGetStaticDirrectory() {
    return await secureFetch(`api/v1/fileManager/static-dir`, {
        cache: "no-store",
    });
}

/**
 * Add media.
 *
 * @param {FormData} body - The FormData containing author id and files.
 * @returns {Promise} - A promise that resolves to the response from the server.
 */
export async function reqAddMedia(body) {
    return await secureFetch(`api/v1/fileManager/media`, {
        method: "POST",
        body,
    });
}

/**
 * Retrieves media files from the file manager API.
 *
 * @param {Object} options - The options for the media retrieval.
 * @param {number} options.page - The page number to retrieve (default: 1).
 * @param {number} options.limit - The maximum number of items per page (default: 5).
 * @param {string} options.type - The type of media to retrieve (default: "*").
 * @param {string} options.date - The date filter for the media (default: "*").
 * @returns {Promise} - A promise that resolves with the retrieved media.
 */
export async function reqGetMedia({ page = 1, limit = 5, type = "", date = "", search = "" }) {
    return await secureFetch(
        `api/v1/fileManager/media?page=${page}&limit=${limit}&type=${type}&date=${date}&search=${search}`,
        {
            cache: "no-store",
        },
    );
}

/**
 * Updates the metadata of a media file.
 * @param {Object} options - The options for updating the media file.
 * @param {string} options.id - The ID of the media file.
 * @param {Object} options.meta - The updated metadata for the media file.
 * @returns {Promise} A promise that resolves with the updated media file.
 */
export async function reqUpdateMedia(id, value) {
    return await secureFetch(`api/v1/fileManager/media/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ meta: value }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function reqDeleteMedia(id) {
    return await secureFetch(`api/v1/fileManager/media/${id}`, {
        method: "DELETE",
    });
}
