import AssetCategory from "../../database/models/Asset/AssetCategory";

export async function getAssetCategories(context) {
    const categories = await AssetCategory.aggregate([
        {
            $match: { parent: null },
        },
        {
            $lookup: {
                from: "asset_categories",
                localField: "_id",
                foreignField: "parent",
                as: "children",
            },
        },
        {
            $sort: { name: 1 },
        },
    ]);

    return context.json({
        success: true,
        categories,
    });
}

export async function getAssetParentCategories(context) {
    const categories = await AssetCategory.find({ parent: null });

    return context.json({
        success: true,
        categories,
    });
}

export async function getAssetCategory(context) {
    const category = context.get("category");

    return context.json({
        success: true,
        category,
    });
}

export async function addAssetCategory(context) {
    const body = await context.req.json();

    const newCategory = await AssetCategory.create({
        name: body.name,
        parent: body.parent,
        description: body.description,
        iconURL: body.iconURL,
    });

    return context.json({
        success: true,
        category: newCategory,
    });
}

export async function updateAssetCategory(context) {
    const asset_category = context.get("asset_category");
    const body = await context.req.json();

    await AssetCategory.findByIdAndUpdate(asset_category._id, {
        name: body.name,
        parent: body.parent,
        description: body.description,
        iconURL: body.iconURL,
    });

    return context.json({
        success: true,
    });
}

export async function deleteAssetCategory(context) {
    const asset_category = context.get("asset_category");

    if (asset_category.children?.length) {
        return context.json({
            success: false,
            message: "Kategori ini memiliki sub-kategori, silahkan hapus sub-kategori terlebih dahulu.",
        });
    }

    await AssetCategory.findByIdAndDelete(asset_category._id);

    return context.json({
        success: true,
    });
}
