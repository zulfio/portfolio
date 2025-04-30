import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        donorID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            unique: true,
            maxlength: 20,
        },
        email: {
            type: String,
            maxlength: 20,
        },
        address: {
            city: { type: String, default: "" },
            province: { type: String, default: "" },
            subdistrict: { type: String, default: "" },
            complete: { type: String, default: "" },
        },
        dateOfBirth: Date,
        firstDonor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donation",
        },
        status: {
            type: String,
            enum: ["two-tick", "one-tick", "blocked", "unknown"]
        }

    },
    { timestamps: true, collection: "donors" },
);

export default mongoose.models.Donor || mongoose.model("Donor", Schema);
