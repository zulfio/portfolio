import Admin from "../database/models/Auth/Admin";
import { filterObject } from "../lib/utils/formatter";
import FilterAPI from "../lib/utils/database/FilterAPI";

export async function getAdminById(c) {
    const admin = filterObject(c.get("admin"), ["_id", "name", "email", "phoneNumber", "role"]);

    return c.json({
        success: true,
        admin,
    });
}

export async function getAdmins(c) {
    const query = await c.req.query();
    const totalQuery = {};

    if (query.search) {
        query.name = {
            $regex: query.search,
            $options: "i",
        };
        totalQuery.name = query.name;
    }
    delete query.search;

    if (query.role) {
        totalQuery.role = query.role;
    }

    query.fields = "name,email,phoneNumber,role,isActive";

    const admins = await new FilterAPI(Admin, query)
        .get()
        .sort()
        .pagination()
        .fields()
        .populate("role", "name permissions").data;
    const total = await Admin.countDocuments(totalQuery);

    return c.json({
        success: true,
        admins,
        total,
    });
}

export async function addAdmin(c) {
    const { name, email, phoneNumber, password, role } = await c.req.json();

    const newAdmin = await Admin.create({
        name,
        email,
        phoneNumber,
        password,
        role,
    });

    return c.json({
        success: true,
        admin: newAdmin,
    });
}

export async function deleteAdmin(c) {
    const adminToUpdate = c.get("admin");

    await Admin.findByIdAndDelete(adminToUpdate._id);

    return c.json({
        success: true,
    });
}

export async function updateAdmin(c) {
    let body = await c.req.json();
    body = filterObject(body, ["name", "email", "phoneNumber", "password", "role", "isActive"]);

    const admin = await Admin.findById(c.get("admin")._id);
    admin.set(body);
    await admin.save();

    return c.json({
        success: true,
        admin,
    });
}

export default { addAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin };
