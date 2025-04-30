import { reqGetAssetStores } from "@/backend/assetStore";
import { useQuery } from "@tanstack/react-query";

export function useAssetStores(props = {}) {
    const { search, searchQuery } = props;
    const isEnable = search ? searchQuery.length > 0 : true;

    return useQuery({
        enabled: isEnable,
        queryKey: ["asset_stores", props],
        queryFn: async () => {
            const { stores, total, success, message } = await reqGetAssetStores(props);

            if (!success) {
                throw new Error(`Failed to fetch asset stores: ${message}`);
            }

            return { stores, total };
        },
        staleTime: 10000,
    });
}