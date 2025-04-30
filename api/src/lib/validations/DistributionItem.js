import { z } from "zod";

const DistributionItemSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(255),
    unit: z
        .string()
        .min(1, {
            message: "Unit is required",
        })
        .max(255),
});

export default DistributionItemSchema;
