import DistributionItem from "../../database/models/Distribution/DistributionItem";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getDistributionItem(context) {
    const distributionItem = context.get("distribution_item");

    return context.json({
        success: true,
        distributionItem,
    });
}

export async function getDistributionItems(context) {
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

    const distributionItems = await new FilterAPI(DistributionItem, query).get().sort().pagination().fields().data;
    const total = await DistributionItem.countDocuments(totalQuery);

    return context.json({
        success: true,
        distributionItems,
        total,
    });
}

export async function createDistributionItem(context) {
    const body = await context.req.json();

    const newDistributionItem = await DistributionItem.create({
        name: body.name,
        unit: body.unit,
    });

    return context.json({
        success: true,
        distributionItem: newDistributionItem,
    });
}

export async function updateDistributionItem(context) {
    const distributionItem = context.get("distribution_item");
    const body = await context.req.json();

    await DistributionItem.findByIdAndUpdate(distributionItem._id, {
        name: body.name,
        unit: body.unit,
    });

    return context.json({
        success: true,
    });
}

export async function deleteDistributionItem(context) {
    const distributionItem = context.get("distribution_item");

    await DistributionItem.findByIdAndDelete(distributionItem._id);

    return context.json({
        success: true,
    });
}
