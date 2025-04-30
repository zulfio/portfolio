import { z } from "zod";

const SiteOptionSchema = z.object({
    site_title: z.string().min(1),
    site_description: z.string().min(1),
    allow_registration: z.boolean().optional(),
    user_login_methods: z.array(z.string(), {
        message: "Please select a user login method",
    }),
    admin_login_methods: z.array(z.string(), {
        message: "Please select an admin login method",
    }),
    email: z.object({
        fromName: z.string().min(1, {
            message: "Please enter a sender name",
        }),
        fromEmail: z.string().email({
            message: "Please enter a valid sender email",
        }),
        host: z.string().min(1, {
            message: "Please enter an email host",
        }),
        port: z.string().min(1, {
            message: "Please enter an email port",
        }),
        security: z.enum(["none", "tls", "ssl"], {
            message: "Please select an email security",
        }),
        withAuth: z.boolean(),
        username: z.string().optional(),
        password: z.string().optional(),
    }),
    twilio: z.object({
        accountSid: z.string().optional(),
        authToken: z.string().optional(),
        from: z.string().optional(),
    }),
});

export default SiteOptionSchema;
