import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import adminProtect from "../middleware/auth/adminProtect";
import { createAsset, deleteAsset, deleteAssets, exportAssetQRPDF, getAsset, getAssets, updateAsset } from "../../controllers/asset/asset.controller";
import AssetSchema from "../../lib/validations/Asset";
import Asset from "../../database/models/Asset/Asset";
import checkDocById from "../middleware/checkDocById";

const assetRoutes = new Hono();

assetRoutes.get("/", adminProtect(["asset_read"]), getAssets);
assetRoutes.post("/", adminProtect(["asset_create"]), zValidator("json", AssetSchema), createAsset);
assetRoutes.delete("/bulk-delete", adminProtect(["asset_delete"]), deleteAssets);
assetRoutes.get("/export-qr-pdf", adminProtect(["asset_export"]), exportAssetQRPDF);

assetRoutes.use("/:id", checkDocById("asset", Asset));
assetRoutes.get("/:id", getAsset);
assetRoutes.delete("/:id", adminProtect(["asset_delete"]), deleteAsset);
assetRoutes.put(
    "/:id",
    adminProtect(["asset_update"]),
    updateAsset,
);

export default assetRoutes;
