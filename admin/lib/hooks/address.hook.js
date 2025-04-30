import { useQuery } from "@tanstack/react-query";
import { reqGetProvinsi, reqGetKabupatenKota, reqGetKecamatan, reqGetNegara } from "@/backend/cityState";

/**
 * Custom hook to fetch and return sorted province data.
 *
 * @returns {object} Query object containing the provinces data sorted by name.
 *                   The query is enabled by default.
 * @throws Will throw an error if the fetch operation fails.
 */
export function useProvinces() {
    return useQuery({
        queryKey: ["provinces"],
        queryFn: async () => {
            const { status, provinsi } = await reqGetProvinsi();

            if (status !== "ok") {
                throw new Error("Failed to fetch provinces");
            }

            return provinsi.sort((a, b) => a.name.localeCompare(b.name));
        },
        staleTime: 10000,
    });
}

/**
 * Custom hook to fetch and return sorted cities data for a given province.
 *
 * @param {string} provinceId - The ID of the province.
 * @returns {object} Query object containing the cities data sorted by name.
 *                   The query is enabled only if provinceId is provided.
 * @throws Will throw an error if the fetch operation fails.
 */
export function useCities(provinceId) {
    return useQuery({
        enabled: !!provinceId,
        queryKey: ["cities", provinceId],
        queryFn: async () => {
            const { status, kota } = await reqGetKabupatenKota(provinceId);

            if (status !== "ok") {
                throw new Error("Failed to fetch cities");
            }

            return kota.sort((a, b) => a.name.localeCompare(b.name));
        },
        staleTime: 10000,
    });
}

/**
 * Custom hook to fetch and return sorted subdistrict data for a given province and city.
 *
 * @param {string} provinceId - The ID of the province.
 * @param {string} cityId - The ID of the city.
 * @returns {object} Query object containing the subdistrict data sorted by name.
 *                   The query is enabled only if cityId is provided.
 * @throws Will throw an error if the fetch operation fails.
 */
export function useSubdistrict(cityId) {
    return useQuery({
        enabled: !!cityId,
        queryKey: ["cities", cityId],
        queryFn: async () => {
            const { status, kecamatan } = await reqGetKecamatan(cityId);

            if (status !== "ok") {
                throw new Error("Failed to fetch subdistrict");
            }

            return kecamatan.sort((a, b) => a.name.localeCompare(b.name));
        },
        staleTime: 10000,
    });
}

/**
 * Custom hook to fetch and return sorted country data.
 *
 * @returns {object} Query object containing the country data sorted by name.
 *                   The query is enabled by default.
 * @throws Will throw an error if the fetch operation fails.
 */
export function useCountries() {
    return useQuery({
        queryKey: ["countries"],
        queryFn: async () => {
            const { status, negara } = await reqGetNegara();

            if (status !== "ok") {
                throw new Error("Failed to fetch countries");
            }

            return negara.sort((a, b) => a.name.localeCompare(b.name));
        },
        staleTime: 10000,
    });
}