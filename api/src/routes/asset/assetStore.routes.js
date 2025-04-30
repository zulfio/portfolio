import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import adminProtect from "../middleware/auth/adminProtect";
import checkDocById from "../middleware/checkDocById";

import {
    addAssetStore,
    deleteAssetStore,
    getAssetStore,
    getAssetStores,
    updateAssetStore,
} from "../../controllers/asset/assetStore.controller";
import AssetStoreSchema from "../../lib/validations/AssetStore";
import AssetStore from "../../database/models/Asset/AssetStore";

const assetStoreRoutes = new Hono();

assetStoreRoutes.get("/", adminProtect(["asset_store_read"]), getAssetStores);
assetStoreRoutes.post("/", adminProtect(["asset_store_create"]), zValidator("json", AssetStoreSchema), addAssetStore);

assetStoreRoutes.use("/:id", adminProtect(), checkDocById("asset_store", AssetStore));
assetStoreRoutes.get("/:id", adminProtect(["asset_store_read"]), getAssetStore);
assetStoreRoutes.delete("/:id", adminProtect(["asset_store_delete"]), deleteAssetStore);
assetStoreRoutes.put(
    "/:id",
    adminProtect(["asset_store_update"]),
    updateAssetStore,
);

export default assetStoreRoutes;
