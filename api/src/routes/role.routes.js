import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import Role from "../database/models/Auth/Role";
import RoleSchema from "../lib/validations/Role";

import adminProtect from "./middleware/auth/adminProtect";
import checkDocById from "./middleware/checkDocById";

import { getRoles, addRole, deleteRole, updateRole } from "../controllers/role.controller";

const roleRoutes = new Hono();

roleRoutes.get("/", adminProtect(["role_read"]), getRoles);
roleRoutes.post("/", adminProtect(["role_create"]), zValidator("json", RoleSchema), addRole);

roleRoutes.use("/:id", adminProtect(), checkDocById("role", Role));
roleRoutes.delete("/:id", adminProtect(["role_delete"]), deleteRole);
roleRoutes.put("/:id", adminProtect(["role_update"]), updateRole);

export default roleRoutes;
