import mongoose from "mongoose";
import { PROGRAM_TYPES } from "../../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            maxlength: 255,
            enum: [...PROGRAM_TYPES],
            required: true,
        },
        description: {
            type: String,
            maxlength: 1000,
        },
    },
    { timestamps: true, collection: "distribution_programs" }
);

export default mongoose.models.DistributionProgram || mongoose.model("DistributionProgram", Schema);
