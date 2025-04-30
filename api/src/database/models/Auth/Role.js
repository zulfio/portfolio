import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 20,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            maxlength: 100,
        },
        permissions: {
            type: [String],
            validate: {
                validator: (val) => Array.isArray(val) && val.filter((item) => item).length,
                message: "permissions are required",
            },
        },
    },
    { timestamps: true, collection: "roles" }
);

export default mongoose.models.Role || mongoose.model("Role", Schema);
