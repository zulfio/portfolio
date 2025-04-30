import mongoose from "mongoose";
import { AMOUNT_SOURCES, FUNDING_APPLICATION_PAYMENT_METHODS, FUNDING_APPLICATION_TYPES, MUSTAHIK_TYPES, PROGRAM_TYPES } from "../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        ppdNumber: {
            type: String,
            required: true,
            unique: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        amountSource: {
            type: String,
            enum: [...AMOUNT_SOURCES],
            default: "lainnya",
        },
        description: String,
        program: {
            type: String,
            enum: [
                ...PROGRAM_TYPES
            ],
            default: "lainnya",
        },
        mustahik: {
            type: String,
            enum: [
                ...MUSTAHIK_TYPES
            ]
        },
        payTo: {
            type: String,
            required: true,
        },
        approvedBy: {
            type: mongoose.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: [...FUNDING_APPLICATION_PAYMENT_METHODS],
            default: "lainnya",
        },
        paymentCredentials: String,
        acceptedByManager: { type: Boolean, default: false },
        acceptedByDirector: { type: Boolean, default: false },
        applicationType: {
            type: String,
            enum: [...FUNDING_APPLICATION_TYPES],
            default: "lainnya",
        },
        createdAtObj: {
            day: Number,
            month: Number,
            year: Number,
        },
        updateHistory: [
            {
                name: String,
                key: String,
                oldData: Object,
                newData: Object,
                date: Date,
            }
        ]
    },
    { timestamps: true, collection: "funding_applications" },
);

Schema.index({ createdAt: 1, ppdNumber: 1 });

export default mongoose.models.FundingApplication || mongoose.model("FundingApplication", Schema);
