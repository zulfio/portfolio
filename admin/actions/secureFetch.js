"use server";

const { API_URL } = process.env;

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ROUTES from "@/config/ROUTES";


/**
 * @description Run on the server. Extended NextJS fetch with authorization header.
 * @param {String} url
 * @param {Object} options
 * @returns {Promise} Response object
 */
const secureFetch = async (url, options) => {
    const session = await getServerSession(authOptions);

    const req = await fetch(`${API_URL}/${url}`, {
        ...options,
        headers: {
            ...options?.headers,
            ...(session && { Authorization: `Bearer ${session.user?.token}` }),
        },
    });
    const res = await req.json();

    if (req.status === 401) {
        redirect(`${ROUTES.SIGN_OUT}/unauthorized`);
    }

    if (req.status === 403) {
        redirect(`${ROUTES.SIGN_OUT}/forbidden`);
    }

    return res;
};

export default secureFetch;
