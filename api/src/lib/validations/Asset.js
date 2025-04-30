import { z } from "zod";

const AssetSchema = z.object({
    author: z.string().min(1).max(100),
    location: z.string().min(1).max(100),
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    category: z.string().max(100).optional(),
    sub_category: z.string().max(100).optional(),
    brand: z.string().max(100).optional(),
    type: z.string().optional(),
    manufacturer: z.string().optional(),
    serial_number: z.string().optional(),
    production_year: z.number().optional(),
    purchase_date: z.string().optional(),
    store: z.string().optional(),
    invoice_number: z.string().optional(),
    total_units: z.number().min(1),
    price_per_unit: z.number().optional(),
    economic_life: z.number().optional(),
    image: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    description: z.string().optional(),
    additionalInfo: z.string().optional(),
});

export default AssetSchema;
