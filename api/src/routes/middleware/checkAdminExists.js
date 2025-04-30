import mongoose from "mongoose";
import Admin from "../../database/models/Auth/Admin";

/**
 * Middleware function to check if an admin exists based on the provided type.
 *
 * @param {string} type - The type of check to perform. Can be either "username" or "id".
 * @returns {Function} - The middleware function.
 */
const checkAdminExists = (type) => async (c, next) => {
    let admin;

    if (type === "username") {
        const { username } = await c.req.json();
        admin = await Admin.findByUsername(username);
    }

    if (type === "id") {
        const id = c.req.param("id");
        if (!mongoose.isValidObjectId(id)) {
            return c.json({
                success: false,
                message: "Invalid username or password. Please try again.",
            });
        }

        admin = await Admin.findById(id).populate({ path: "role" });
    }

    if (!admin) {
        return c.json(
            {
                success: false,
                message: "Invalid username or password. Please try again.",
            },
            401
        );
    }

    c.set("admin", admin);
    await next();
};

export default checkAdminExists;
