import secureFetch from "@/actions/secureFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import buildErrorMessage from "../utils/buildErrorMessage";

export function useUpdateAssetCategory() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            const { success, error, message } = await secureFetch(`api/v1/asset-category/${_id}`, {
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

export function useDeleteAssetCategory() {
    return useMutation({
        mutationFn: async function (_id) {
            const { success, error, message } = await secureFetch(`api/v1/asset-category/${_id}`, {
                method: "DELETE",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        },
    });
}

export function useAddAssetCategory() {
    return useMutation({
        mutationFn: async function (data) {
            const { success, error, message } = await secureFetch(`api/v1/asset-category`, {
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

export function useParentsAssetCategory() {
    return useQuery({
        queryKey: ["asset_categories", { parent: true }],
        queryFn: async () => {
            const { categories, success, message } = await secureFetch(`api/v1/asset-category/parents`, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Failed to fetch parent categories: ${message}`);
            }

            return categories;
        },
        staleTime: 10000,
    });
}

export function useAssetCategories() {
    return useQuery({
        queryKey: ["asset_categories"],
        queryFn: async () => {
            const { categories, success, message } = await secureFetch(`api/v1/asset-category`, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Failed to fetch categories: ${message}`);
            }

            return categories;
        },
        staleTime: 10000,
    });
}