import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import {
    addAssetBrand,
    deleteAssetBrand,
    getAssetBrand,
    getAssetBrands,
    updateAssetBrand,
} from "../../controllers/asset/assetBrand.controller";
import AssetBrandSchema from "../../lib/validations/AssetBrand";
import AssetBrand from "../../database/models/Asset/AssetBrand";

const assetBrandRoutes = new Hono();

assetBrandRoutes.get("/", adminProtect(["asset_brand_read"]), getAssetBrands);
assetBrandRoutes.post("/", adminProtect(["asset_brand_create"]), zValidator("json", AssetBrandSchema), addAssetBrand);

assetBrandRoutes.use("/:id", adminProtect(), checkDocById("asset_brand", AssetBrand));
assetBrandRoutes.get("/:id", adminProtect(["asset_brand_read"]), getAssetBrand);
assetBrandRoutes.delete("/:id", adminProtect(["asset_brand_delete"]), deleteAssetBrand);
assetBrandRoutes.put(
    "/:id",
    adminProtect(["asset_brand_update"]),
    updateAssetBrand,
);

export default assetBrandRoutes;
