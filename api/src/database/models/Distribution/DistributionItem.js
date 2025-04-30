import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        unit: {
            type: String,
            required: true,
            maxlength: 100,
        },
    },
    { timestamps: true, collection: "distribution_item" }
);

export default mongoose.models.DistributionItem || mongoose.model("DistributionItem", Schema);
