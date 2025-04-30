import { z } from "zod";
import mongoose from 'mongoose'

const AssetCategorySchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    parent: z.preprocess((value) => (value === "" ? null : value), z.union([z.string().refine((value) => mongoose.Types.ObjectId.isValid(value)).optional(), z.null()])),
    description: z.string().max(1000).optional(),
    iconURL: z.string().max(1000).optional(),
});

export default AssetCategorySchema;
