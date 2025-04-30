import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { addAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin } from "../controllers/admin.controller";

import AdminSchema from "../lib/validations/Admin";
import adminProtect from "./middleware/auth/adminProtect";
import checkAdminExists from "./middleware/checkAdminExists";

const adminRoutes = new Hono();

adminRoutes.get("/", adminProtect(["admin_read"]), getAdmins);
adminRoutes.post("/", adminProtect(["admin_create"]), zValidator("json", AdminSchema), addAdmin);

adminRoutes.use("/:id", adminProtect(), checkAdminExists("id"));
adminRoutes.get("/:id", adminProtect(["admin_read"]), getAdminById);
adminRoutes.put("/:id", adminProtect(["admin_update"]), zValidator("json", AdminSchema), updateAdmin);
adminRoutes.delete("/:id", adminProtect(["admin_delete"]), deleteAdmin);

export default adminRoutes;
