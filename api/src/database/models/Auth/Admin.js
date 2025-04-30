import mongoose from "mongoose";
import date from "date-and-time";

import checker from "../../../lib/utils/checker";
import OTP from "./OTP";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 100,
        },
        email: {
            type: String,
            unique: true,
            maxlength: 320,
        },
        phoneNumber: {
            type: String,
            unique: true,
            maxlength: 15,
        },
        about: String,
        contact: {
            phoneNumber: String,
            email: String,
            address: String,
        },
        profilePicture: String,
        featuredImage: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        changePasswordAt: {
            type: Date,
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: Date,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, collection: "admins" },
);

Schema.index({ createdAt: 1, name: 1 });

Schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await Bun.password.hash(this.password);
    }

    if (this.isModified("password") && !this.isNew) {
        this.changePasswordAt = new Date();
    }

    next();
});

Schema.methods.comparePassword = async function (password) {
    return await Bun.password.verify(password, this.password);
};

Schema.methods.lock = async function () {
    this.lockUntil = date.addMinutes(new Date(), 15);
    await this.save();
    await OTP.deleteMany({ admin_id: this._id });
};

Schema.methods.passwordHasChangedAfterTokenInitialized = function (iat) {
    if (this.changePasswordAt) {
        const changePasswordAt = parseInt(this.changePasswordAt.getTime() / 1000, 10);

        return changePasswordAt > iat;
    }

    return false;
};

Schema.statics.findByUsername = async function (username) {
    const findQuery = {};
    const isValidEmail = checker.isEmail(username);

    if (isValidEmail) {
        findQuery.email = username;
    } else {
        findQuery.phoneNumber = username;
    }

    try {
        const admin = await this.findOne(findQuery).populate("role");
        if (!admin) throw new Error("admin does not exist");

        return { ...admin.toObject(), username: findQuery };
    } catch (error) {
        return null;
    }
};

Schema.statics.findByIDAndUnlock = async function (id) {
    await this.updateOne(
        { _id: id },
        {
            $set: {
                failedLoginAttempts: 0,
                lockUntil: null,
            },
        },
    );
};

export default mongoose.models.Admin || mongoose.model("Admin", Schema);
