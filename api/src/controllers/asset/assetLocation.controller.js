import AssetLocation from "../../database/models/Asset/AssetLocation";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getAssetLocation(context) {
    const location = context.get("asset_location");

    return context.json({
        success: true,
        location,
    });
}

export async function getAssetLocations(context) {
    const query = await context.req.query();

    if (query.search) {
        query.name = {
            $regex: query.search,
            $options: "i",
        };
    }
    delete query.search;

    const locations = await new FilterAPI(AssetLocation, query).get().sort().data;

    return context.json({
        success: true,
        locations,
    });
}

export async function createAssetLocation(context) {
    const body = await context.req.json();

    const newAssetLocation = await AssetLocation.create({
        name: body.name,
        description: body.description,
        imageURL: body.imageURL,
    });

    return context.json({
        success: true,
        location: newAssetLocation,
    });
}

export async function updateAssetLocation(context) {
    const asset_location = context.get("asset_location");
    const body = await context.req.json();

    await AssetLocation.findByIdAndUpdate(asset_location._id, {
        name: body.name,
        description: body.description,
        imageURL: body.imageURL,
    });

    return context.json({
        success: true,
    });
}

export async function deleteAssetLocation(context) {
    const asset_location = context.get("asset_location");

    await AssetLocation.findByIdAndDelete(asset_location._id);

    return context.json({
        success: true,
    });
}
