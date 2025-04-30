import { z } from "zod";

const RoleSchema = z.object({
    name: z.string().min(1).max(20),
    description: z.string().max(300).optional(),
    permissions: z.array(z.string().min(1)).nonempty(),
});

export default RoleSchema;
