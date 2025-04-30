import { z } from "zod";

const Schema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(255),
    type: z
        .string()
        .min(1, {
            message: "Type is required",
        })
        .max(255),
    description: z.string().max(1000).optional(),
});

const DefaultValue = {
    name: "",
    type: "",
    description: "",
};

const DistributionProgramSchema = {
    Schema,
    DefaultValue,
};

export default DistributionProgramSchema;
