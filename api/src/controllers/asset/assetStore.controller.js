import AssetStore from "../../database/models/Asset/AssetStore";
import FilterAPI from "../../lib/utils/database/FilterAPI";

export async function getAssetStores(context) {
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

    const stores = await new FilterAPI(AssetStore, query).get().sort().pagination().fields().data;
    const total = await AssetStore.countDocuments(totalQuery);

    return context.json({
        success: true,
        stores,
        total,
    });
}

export async function getAssetStore(context) {
    const store = context.get("asset_store");

    return context.json({
        success: true,
        store,
    });
}

export async function addAssetStore(context) {
    const body = await context.req.json();

    const newAssetStore = await AssetStore.create(body);

    return context.json({
        success: true,
        store: newAssetStore,
    });
}

export async function updateAssetStore(context) {
    const asset_store = context.get("asset_store");
    const body = await context.req.json();

    await AssetStore.findByIdAndUpdate(asset_store._id, body);

    return context.json({
        success: true,
    });
}

export async function deleteAssetStore(context) {
    const asset_store = context.get("asset_store");

    await AssetStore.findByIdAndDelete(asset_store._id);

    return context.json({
        success: true,
    });
}
