import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import { createDistributionItem, deleteDistributionItem, getDistributionItem, getDistributionItems, updateDistributionItem } from "../../controllers/distribution/distributionItem.controller";
import DistributionItemSchema from "../../lib/validations/DistributionItem";
import DistributionItem from "../../database/models/Distribution/DistributionItem";


const distributionItemRoutes = new Hono();

distributionItemRoutes.get("/", adminProtect(["distribution_item_read"]), getDistributionItems);
distributionItemRoutes.post("/", adminProtect(["distribution_item_create"]), zValidator("json", DistributionItemSchema), createDistributionItem);

distributionItemRoutes.use("/:id", checkDocById("distribution_item", DistributionItem));
distributionItemRoutes.get("/:id", adminProtect(["distribution_item_read"]), getDistributionItem);
distributionItemRoutes.delete("/:id", adminProtect(["distribution_item_delete"]), deleteDistributionItem);
distributionItemRoutes.put(
    "/:id",
    adminProtect(["distribution_item_update"]),
    updateDistributionItem,
);

export default distributionItemRoutes;
