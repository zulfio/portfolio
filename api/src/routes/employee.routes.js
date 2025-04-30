import { Hono } from "hono";
import { validator } from "hono/validator";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "./middleware/auth/adminProtect";
import checkDocById from "./middleware/checkDocById";

import {
    addEmployee,
    deleteEmployee,
    deleteEmployees,
    getEmployee,
    getEmployees,
    getPublicDataEmployees,
    updateEmployee,
} from "../controllers/employee.controller";
import EmployeeSchema from "../lib/validations/Employee";
import Employee from "../database/models/Employee";

const employeeRoutes = new Hono();

employeeRoutes.get("/", adminProtect(["employee_read"]), getEmployees);
employeeRoutes.post("/", adminProtect(["employee_create"]), zValidator("json", EmployeeSchema), addEmployee);
employeeRoutes.delete("/bulk-delete", adminProtect(["employee_delete"]), deleteEmployees);
employeeRoutes.get("/public", getPublicDataEmployees);

employeeRoutes.use("/:id", adminProtect(), checkDocById("employee", Employee));
employeeRoutes.get("/:id", adminProtect(["employee_read"]), getEmployee);
employeeRoutes.delete("/:id", adminProtect(["employee_delete"]), deleteEmployee);
employeeRoutes.put(
    "/:id",
    adminProtect(["employee_update"]),
    updateEmployee,
);

export default employeeRoutes;
