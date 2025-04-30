import { reqGetOptions } from "@/backend/siteOption";
import { useQuery } from "@tanstack/react-query";

export function useOptions() {
    return useQuery({
        queryKey: ["options"],
        queryFn: async () => {
            const { success, message, options } = await reqGetOptions({ withProtected: true });

            if (!success) {
                throw new Error(message);
            }

            return options.reduce((acc, option) => {
                acc[option.name] = option.value;
                return acc;
            }, {});
        },
        staleTime: 10000,
    });
}