"use server";

import secureFetch from "../actions/secureFetch";

export async function reqAddAssetStore(options) {
    const { success, message } = await secureFetch(`api/v1/asset-store`, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });

    if (!success) {
        throw new Error("Gagal menambah data", message);
    }

    return true;
}

export async function reqUpdateAssetStore({ _id, data }) {
    return await secureFetch(`api/v1/asset-store/${_id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function reqGetAssetStores({ page, limit, sort, searchQuery }) {
    let ENDPOINT = "api/v1/asset-store?";
    if (page) ENDPOINT += `page=${page}&`;
    if (limit) ENDPOINT += `limit=${limit}&`;
    if (sort) ENDPOINT += `sort=${sort}&`;
    if (searchQuery) ENDPOINT += `search=${searchQuery}&`;

    return await secureFetch(ENDPOINT, {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqDeleteAssetStore(_id) {
    return await secureFetch(`api/v1/asset-store/${_id}`, {
        method: "DELETE",
        cache: "no-store",
    });
}
