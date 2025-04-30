import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import {
    createAssetLocation,
    deleteAssetLocation,
    getAssetLocation,
    getAssetLocations,
    updateAssetLocation,
} from "../../controllers/asset/assetLocation.controller";
import AssetLocationSchema from "../../lib/validations/AssetLocation";
import AssetLocation from "../../database/models/Asset/AssetLocation";

const assetLocationRoutes = new Hono();

assetLocationRoutes.get("/", adminProtect(["asset_location_read"]), getAssetLocations);
assetLocationRoutes.post(
    "/",
    adminProtect(["asset_location_create"]),
    zValidator("json", AssetLocationSchema),
    createAssetLocation,
);

assetLocationRoutes.use("/:id", adminProtect(), checkDocById("asset_location", AssetLocation));
assetLocationRoutes.get("/:id", adminProtect(["asset_location_read"]), getAssetLocation);
assetLocationRoutes.delete("/:id", adminProtect(["asset_location_delete"]), deleteAssetLocation);
assetLocationRoutes.put(
    "/:id",
    adminProtect(["asset_location_update"]),
    updateAssetLocation,
);

export default assetLocationRoutes;
