import { z } from "zod";

const AssetBrandSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    description: z.string().max(1000).optional(),
    iconURL: z.string().max(1000).optional(),
});

export default AssetBrandSchema;
