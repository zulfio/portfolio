"use server";

import secureFetch from "../actions/secureFetch";

export async function reqAddEmployee(options) {
    return await secureFetch(`api/v1/employee`, {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
}

export async function reqUpdateEmployee({ _id, data }) {
    return await secureFetch(`api/v1/employee/${_id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export async function reqGetEmployees({ page, limit, sort, search }) {
    let ENDPOINT = "api/v1/employee?";
    if (page) ENDPOINT += `page=${page}&`;
    if (limit) ENDPOINT += `limit=${limit}&`;
    if (sort) ENDPOINT += `sort=${sort}&`;
    if (search) ENDPOINT += `search=${search}&`;

    return await secureFetch(ENDPOINT, {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqGetPublicEmployees() {
    return await secureFetch("api/v1/employee/public", {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqGetEmployeeById(_id) {
    return await secureFetch(`api/v1/employee/${_id}`, {
        method: "GET",
        cache: "no-store",
    });
}

export async function reqDeleteEmployee(_id) {
    return await secureFetch(`api/v1/employee/${_id}`, {
        method: "DELETE",
        cache: "no-store",
    });
}

export async function reqDeleteEmployees(ids) {
    return await secureFetch(`api/v1/employee/bulk-delete`, {
        method: "DELETE",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
    });
}
