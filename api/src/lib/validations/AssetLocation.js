import { z } from "zod";

const AssetLocationSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    description: z.string().max(1000).optional(),
    imageURL: z.string().max(1000).optional(),
});

export default AssetLocationSchema;
