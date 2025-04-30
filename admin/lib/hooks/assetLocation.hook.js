import secureFetch from "@/actions/secureFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import buildErrorMessage from "../utils/buildErrorMessage";

export function useAssetLocations(props = {}) {
    const { sort, search, searchQuery } = props;
    const isEnable = search ? searchQuery.length > 0 : true;

    return useQuery({
        enabled: isEnable,
        queryKey: ["asset_locations", props],
        queryFn: async () => {
            let ENDPOINT = "api/v1/asset-location?";
            if (sort) ENDPOINT += `sort=${sort}&`;
            if (search) ENDPOINT += `search=${searchQuery}&`;

            const { locations, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Failed to fetch asset locations: ${message}`);
            }

            return locations;
        },
        staleTime: 10000,
    });
}

export function useAddAssetLocation() {
    return useMutation({
        mutationFn: async function (options) {
            const { success, error, message } = await secureFetch(`api/v1/asset-location`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(options),
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        },
    });
}

export function useUpdateAssetLocation() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            const { success, error, message } = await secureFetch(`api/v1/asset-location/${_id}`, {
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
        }
    });
}

export function useDeleteAssetLocation() {
    return useMutation({
        mutationFn: async function (_id) {
            const { success, error, message } = await secureFetch(`api/v1/asset-location/${_id}`, {
                method: "DELETE",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        }
    });
}