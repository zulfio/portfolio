import { UPLOAD_MAX_SIZE, STATIC_PATH } from "../config/index.js";
import Media from "../database/models/Media";
import FilterAPI from "../lib/utils/database/FilterAPI";
import handleFileUpload from "../lib/utils/file/handleFileUpload";
import { unlink } from "node:fs/promises";
import { existsSync, mkdirSync } from "fs";
import getDirectories from "../lib/utils/file/getDirectories";
import logger from "../lib/utils/logger";

export function getStaticDir(c) {
    if (!existsSync(STATIC_PATH)) {
        mkdirSync(STATIC_PATH, { recursive: true });
    }

    const directories = getDirectories(STATIC_PATH)
        .filter((item) => item.split("/").length === 2)
        .sort();

    return c.json({
        success: true,
        directories,
    });
}

export async function getMedia(c) {
    try {
        const query = c.req.query();
        const totalQuery = {};

        const loggedInAdmin = c.get("loggedInAdmin");
        query.author = loggedInAdmin._id;
        totalQuery.author = loggedInAdmin._id;

        for (const key in query) {
            if (query[key] === "") {
                delete query[key];
            }
        }

        if (query.type) {
            query.type =
                query.type === "document" ? { $not: /^video|^image|^audio/ } : { $regex: query.type, $options: "i" };

            totalQuery.type = query.type;
        }

        if (query.date) {
            query.path = {
                $regex: `^${query.date}`,
                $options: "i",
            };
            totalQuery.path = query.path;
        }
        delete query.date;

        if (query.search) {
            query.fileName = {
                $regex: query.search,
                $options: "i",
            };
            totalQuery.fileName = query.fileName;
        }
        delete query.search;

        const media = await new FilterAPI(Media, query).get().pagination().populate("author", "name -_id").data;
        const total = await Media.countDocuments(totalQuery);

        return c.json({
            success: true,
            media,
            total,
        });
    } catch (error) {
        logger.error(`Error: ${error.message} - ${error.stack}`);
        return c.json(
            {
                success: false,
                message: "Error while fetching media",
            },
            500,
        );
    }
}

export async function getMediaById(c) {
    let media = c.get("media");

    return c.json({
        success: true,
        media,
    });
}

export async function addMedia(c) {
    const admin = c.get("loggedInAdmin") || {};

    const body = await c.req.parseBody({ all: true });
    let filesStatus = await handleFileUpload({
        files: body.files,
        maxFileSize: UPLOAD_MAX_SIZE,
    });

    const successFiles = filesStatus
        .filter((file) => file.success)
        .map((file) => ({
            ...file,
            author: admin._id,
        }));
    const failedFiles = filesStatus.filter((file) => !file.success);

    const media = await Media.insertMany(successFiles);

    return c.json({
        success: true,
        media,
        failed: failedFiles,
    });
}

export async function updateMedia(c) {
    const body = await c.req.json();
    const id = c.req.param("id");

    const updatedMedia = await Media.findByIdAndUpdate(
        id,
        {
            meta: body.meta,
        },
        {
            new: true,
        },
    );

    return c.json({
        success: true,
        updatedMedia,
    });
}

export async function deleteMedia(c) {
    const currentMedia = c.get("media");

    await Media.findByIdAndDelete(currentMedia._id);
    unlink(`${STATIC_PATH}/${currentMedia.path}`).catch((err) => logger.error(`Error: ${err.message} - ${err.stack}`));

    return c.json({ success: true, message: "Media deleted" });
}

export default {
    getStaticDir,
    getMedia,
    getMediaById,
    addMedia,
    updateMedia,
    deleteMedia,
};
