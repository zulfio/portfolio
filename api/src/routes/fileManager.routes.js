import { Hono } from "hono";

import adminProtect from "./middleware/auth/adminProtect";
import checkMediaByID from "./middleware/checkMediaByID";
import {
    addMedia,
    deleteMedia,
    getMedia,
    getMediaById,
    getStaticDir,
    updateMedia,
} from "../controllers/fileManager.controller";

const fileManagerRoutes = new Hono();
fileManagerRoutes.get("/static-dir", getStaticDir);

fileManagerRoutes.get("/media", adminProtect(), getMedia);
fileManagerRoutes.post("/media", adminProtect(), addMedia);
fileManagerRoutes.post("/public-media", addMedia);

fileManagerRoutes.use("/media/:id", adminProtect(), checkMediaByID);
fileManagerRoutes.get("/media/:id", getMediaById);
fileManagerRoutes.patch("/media/:id", updateMedia);
fileManagerRoutes.delete("/media/:id", deleteMedia);

export default fileManagerRoutes;
