import { HTTPException } from "hono/http-exception";
import logger from "../lib/utils/logger";

function handleDuplicateKeyError(err) {
    const field = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    const message = `${field[0]} ${value[0]} already exists.`;

    return { success: false, message, httpStatus: 400 };
}

function handleError(err, c) {
    let error = {
        success: false,
        message: err.message || "Oops! Something went wrong",
        httpStatus: 500,
    };

    if (err.code === 11000) {
        error = handleDuplicateKeyError(err);
    }

    if (err instanceof HTTPException) {
        error = {
            success: false,
            message: err.message,
            httpStatus: err.status,
        };
    }

    logger.error(`Error: ${err.message} - ${err.stack}`);
    return c.json({ success: false, message: error.message }, error.httpStatus);
}

export default handleError;
