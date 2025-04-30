import Admin from "../../database/models/Auth/Admin";

/**
 * Middleware function to check admin status.
 * @param {Object} c - Hono context object.
 * @param {Function} next - Hono next function.
 * @returns {Promise<void>} - A Promise that resolves when the middleware is complete.
 */
async function checkAdminStatus(c, next) {
    const admin = c.get("admin");

    if (!admin.isActive) {
        return c.json(
            {
                success: false,
                message: "Your account is disabled. Please contact the administrator.",
            },
            401
        );
    }

    if (admin.lockUntil < new Date()) {
        await Admin.findByIDAndUnlock(admin._id);
    }

    if (admin.lockUntil > new Date()) {
        const tryAgainIn = Math.ceil((admin.lockUntil - new Date()) / 1000 / 60);

        return c.json(
            {
                success: false,
                message: `Your account is locked. Please try again in ${tryAgainIn} minutes.`,
            },
            401
        );
    }

    await next();
}

export default checkAdminStatus;
