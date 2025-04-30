import { z } from "zod";

const Schema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .max(100),
    email: z
        .string()
        .email({
            message: "Please enter a valid email address",
        })
        .max(100),
    phoneNumber: z
        .string()
        .min(7, {
            message: "Please enter a valid phone number",
        })
        .max(15),
    password: z
        .string()
        .min(7, {
            message: "Password must be at least 7 characters long",
        })
        .max(1000)
        .optional(),
    role: z.string().length(24, { message: "Please select a role" }),
});

const DefaultValue = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
};

const AdminSchema = {
    Schema,
    DefaultValue,
};

export default AdminSchema;
