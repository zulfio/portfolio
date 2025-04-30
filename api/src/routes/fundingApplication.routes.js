import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import adminProtect from "./middleware/auth/adminProtect";
import FundingApplicationSchema from "../lib/validations/FundingApplication";
import { createFundingApplication, deleteFundingApplication, getFundingApplication, getFundingApplications, updateFundingApplication } from "../controllers/fundingApplication.controller";
import checkDocById from "./middleware/checkDocById";
import FundingApplication from "../database/models/FundingApplication";


const fundingApplication = new Hono();

fundingApplication.get("/", adminProtect(["funding_application_read"]), getFundingApplications);
fundingApplication.post("/", zValidator("json", FundingApplicationSchema), createFundingApplication);

fundingApplication.use("/:id", checkDocById("funding_application", FundingApplication));
fundingApplication.get("/:id", getFundingApplication);
fundingApplication.delete("/:id", adminProtect(["funding_application_delete"]), deleteFundingApplication);
fundingApplication.put(
    "/:id",
    adminProtect(["funding_application_update"]),
    updateFundingApplication,
);

export default fundingApplication;
