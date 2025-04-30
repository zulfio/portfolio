import mongoose from "mongoose";
import { DISTRIBUTION_ITEMS } from "../../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organization: String,
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            province: {
                "id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            city: {
                "id": String,
                "provinsi_id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            subdistrict: {
                "id": String,
                "kota_id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            village: String,
            complete: String,
        },
        organizationAddress: {
            province: {
                "id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            city: {
                "id": String,
                "provinsi_id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            subdistrict: {
                "id": String,
                "kota_id": String,
                "name": String,
                "alt_name": String,
                "latitude": Number,
                "longitude": Number
            },
            village: String,
            complete: String,
        },
        images: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Media",
            default: [],
        },
        videos: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Media",
            default: [],
        },
        item: {
            type: String,
            enum: [...DISTRIBUTION_ITEMS],
            required: true,
        },
        statuses: {
            isCompleteDocumented: {
                type: Boolean,
                default: false,
            },
            isPostDocumented: {
                type: Boolean,
                default: false,
            },
            isDistributed: {
                type: Boolean,
                default: false,
            },
            isApproved: {
                type: Boolean,
                default: false,
            }
        },
    },
    { timestamps: true, collection: "distribution_applications" },
);

export default mongoose.models.DistributionApplication || mongoose.model("DistributionApplication", Schema);
