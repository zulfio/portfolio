import secureFetch from "@/actions/secureFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import buildErrorMessage from "../utils/buildErrorMessage";


export function useDistributionApplication(_id) {
    return useQuery({
        queryKey: ["distribution_application", _id],
        queryFn: async () => {
            const { distributionApplication, success, message } = await secureFetch(`api/v1/distribution-application/${_id}`, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data: ${message}`);
            }

            distributionApplication.images = distributionApplication.images.map((image) => {
                return {
                    ...image,
                    url: image.s3Url ?? `${process.env.NEXT_PUBLIC_STATIC_PATH}/${image.path}`
                };
            });

            distributionApplication.videos = distributionApplication.videos.map((video) => {
                return {
                    ...video,
                    url: video.s3Url ?? `${process.env.NEXT_PUBLIC_STATIC_PATH}/${video.path}`
                };
            });

            return distributionApplication;
        },
        enabled: !!_id,
        staleTime: 10000,
    });
}

export function useDistributionApplications(props = {}) {
    return useQuery({
        queryKey: ["distribution_applications", props],
        queryFn: async () => {
            const { page, limit, sort, filterQuery } = props;
            const {
                search,
                provinceId,
                cityId,
                subdistrictId,
                isAccepted
            } = filterQuery;

            let ENDPOINT = "api/v1/distribution-application?";
            if (page) ENDPOINT += `page=${page}&`;
            if (limit) ENDPOINT += `limit=${limit}&`;
            if (sort) ENDPOINT += `sort=${sort}&`;
            if (search) ENDPOINT += `search=${search}&`;
            if (provinceId) ENDPOINT += `province=${provinceId}&`;
            if (cityId) ENDPOINT += `city=${cityId}&`;
            if (subdistrictId) ENDPOINT += `subdistrict=${subdistrictId}&`;
            if (isAccepted) ENDPOINT += `isAccepted=${isAccepted}&`;

            const { distributionApplications, total, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data pengajuan pendistribusian: ${message}`);
            }

            return { distributionApplications, total };
        },
        staleTime: 10000,
    });
}

export function useDeleteDistributionApplication() {
    return useMutation({
        mutationFn: async function (_id) {
            const { success, error, message } = await secureFetch(`api/v1/distribution-application/${_id}`, {
                method: "DELETE",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(buildErrorMessage(error || message));
            }
        }
    });
}

export function useUpdateDistributionApplication() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            const { success, error, message } = await secureFetch(`api/v1/distribution-application/${_id}`, {
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
