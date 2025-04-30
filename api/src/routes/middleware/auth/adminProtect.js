import jwt from "jsonwebtoken";
import Admin from "../../../database/models/Auth/Admin";

const adminProtect =
    (permissions = []) =>
        async (c, next) => {
            try {
                const authorization = c.req.header("authorization");
                if (!authorization) throw new Error("Unauthorized");

                const token = authorization.split(" ")[1];
                const { admin_id, iat } = jwt.verify(token, process.env.JWT_SECRET_KEY);

                let loggedInAdmin = await Admin.findById(admin_id).populate({
                    path: "role",
                });

                if (!loggedInAdmin || !loggedInAdmin.isActive) {
                    return c.json(
                        {
                            success: false,
                            message: "Unauthorized, please login.",
                        },
                        401
                    );
                }

                const hasRole =
                    loggedInAdmin.role?.permissions.length &&
                    permissions.some((permission) => {
                        const adminPermissions = loggedInAdmin.role.permissions;
                        const resource = permission.split("_")[0];

                        return (
                            adminPermissions.includes(permission) ||
                            adminPermissions.includes(`${resource}_*`) ||
                            adminPermissions.includes("*")
                        );
                    });

                if (permissions.length && !hasRole) {
                    return c.json(
                        {
                            success: false,
                            message:
                                "You don't have permission to access this resource, please contact your administrator.",
                        },
                        403
                    );
                }

                if (loggedInAdmin.passwordHasChangedAfterTokenInitialized(iat)) {
                    return c.json(
                        {
                            success: false,
                            message: "Password has been changed, please login again.",
                        },
                        401
                    );
                }

                c.set("loggedInAdmin", loggedInAdmin);
                await next();
            } catch (error) {
                let errorMessage = error.name === "JsonWebTokenError" ? "Unauthorized" : error.message;

                return c.json(
                    {
                        success: false,
                        message: errorMessage,
                    },
                    401
                );
            }
        };

export default adminProtect;
