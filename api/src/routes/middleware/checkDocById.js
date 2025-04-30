import mongoose from "mongoose";

/**
 * Middleware function to check if a document exists by its ID.
 *
 * @param {string} documentName - The name of the document.
 * @param {Model} model - The mongoose model for the document.
 * @returns {Promise<void>} - A promise that resolves when the middleware is done.
 */
const checkDocById = (documentName, model) => async (c, next) => {
    const id = c.req.param("id");
    if (!mongoose.isValidObjectId(id)) {
        return c.json(
            {
                success: false,
                message: `${documentName} not found`,
            },
            404
        );
    }

    const doc = await model.findById(id);
    if (!doc) {
        return c.json(
            {
                success: false,
                message: `${documentName} not found`,
            },
            404
        );
    }

    c.set(documentName, doc);
    await next();
};

export default checkDocById;
