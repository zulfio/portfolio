"use server";

import secureFetch from "../actions/secureFetch";

export async function reqAddOptions(options) {
    return await secureFetch(`api/v1/option`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
}

export async function reqGetOptions({ fields = [], withProtected = false }) {
    let ENDPOINT = `api/v1/option${withProtected ? "/admin" : ""}`;
    ENDPOINT += fields.length ? `?fields=${fields.join(",")}` : "";

    return await secureFetch(ENDPOINT, {
        cache: "no-store",
    });
}
