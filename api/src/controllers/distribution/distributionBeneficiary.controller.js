import DistributionBeneficiary from "../../database/models/Distribution/DistributionBeneficiary";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getDistributionBeneficiary(context) {
    const distributionBeneficiary = context.get("distribution_beneficiary");

    return context.json({
        success: true,
        distributionBeneficiary,
    });
}

export async function getDistributionBeneficiaries(context) {
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

    const distributionBeneficiaries = await new FilterAPI(DistributionBeneficiary, query).get().sort().pagination().fields().data;
    const total = await DistributionBeneficiary.countDocuments(totalQuery);

    return context.json({
        success: true,
        distributionBeneficiaries,
        total,
    });
}

export async function createDistributionBeneficiary(context) {
    const body = await context.req.json();

    const newDistributionBeneficiary = await DistributionBeneficiary.create({
        type: body.type,
        nik: body.nik,
        name: body.name,
        gender: body.gender,
        phoneNumber: body.phoneNumber,
        address: body.address,
    });

    return context.json({
        success: true,
        distributionBeneficiary: newDistributionBeneficiary,
    });
}

export async function updateDistributionBeneficiary(context) {
    const distributionBeneficiary = context.get("distribution_beneficiary");
    const body = await context.req.json();

    await DistributionBeneficiary.findByIdAndUpdate(distributionBeneficiary._id, {
        type: body.type,
        nik: body.nik,
        name: body.name,
        gender: body.gender,
        phoneNumber: body.phoneNumber,
        address: body.address,
    });

    return context.json({
        success: true,
    });
}

export async function deleteDistributionBeneficiary(context) {
    const distributionBeneficiary = context.get("distribution_beneficiary");

    await DistributionBeneficiary.findByIdAndDelete(distributionBeneficiary._id);

    return context.json({
        success: true,
    });
}
