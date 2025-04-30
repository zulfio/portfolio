import { z } from "zod";

const EmployeeSchema = z.object({
    profile_picture: z.string().max(1000).optional(),
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    gender: z.enum(["laki-laki", "perempuan"]),
    date_of_birth: z.union([z.string(), z.date()]).optional(),
    email: z.string().max(100).optional(),
    phone_number: z.string().max(100).optional(),
    address: z
        .object({
            city: z.string().max(100).optional(),
            province: z.string().max(100).optional(),
            subdistrict: z.string().max(100).optional(),
            complete: z.string().max(100).optional(),
        })
        .optional(),
    signature: z.string().max(1000).optional(),
    nik_number: z.string().max(100).optional(),
    npwp_number: z.string().max(100).optional(),
    other_documents: z.array(z.string().max(1000)).optional(),
    nip: z.string().max(100).optional(),
    position: z.enum(["staff", "manager", "director", "other"]),
    department: z.enum(["laz", "aqiqah", "pesantren", "other"]),
    division: z.enum(["finance", "marcomm", "fundraising", "program", "secretariat", "other"]),
    workplace: z.string().max(100).optional(),
    sallary: z.number().optional(),
    join_at: z.union([z.string(), z.date()]).optional(),
    description: z.string().max(1000).optional(),
});

export default EmployeeSchema;
