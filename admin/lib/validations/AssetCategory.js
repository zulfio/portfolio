import { z } from "zod";

const Schema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    parent: z.preprocess((value) => (value === "" ? null : value), z.union([z.string().optional(), z.null()])),
    description: z.string().max(1000).optional(),
    iconURL: z.string().max(1000).optional(),
});

const DefaultValues = {
    name: "",
    parent: "",
    description: "",
    iconURL: "",
};

const AssetCategorySchema = {
    Schema,
    DefaultValues,
};

export default AssetCategorySchema;
