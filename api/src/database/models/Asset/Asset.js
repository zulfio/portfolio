import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetLocation",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetCategory",
        },
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetCategory",
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetBrand",
        },
        type: String,
        manufacturer: String,
        serial_number: String,
        production_year: Number,
        purchase_date: Date,
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AssetStore",
        },
        invoice_number: String,
        total_units: {
            type: Number,
            required: true,
        },
        price_per_unit: {
            type: Number,
            default: 0,
        },
        economic_life: {
            type: Number,
            default: 0,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        attachments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Media",
            default: [],
        },
        description: String,
        additionalInfo: String,
    },
    { timestamps: true, collection: "assets" },
);

export default mongoose.models.Asset || mongoose.model("Asset", Schema);
