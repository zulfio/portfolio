import mongoose from "mongoose";
import { MUSTAHIK_TYPES } from "../../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["individual", "organization"],
            required: true,
        },
        nik: {
            type: String,
            maxlength: 255,
        },
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"], // bukan geh anjig, ini other buat yg typenya organization
            default: "other",
        },
        phoneNumber: {
            type: String,
            maxlength: 20,
        },
        address: {
            complete: { type: String, default: "", maxlength: 255 },
            country: { type: String, default: "", maxlength: 100 },
            province: { type: String, default: "", maxlength: 100 },
            city: { type: String, default: "", maxlength: 100 },
            subdistrict: { type: String, default: "", maxlength: 100 },
            village: { type: String, default: "", maxlength: 100 },
        },
        mustahik: {
            type: String,
            enum: [...MUSTAHIK_TYPES],
        },
    },
    { timestamps: true, collection: "distribution_beneficiaries" }
);

export default mongoose.models.DistributionBeneficiary || mongoose.model("DistributionBeneficiary", Schema);
