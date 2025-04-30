import fs from "fs";
import { STATIC_PATH } from "../../../config/index.js";
import { S3 } from "./aws.js";
import { generateId } from "../generator.js"
import logger from "../../utils/logger.js";

async function s3Upload({ fileName, file }) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const folderPath = `${year}/${month}/${day}`;
    const key = `${folderPath}/${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentType: file.type,
    };

    try {
        const result = await S3.upload(params).promise();
        return result;
    } catch (error) {
        return false;
    }
}

/**
 * Handle file upload
 * @param {Object} payload {files: Array, maxFileSize: number (bytes)}
 * @returns {Promise} [status: string, data: Array]
 */
async function handleFileUpload({ files = [], maxFileSize = 1000000 }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const folderPath = `${year}/${month}/${day}`;

    const uploadedFiles = [];
    const filesToUpload = files.length ? files : [files];

    for (const file of filesToUpload) {
        let { name, size, type } = file;
        const fileName = name.split(".").slice(0, -1).join(".").replace(/[^a-zA-Z0-9]/g, ''); // get file name without extension and remove special characters
        const ext = name.split(".").pop();
        const newFileNameWithExt = `${fileName}-${generateId()}.${ext}`;

        let status = {
            success: false,
            path: `${folderPath}/${newFileNameWithExt}`,
            fileName: newFileNameWithExt,
            type: type?.split(";")[0] || "unknown",
        };

        try {
            if (size > maxFileSize) throw new Error(`File size too large, max ${maxFileSize / 1000000}MB`);

            const uploadToS3Status = await s3Upload({ fileName: newFileNameWithExt, file });
            if (uploadToS3Status !== false) {
                status.s3key = uploadToS3Status.Key;
            } else {
                logger.error("Failed to upload file to S3");

                const staticFolder = `${STATIC_PATH}/${folderPath}`;
                if (!fs.existsSync(staticFolder)) {
                    fs.mkdirSync(staticFolder, { recursive: true });
                }

                await Bun.write(`${staticFolder}/${newFileNameWithExt}`, file);
            }

            status = {
                ...status,
                success: true,
            };
        } catch (error) {
            status = {
                ...status,
                errorMessage: error.message,
                success: false,
            }
        }

        uploadedFiles.push(status);
    }

    return uploadedFiles;
}

export default handleFileUpload;