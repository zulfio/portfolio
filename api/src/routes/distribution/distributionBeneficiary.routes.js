import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import { createDistributionBeneficiary, deleteDistributionBeneficiary, getDistributionBeneficiaries, getDistributionBeneficiary, updateDistributionBeneficiary } from "../../controllers/distribution/distributionBeneficiary.controller";
import DistributionBeneficiarySchema from "../../lib/validations/DistributionBeneficiary";
import DistributionBeneficiary from "../../database/models/Distribution/DistributionBeneficiary";


const distributionBeneficiaryRoutes = new Hono();

distributionBeneficiaryRoutes.get("/", adminProtect(["distribution_beneficiary_read"]), getDistributionBeneficiaries);
distributionBeneficiaryRoutes.post("/", adminProtect(["distribution_beneficiary_create"]), zValidator("json", DistributionBeneficiarySchema), createDistributionBeneficiary);

distributionBeneficiaryRoutes.use("/:id", checkDocById("distribution_beneficiary", DistributionBeneficiary));
distributionBeneficiaryRoutes.get("/:id", adminProtect(["distribution_beneficiary_read"]), getDistributionBeneficiary);
distributionBeneficiaryRoutes.delete("/:id", adminProtect(["distribution_beneficiary_delete"]), deleteDistributionBeneficiary);
distributionBeneficiaryRoutes.put(
    "/:id",
    adminProtect(["distribution_beneficiary_update"]),
    updateDistributionBeneficiary
);

export default distributionBeneficiaryRoutes;
