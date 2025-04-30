"use server";

import secureFetch from "../actions/secureFetch";

export async function reqCreateDistributionProgram(options) {
    const { success, message } = await secureFetch(`api/v1/distribution-program`, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });

    if (!success) {
        throw new Error(message);
    }

    return true;
}

export async function reqUpdateDistributionProgram({ _id, data }) {
    return await secureFetch(`api/v1/distribution-program/${_id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function reqGetDistributionPrograms({ page, limit, sort, searchQuery }) {
    let ENDPOINT = "api/v1/distribution-program?";
    if (page) ENDPOINT += `page=${page}&`;
    if (limit) ENDPOINT += `limit=${limit}&`;
    if (sort) ENDPOINT += `sort=${sort}&`;
    if (searchQuery) ENDPOINT += `search=${searchQuery}&`;

    return await secureFetch(ENDPOINT, {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqDeleteDistributionProgram(_id) {
    return await secureFetch(`api/v1/distribution-program/${_id}`, {
        method: "DELETE",
        cache: "no-store",
    });
}
