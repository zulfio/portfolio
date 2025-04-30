"use server";

import secureFetch from "../actions/secureFetch";

export async function reqCreateDistributionItem(options) {
    const { success, message } = await secureFetch(`api/v1/distribution-item`, {
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

export async function reqUpdateDistributionItem({ _id, data }) {
    return await secureFetch(`api/v1/distribution-item/${_id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function reqGetDistributionItems({ page, limit, sort, searchQuery }) {
    let ENDPOINT = "api/v1/distribution-item?";
    if (page) ENDPOINT += `page=${page}&`;
    if (limit) ENDPOINT += `limit=${limit}&`;
    if (sort) ENDPOINT += `sort=${sort}&`;
    if (searchQuery) ENDPOINT += `search=${searchQuery}&`;

    return await secureFetch(ENDPOINT, {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqDeleteDistributionItem(_id) {
    return await secureFetch(`api/v1/distribution-item/${_id}`, {
        method: "DELETE",
        cache: "no-store",
    });
}
