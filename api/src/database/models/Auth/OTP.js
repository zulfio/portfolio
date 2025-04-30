import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        admin_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },
        token: String,
        validUntil: Date,
    },
    { timestamps: true, collection: "otp" }
);

export default mongoose.models.OTP || mongoose.model("OTP", Schema);
