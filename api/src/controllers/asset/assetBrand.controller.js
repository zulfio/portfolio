import AssetBrand from "../../database/models/Asset/AssetBrand";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getAssetBrands(context) {
    const query = await context.req.query();

    if (query.search) {
        query.name = {
            $regex: query.search,
            $options: "i",
        };
    }
    delete query.search;

    const brands = await new FilterAPI(AssetBrand, query).get().sort().data;

    return context.json({
        success: true,
        brands,
    });
}

export async function getAssetBrand(context) {
    const brand = context.get("asset_brand");

    return context.json({
        success: true,
        brand,
    });
}

export async function addAssetBrand(context) {
    const body = await context.req.json();

    const newAssetBrand = await AssetBrand.create({
        name: body.name,
        description: body.description,
        iconURL: body.iconURL,
    });

    return context.json({
        success: true,
        brands: newAssetBrand,
    });
}

export async function updateAssetBrand(context) {
    const asset_brand = context.get("asset_brand");
    const body = await context.req.json();

    await AssetBrand.findByIdAndUpdate(asset_brand._id, {
        name: body.name,
        description: body.description,
        iconURL: body.iconURL,
    });

    return context.json({
        success: true,
    });
}

export async function deleteAssetBrand(context) {
    const asset_brand = context.get("asset_brand");

    await AssetBrand.findByIdAndDelete(asset_brand._id);

    return context.json({
        success: true,
    });
}
