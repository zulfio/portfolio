import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import SiteOptionSchema from "../lib/validations/SiteOption";
import { getOptions, updateOptions } from "../controllers/siteOption.controller";
import adminProtect from "./middleware/auth/adminProtect";

const optionRoutes = new Hono();

optionRoutes.get(
    "/",
    async (c, next) => {
        c.set("isPublic", true);
        await next();
    },
    getOptions
);

optionRoutes.get("/admin", adminProtect(["option_read"]), getOptions);
optionRoutes.put("/", adminProtect(["option_update"]), updateOptions);

export default optionRoutes;
