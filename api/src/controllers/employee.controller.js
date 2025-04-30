import Employee from "../database/models/Employee";
import FilterAPI from "../lib/utils/database/FilterAPI";

export async function getEmployees(context) {
    const query = await context.req.query();
    const totalQuery = {};

    if (query.search) {
        query.name = {
            $regex: query.search,
            $options: "i",
        };
        totalQuery.name = query.name;
    }
    delete query.search;

    const employees = await new FilterAPI(Employee, query).get().sort().pagination().fields().data;
    const total = await Employee.countDocuments(totalQuery);

    return context.json({
        success: true,
        employees,
        total,
    });
}

export async function getPublicDataEmployees(context) {
    const employees = await Employee.find({}, "name department division position").sort("name");

    return context.json({
        success: true,
        employees,
    });
}

export async function getEmployee(context) {
    const currentEmployee = context.get("employee");
    const employee = await Employee.findById(currentEmployee._id).populate("profile_picture other_documents signature");

    return context.json({
        success: true,
        employee,
    });
}

export async function addEmployee(context) {
    const body = await context.req.json();

    const newEmploye = await Employee.create(body);

    return context.json({
        success: true,
        employee: newEmploye,
    });
}

export async function updateEmployee(context) {
    const employee = context.get("employee");
    const body = await context.req.json();

    const updatedEmployee = await Employee.findByIdAndUpdate(employee._id, body, {
        new: true,
        runValidators: true,
    });

    return context.json({
        success: true,
        employee: updatedEmployee,
    });
}

export async function deleteEmployee(context) {
    const employee = context.get("employee");

    await Employee.findByIdAndDelete(employee._id);

    return context.json({
        success: true,
    });
}

export async function deleteEmployees(context) {
    const body = await context.req.json();

    await Employee.deleteMany({ _id: { $in: body.ids } });

    return context.json({
        success: true,
    });
}
