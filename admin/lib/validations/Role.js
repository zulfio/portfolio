import { z } from "zod";

const Schema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Please enter a valid role name",
        })
        .max(20),
    description: z.string().max(300).optional(),
    permissions: z.array(z.string().min(1)).nonempty({
        message: "Please select at least one permission",
    }),
});

const DefaultValue = {
    name: "",
    description: "",
    permissions: [],
};

const RoleSchema = {
    Schema,
    DefaultValue,
};

export default RoleSchema;
