import Admin from "../database/models/Auth/Admin";
import Role from "../database/models/Auth/Role";
import FilterAPI from "../lib/utils/database/FilterAPI";

export async function getRoles(c) {
    const query = await c.req.query();
    const totalQuery = {};

    const roles = await new FilterAPI(Role, query).get().sort().pagination().fields().data;
    const total = await Role.countDocuments(totalQuery);

    return c.json({
        success: true,
        roles,
        total,
    });
}

export async function addRole(c) {
    const body = await c.req.json();

    const newRole = await Role.create({
        name: body.name?.trim(),
        description: body.description,
        permissions: body.permissions,
    });

    return c.json({
        success: true,
        role: newRole,
    });
}

export async function updateRole(c) {
    const role = c.get("role");
    const admin = c.get("loggedInAdmin");

    const isOwnRole = admin.role?._id.equals(role._id);
    if (isOwnRole) {
        return c.json(
            {
                success: false,
                message: "You cannot update your own role",
            },
            403
        );
    }

    const body = await c.req.json();
    const updatedRole = await Role.findByIdAndUpdate(
        role._id,
        {
            name: body.name?.trim(),
            permissions: body.permissions,
            description: body.description,
        },
        {
            new: true,
        }
    );

    return c.json({
        success: true,
        role: updatedRole,
    });
}

export async function deleteRole(c) {
    const role = c.get("role");
    const admin = c.get("loggedInAdmin");

    const isOwnRole = admin.role?._id.equals(role._id);
    if (isOwnRole) {
        return c.json(
            {
                success: false,
                message: "You cannot delete your own role",
            },
            403
        );
    }

    await Role.findByIdAndDelete(role._id);
    await Admin.updateMany(
        {
            role: role._id,
        },
        {
            role: null,
        }
    );

    return c.json({
        success: true,
    });
}

export default {
    getRoles,
    addRole,
    updateRole,
    deleteRole,
};
