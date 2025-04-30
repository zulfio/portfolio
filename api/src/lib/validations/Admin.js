import { z } from "zod";

const AdminSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().max(100).optional(),
    phoneNumber: z.string().min(7).max(15).optional(),
    password: z.string().min(7).max(1000).optional(),
    role: z.string().length(24, { message: "Please select a role" }).optional(),
});

export default AdminSchema;
