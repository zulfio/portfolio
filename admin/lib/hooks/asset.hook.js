import secureFetch from "@/actions/secureFetch";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import buildErrorMessage from "../utils/buildErrorMessage";

export function useAssets(props = {}) {
    return useQuery({
        queryKey: ["assets", props],
        queryFn: async () => {
            const { page, limit, sort, filterQuery } = props;
            const {
                search,
                category,
                sub_category,
                brand,
                location
            } = filterQuery;

            let ENDPOINT = "api/v1/asset?";
            if (page) ENDPOINT += `page=${page}&`;
            if (limit) ENDPOINT += `limit=${limit}&`;
            if (sort) ENDPOINT += `sort=${sort}&`;
            if (search) ENDPOINT += `search=${search}&`;
            if (category) ENDPOINT += `category=${category}&`;
            if (sub_category) ENDPOINT += `sub_category=${sub_category}&`;
            if (brand) ENDPOINT += `brand=${brand}&`;
            if (location) ENDPOINT += `location=${location}&`;

            const { assets, total, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data asset: ${message}`);
            }

            return { assets, total };
        },
        staleTime: 10000,
    });
}

export function useInfiniteAssets(props = {}) {
    return useInfiniteQuery({
        queryKey: ["infinite-assets", props],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const { limit, sort, search, category, sub_category } = props;

            let ENDPOINT = "api/v1/asset?";
            if (pageParam) ENDPOINT += `page=${pageParam}&`;
            if (limit) ENDPOINT += `limit=${limit}&`;
            if (sort) ENDPOINT += `sort=${sort}&`;
            if (search) ENDPOINT += `search=${search}&`;
            if (category) ENDPOINT += `category=${category}&`;
            if (sub_category) ENDPOINT += `sub_category=${sub_category}&`;

            const { assets, total, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data asset: ${message}`);
            }

            return { assets, total };
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => { // eslint-disable-line no-unused-vars
            if (lastPageParam * props.limit >= lastPage.total) {
                return undefined;
            }

            return lastPageParam + 1;
        },
        staleTime: 10000,
    });
}

export function useAsset(id, query = {}) {
    return useQuery({
        queryKey: ["asset", id],
        queryFn: async () => {
            const ENDPOINT = `api/v1/asset/${id}?${new URLSearchParams(query)}`;
            const { asset, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data asset: ${message}`);
            }

            return asset;
        },
        enabled: !!id,
        staleTime: 10000,
    });
}

export function useAddAsset() {
    return useMutation({
        mutationFn: async function (data) {
            data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v)); // eslint-disable-line no-unused-vars

            const { success, error, message } = await secureFetch(`api/v1/asset`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        },
    });
}

export function useUpdateAsset() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            const { success, error, message } = await secureFetch(`api/v1/asset/${_id}`, {
                cache: "no-store",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        },
    });
}

export function useDeleteAssets() {
    return useMutation({
        mutationFn: async function (ids) {
            const { success, error, message } = await secureFetch(`api/v1/asset/bulk-delete`, {
                method: "DELETE",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids }),
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        }
    });
}