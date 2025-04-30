import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetCategory",
        },
        description: {
            type: String,
            default: "",
        },
        iconURL: String,
    },
    { timestamps: true, collection: "asset_categories" }
);

export default mongoose.models.AssetCategory || mongoose.model("AssetCategory", Schema);
