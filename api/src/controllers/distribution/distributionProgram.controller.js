import DistributionProgram from "../../database/models/Distribution/DistributionProgram";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getDistributionProgram(context) {
    const distributionProgram = context.get("distribution_program");

    return context.json({
        success: true,
        distributionProgram,
    });
}

export async function getDistributionPrograms(context) {
    const query = await context.req.query();
    const totalQuery = {};

    if (query.searchQuery) {
        query.name = {
            $regex: query.searchQuery,
            $options: "i",
        };
        totalQuery.name = query.name;
    }
    delete query.searchQuery;

    const distributionPrograms = await new FilterAPI(DistributionProgram, query).get().sort().pagination().fields().data;
    const total = await DistributionProgram.countDocuments(totalQuery);

    return context.json({
        success: true,
        distributionPrograms,
        total,
    });
}

export async function createDistributionProgram(context) {
    const body = await context.req.json();

    const newDistributionProgram = await DistributionProgram.create({
        name: body.name,
        type: body.type,
        description: body.description,
    });

    return context.json({
        success: true,
        distributionProgram: newDistributionProgram,
    });
}

export async function updateDistributionProgram(context) {
    const distributionProgram = context.get("distribution_program");
    const body = await context.req.json();

    await DistributionProgram.findByIdAndUpdate(distributionProgram._id, {
        name: body.name,
        type: body.type,
        description: body.description,
    });

    return context.json({
        success: true,
    });
}

export async function deleteDistributionProgram(context) {
    const distributionProgram = context.get("distribution_program");

    await DistributionProgram.findByIdAndDelete(distributionProgram._id);

    return context.json({
        success: true,
    });
}
