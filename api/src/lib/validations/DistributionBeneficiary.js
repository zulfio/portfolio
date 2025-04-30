import { z } from "zod";

const AddressSchema = z.object({
    complete: z.string().max(255).default(""),
    city: z.string().max(100).default(""),
    province: z.string().max(100).default(""),
    subdistrict: z.string().max(100).default(""),
    country: z.string().max(100).default("")
});

const DistributionBeneficiarySchema = z.object({
    type: z.enum(["individual", "organization"], {
        required_error: "Type is required"
    }),
    nik: z.string().max(255).optional(),
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(255),
    gender: z.enum(["male", "female", "other"])
        .default("other"),
    phoneNumber: z.string().max(20).optional(),
    address: AddressSchema
});

export default DistributionBeneficiarySchema;
