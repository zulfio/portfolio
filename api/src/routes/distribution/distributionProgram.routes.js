import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import {
    createDistributionProgram,
    deleteDistributionProgram,
    getDistributionProgram,
    getDistributionPrograms,
    updateDistributionProgram
} from "../../controllers/distribution/distributionProgram.controller";
import DistributionProgramSchema from "../../lib/validations/DistributionProgram";
import DistributionProgram from "../../database/models/Distribution/DistributionProgram";


const distributionProgramRoutes = new Hono();

distributionProgramRoutes.get("/", adminProtect(["distribution_program_read"]), getDistributionPrograms);
distributionProgramRoutes.post("/", adminProtect(["distribution_program_create"]), zValidator("json", DistributionProgramSchema), createDistributionProgram,);

distributionProgramRoutes.use("/:id", checkDocById("distribution_program", DistributionProgram));
distributionProgramRoutes.get("/:id", adminProtect(["distribution_program_read"]), getDistributionProgram);
distributionProgramRoutes.delete("/:id", adminProtect(["distribution_program_delete"]), deleteDistributionProgram);
distributionProgramRoutes.put(
    "/:id",
    adminProtect(["distribution_program_update"]),
    updateDistributionProgram,
);

export default distributionProgramRoutes;
