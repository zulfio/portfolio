import { Hono } from "hono";
import { createDistributionApplication, deleteDistributionApplication, getDistributionApplication, getDistributionApplications, updateDistributionApplication } from "../../controllers/distribution/distributionApplication.controller";
import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";
import DistributionApplication from "../../database/models/Distribution/DistributionApplication";

const distributionApplicationRoutes = new Hono();

distributionApplicationRoutes.get("/", adminProtect(["distribution_application_read"]), getDistributionApplications);
distributionApplicationRoutes.post("/", createDistributionApplication);

distributionApplicationRoutes.use("/:id", checkDocById("distribution_application", DistributionApplication));
distributionApplicationRoutes.get("/:id", adminProtect(["distribution_application_read"]), getDistributionApplication);
distributionApplicationRoutes.delete("/:id", adminProtect(["distribution_application_delete"]), deleteDistributionApplication);
distributionApplicationRoutes.put(
    "/:id",
    adminProtect(["distribution_application_update"]),
    updateDistributionApplication,
);

export default distributionApplicationRoutes;
