import secureFetch from "@/actions/secureFetch";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAssetBrands(props = {}) {
    return useQuery({
        queryKey: ["asset_brands", props],
        queryFn: async () => {
            const { sort } = props;

            let ENDPOINT = "api/v1/asset-brand?";
            if (sort) ENDPOINT += `sort=${sort}&`;

            const { brands, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Failed to fetch asset brands: ${message}`);
            }

            return brands;
        },
        staleTime: 10000,
    });
}

export function useAddAssetBrand() {
    return useMutation({
        mutationFn: async function (options) {
            const { success, message } = await secureFetch(`api/v1/asset-brand`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(options),
            });

            if (!success) {
                throw new Error(`Gagal menambah data: ${message}`);
            }
        },
    });
}

export function useUpdateAssetBrand() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            await secureFetch(`api/v1/asset-brand/${_id}`, {
                cache: "no-store",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        },
    });
}

export function useDeleteAssetBrand() {
    return useMutation({
        mutationFn: async function (_id) {
            await secureFetch(`api/v1/asset-brand/${_id}`, {
                method: "DELETE",
                cache: "no-store",
            });
        },
    });
}
