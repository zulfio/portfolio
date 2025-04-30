import { z } from "zod";

const Schema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    description: z.string().max(1000).optional(),
    iconURL: z.string().max(1000).optional(),
});

const DefaultValue = {
    name: "",
    description: "",
    iconURL: "",
};

const AssetBrandSchema = {
    Schema,
    DefaultValue,
};

export default AssetBrandSchema;
