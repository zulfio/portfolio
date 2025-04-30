import secureFetch from "@/actions/secureFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import buildErrorMessage from "../utils/buildErrorMessage";

/**
 * Mengambil data pengajuan dana berdasarkan _id
 *
 * @param {string} _id _id pengajuan dana
 * @returns {Promise<import("../database/models/FundingApplication").FundingApplicationDocument>} data pengajuan dana
 * @throws {Error} jika gagal mengambil data pengajuan
 */
export function useFundingApplication(_id) {
    return useQuery({
        queryKey: ["funding-application", _id],
        queryFn: async () => {
            const { fundingApplication, success, message } = await secureFetch(`api/v1/funding-application/${_id}`, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data pengajuan: ${message}`);
            }

            return fundingApplication;
        },
        enabled: !!_id,
        staleTime: 10000,
    });
}

/**
 * Mengambil data pengajuan dana berdasarkan kriteria filter
 *
 * @param {Object} props kriteria filter
 * @param {number} [props.page=1] nomor halaman
 * @param {number} [props.limit=10] limit data tiap halaman
 * @param {string} [props.sort="-createdAt"] cara sorting data
 * @param {Object} [props.filterQuery] kriteria filter
 * @param {string} [props.filterQuery.search] kata kunci pencarian
 * @param {string} [props.filterQuery.employeeId] ID pegawai
 * @param {string} [props.filterQuery.program] program pengajuan
 * @param {string} [props.filterQuery.paymentMethod] metode pembayaran
 * @returns {Promise<{fundingApplications: import("../database/models/FundingApplication").FundingApplicationDocument[], total: number}>} data pengajuan dana dan total data
 * @throws {Error} jika gagal mengambil data pengajuan
 */
export function useFundingApplications(props = {}) {
    return useQuery({
        queryKey: ["funding-applications", props],
        queryFn: async () => {
            const { page, limit, sort, filterQuery } = props;
            const {
                search,
                employeeId,
                program,
                paymentMethod,
                isAccepted
            } = filterQuery;

            let ENDPOINT = "api/v1/funding-application?";
            if (page) ENDPOINT += `page=${page}&`;
            if (limit) ENDPOINT += `limit=${limit}&`;
            if (sort) ENDPOINT += `sort=${sort}&`;
            if (search) ENDPOINT += `search=${search}&`;
            if (employeeId) ENDPOINT += `employee=${employeeId}&`;
            if (program) ENDPOINT += `program=${program}&`;
            if (paymentMethod) ENDPOINT += `paymentMethod=${paymentMethod}&`;
            if (isAccepted !== undefined) ENDPOINT += `isAccepted=${isAccepted}&`;

            const { fundingApplications, total, success, message } = await secureFetch(ENDPOINT, {
                method: "GET",
                cache: "no-store",
            });

            if (!success) {
                throw new Error(`Gagal mengambil data asset: ${message}`);
            }

            return { fundingApplications, total };
        },
        staleTime: 10000,
    });
}

/**
 * Hook to update a funding application by _id.
 *
 * @returns {Mutation} A mutation object with methods and state for managing the update operation.
 * @throws {Error} If the update operation fails.
 * @param {Object} params - Parameters for the mutation function.
 * @param {string} params._id - The ID of the funding application to update.
 * @param {Object} params.data - The data to update the funding application with.
 */
export function useUpdateFundingApplication() {
    return useMutation({
        mutationFn: async function ({ _id, data }) {
            const { success, error, message } = await secureFetch(`api/v1/funding-application/${_id}`, {
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

// export function useInfiniteAssets(props = {}) {
//     return useInfiniteQuery({
//         queryKey: ["infinite-assets", props],
//         initialPageParam: 1,
//         queryFn: async ({ pageParam }) => {
//             const { limit, sort, search, category, sub_category } = props;

//             let ENDPOINT = "api/v1/asset?";
//             if (pageParam) ENDPOINT += `page=${pageParam}&`;
//             if (limit) ENDPOINT += `limit=${limit}&`;
//             if (sort) ENDPOINT += `sort=${sort}&`;
//             if (search) ENDPOINT += `search=${search}&`;
//             if (category) ENDPOINT += `category=${category}&`;
//             if (sub_category) ENDPOINT += `sub_category=${sub_category}&`;

//             const { assets, total, success, message } = await secureFetch(ENDPOINT, {
//                 method: "GET",
//                 cache: "no-store",
//             });

//             if (!success) {
//                 throw new Error(`Gagal mengambil data asset: ${message}`);
//             }

//             return { assets, total };
//         },
//         getNextPageParam: (lastPage, allPages, lastPageParam) => { // eslint-disable-line no-unused-vars
//             if (lastPageParam * props.limit >= lastPage.total) {
//                 return undefined;
//             }

//             return lastPageParam + 1;
//         },
//         staleTime: 10000,
//     });
// }

// export function useAsset(id, query = {}) {
//     return useQuery({
//         queryKey: ["asset", id],
//         queryFn: async () => {
//             const ENDPOINT = `api/v1/asset/${id}?${new URLSearchParams(query)}`;
//             const { asset, success, message } = await secureFetch(ENDPOINT, {
//                 method: "GET",
//                 cache: "no-store",
//             });

//             if (!success) {
//                 throw new Error(`Gagal mengambil data asset: ${message}`);
//             }

//             await new Promise((resolve) => setTimeout(resolve, 1000));

//             return asset;
//         },
//         enabled: !!id,
//         staleTime: 10000,
//     });
// }

// export function useAddAsset() {
//     return useMutation({
//         mutationFn: async function (data) {
//             data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v)); // eslint-disable-line no-unused-vars

//             const { success, error, message } = await secureFetch(`api/v1/asset`, {
//                 cache: "no-store",
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!success) {
//                 throw new Error(buildErrorMessage(error || message));
//             }
//         },
//     });
// }



// export function useDeleteAssets() {
//     return useMutation({
//         mutationFn: async function (ids) {
//             const { success, error, message } = await secureFetch(`api/v1/asset/bulk-delete`, {
//                 method: "DELETE",
//                 cache: "no-store",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ ids }),
//             });

//             if (!success) {
//                 throw new Error(buildErrorMessage(error || message));
//             }
//         }
//     });
// }