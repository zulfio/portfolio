import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: "",
        },
        iconURL: String,
    },
    { timestamps: true, collection: "asset_brands" },
);

export default mongoose.models.AssetBrand || mongoose.model("AssetBrand", Schema);
