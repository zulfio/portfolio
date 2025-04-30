import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            maxlength: 1000,
        },
        phoneNumber: {
            type: String,
            maxlength: 20,
        },
        email: {
            type: String,
            maxlength: 100,
        },
        officerName: {
            type: String,
            maxlength: 100,
        },
        description: {
            type: String,
            maxlength: 1000,
        },
        iconURL: {
            type: String,
            maxlength: 1000,
        },
    },
    { timestamps: true, collection: "asset_stores" },
);

export default mongoose.models.AssetStore || mongoose.model("AssetStore", Schema);
