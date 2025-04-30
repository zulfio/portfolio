import { z } from "zod";

const Schema = z.object({
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

const DefaultValue = {
    name: "",
    unit: "",
};

const DistributionItemSchema = {
    Schema,
    DefaultValue,
};

export default DistributionItemSchema;
