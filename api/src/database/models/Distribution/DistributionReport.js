import mongoose from "mongoose";
import { AMOUNT_SOURCES, LAZ_DEPARTEMENTS, MUSTAHIK_TYPES } from "../../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        pic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        department: {
            type: String,
            enum: [...LAZ_DEPARTEMENTS],
            default: "lainnya",
        },
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DistributionProgram",
            required: true
        },
        beneficiary: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DistributionBeneficiary",
            required: true
        },
        distributionDate: {
            type: Date,
            required: true,
        },
        distributionItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DistributionItem",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        amountSource: {
            type: String,
            enum: [...AMOUNT_SOURCES],
            default: "lainnya",
        },
        attachments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Media",
            default: [],
        },
    },
    { timestamps: true, collection: "distribution_reports" }
);

export default mongoose.models.DistributionReport || mongoose.model("DistributionReport", Schema);
