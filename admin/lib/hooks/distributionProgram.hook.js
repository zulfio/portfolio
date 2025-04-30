import { reqGetDistributionPrograms } from "@/backend/distributionProgram";
import { useQuery } from "@tanstack/react-query";

export function useDistributionPrograms(props = {}) {
    const { search, searchQuery } = props;
    const isEnable = search ? searchQuery.length > 0 : true;

    return useQuery({
        enabled: isEnable,
        queryKey: ["distribution_programs", props],
        queryFn: async () => {
            const { distributionPrograms, total, success, message } = await reqGetDistributionPrograms(props);

            if (!success) {
                throw new Error(`Gagal mengambil data: ${message}`);
            }

            return { data: distributionPrograms, total };
        },
        staleTime: 10000,
    });
}