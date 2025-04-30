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
        imageURL: String,
    },
    { timestamps: true, collection: "asset_locations" },
);

export default mongoose.models.AssetLocation || mongoose.model("AssetLocation", Schema);
