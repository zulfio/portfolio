import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import AssetCategory from "../../database/models/Asset/AssetCategory";
import CategorySchema from "../../lib/validations/AssetCategory";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import {
    getAssetCategories,
    getAssetParentCategories,
    addAssetCategory,
    getAssetCategory,
    deleteAssetCategory,
    updateAssetCategory
} from "../../controllers/asset/assetCategory.controller";

const assetCategoryRoutes = new Hono();

assetCategoryRoutes.get("/", adminProtect(["asset_category_read"]), getAssetCategories);
assetCategoryRoutes.get("/parents", adminProtect(["asset_category_read"]), getAssetParentCategories);
assetCategoryRoutes.post("/", adminProtect(["asset_category_create"]), zValidator("json", CategorySchema), addAssetCategory);

assetCategoryRoutes.use("/:id", adminProtect(), checkDocById("asset_category", AssetCategory));
assetCategoryRoutes.get("/:id", adminProtect(["asset_category_read"]), getAssetCategory);
assetCategoryRoutes.delete("/:id", adminProtect(["asset_category_delete"]), deleteAssetCategory);
assetCategoryRoutes.put("/:id", adminProtect(["asset_category_update"]), updateAssetCategory);

export default assetCategoryRoutes;
