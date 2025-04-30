import { z } from "zod";

const AssetStoreSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    address: z.string().max(1000).optional(),
    phoneNumber: z.string().max(20).optional(),
    email: z.string().max(100).optional(),
    officerName: z.string().max(100).optional(),
    description: z.string().max(1000).optional(),
    iconURL: z.string().max(1000).optional(),
});

export default AssetStoreSchema;
