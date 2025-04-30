import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true,
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, collection: "site_options" }
);

export default mongoose.models.SiteOption || mongoose.model("SiteOption", Schema);
