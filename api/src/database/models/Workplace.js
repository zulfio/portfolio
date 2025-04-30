const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        completeAddress: String,
        images: [String],
    },
    { timestamps: true, collection: "workplaces" },
);

export default mongoose.models.Workplace || mongoose.model("Workplace", Schema);
