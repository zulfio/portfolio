import DistributionApplication from "../../database/models/Distribution/DistributionApplication";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getDistributionApplication(context) {
    const distributionApplication = await DistributionApplication.findById(context.get("distribution_application")._id).populate("images videos");

    return context.json({
        success: true,
        distributionApplication,
    });
}

export async function getDistributionApplications(context) {
    const query = await context.req.query();

    const totalQuery = {
        ...query,
    };

    if (query.search) {
        query.$or = [
            { name: { $regex: query.search, $options: "i" } },
            { organization: { $regex: query.search, $options: "i" } }
        ];
        totalQuery.$or = query.$or;
    }
    delete query.search;
    delete totalQuery.search;

    let distributionApplications = await new FilterAPI(DistributionApplication, query)
        .get()
        .sort()
        .pagination()
        .fields()
        .data;

    const excludedTotalQueryKeys = ["sort", "page", "limit", "fields"];
    excludedTotalQueryKeys.forEach((key) => {
        delete totalQuery[key];
    });

    const total = await DistributionApplication.countDocuments(totalQuery);

    return context.json({
        success: true,
        distributionApplications,
        total,
    });
}

export async function createDistributionApplication(context) {
    const body = await context.req.json();

    const newDistributionApplication = await DistributionApplication.create({
        name: body.name,
        organization: body.organization,
        phoneNumber: body.phoneNumber,
        address: body.address,
        organizationAddress: body.organizationAddress,
        item: body.item,
        images: body.images,
        videos: body.videos,
    });

    return context.json({
        success: true,
        distributionApplication: newDistributionApplication,
    });
}

export async function deleteDistributionApplication(context) {
    await DistributionApplication.findByIdAndDelete(context.get("distribution_application")._id);

    return context.json({
        success: true,
    });
}

export async function updateDistributionApplication(context) {
    const distributionApplication = context.get("distribution_application");
    const body = await context.req.json();

    await DistributionApplication.findByIdAndUpdate(distributionApplication._id, {
        ...body,
    });

    return context.json({
        success: true,
    });
}