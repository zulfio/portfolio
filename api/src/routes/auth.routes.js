import { Hono } from "hono";

import checkAdminStatus from "./middleware/checkAdminStatus";
import checkAdminExists from "./middleware/checkAdminExists";
import getSiteOptions from "./middleware/getSiteOptions";
import isValidSiteOption from "./middleware/isValidSiteOption";
import { requestOTP, validateOTP, validatePassword } from "../controllers/auth.controller";

const authRoutes = new Hono();

authRoutes.use(checkAdminExists("username"), getSiteOptions);

authRoutes.use("/admin/password/*", isValidSiteOption("admin_login_methods", ["password"]));
authRoutes.use("/admin/password/*", checkAdminStatus);
authRoutes.post("/admin/password/validate", validatePassword);

authRoutes.use("/admin/otp/*", isValidSiteOption("admin_login_methods", ["otp"]));
authRoutes.use("/admin/otp/*", checkAdminStatus);
authRoutes.post("/admin/otp/req", requestOTP);
authRoutes.post("/admin/otp/validate", validateOTP);

export default authRoutes;
