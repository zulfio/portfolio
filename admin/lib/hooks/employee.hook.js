import { reqGetEmployees, reqGetPublicEmployees } from "@/backend/employee";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch employees data.
 *
 * @param {Object} [props={}] - The properties to configure the hook.
 * @param {boolean} [props.search] - Flag to enable search functionality.
 * @param {string} [props.searchQuery] - The search query string.
 * @returns {Object} - The result of the useQuery hook.
 * @throws {Error} - Throws an error if fetching employees fails.
 */
export function useEmployees(props = {}) {
    return useQuery({
        queryKey: ["employees", props],
        queryFn: async () => {
            const { employees, total, success, message } = await reqGetEmployees(props);

            if (!success) {
                throw new Error(`Failed to fetch employees: ${message}`);
            }

            return { employees, total };
        },
        staleTime: 10000,
    });
}

export function usePublicEmployees() {
    return useQuery({
        queryKey: ["employees-public"],
        queryFn: async () => {
            const { employees, success, message } = await reqGetPublicEmployees();

            if (!success) {
                throw new Error(`Failed to fetch employees: ${message}`);
            }

            return employees;
        },
        staleTime: 10000,
    });
}