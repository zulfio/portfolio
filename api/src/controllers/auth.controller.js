import date from "date-and-time";

import OTP from "../database/models/Auth/OTP";
import Admin from "../database/models/Auth/Admin";

import sendEmail from "../lib/utils/notifications/sendEmail";
import sendWhatsapp from "../lib/utils/notifications/sendWhatsapp";
import replaceContent from "../lib/utils/file/replaceContent";
import logger from "../lib/utils/logger";
import signJWT from "../lib/utils/auth/signJWT";

const DISALLOW_ADMIN_RESPONSE_OBJECTS = ["password", "changePasswordAt", "failedLoginAttempts"];


/**
 * Sends an email with OTP (One-Time Password) to the specified email address.
 * @param {Object} options - The options for sending the email.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.otp - The OTP (One-Time Password) to be sent.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
async function handleSendToEmail({ email, otp }) {
    const emailHTMLBody = await replaceContent({
        path: import.meta.dir + "/../lib/utils/notifications/template/otp.html",
        from: ["{{OTP}}", "{{APP_NAME}}"],
        to: [otp, process.env.APP_NAME, ,],
    });

    const mailPayload = {
        from: `${process.env.MAIL_FROM_ADDRESS}`,
        to: email,
        subject: `Kode OTP untuk login ke ${process.env.APP_NAME}`,
        html: emailHTMLBody,
    };

    await sendEmail(mailPayload);
}

/**
 * Handles a failed authentication attempt.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.context - Hono's context.
 * @param {string} options.adminId - The ID of the admin.
 * @returns {Promise<Object>} The JSON response object.
 */
async function handleFailedAuthAttempt({ context, adminId, type }) {
    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        {
            $inc: {
                failedLoginAttempts: 1,
            },
        },
        {
            new: true,
        }
    );

    let errorMessage = `Failed, ${type} is invalid`;

    if (updatedAdmin.failedLoginAttempts > 5) {
        await updatedAdmin.lock();
        errorMessage = "Too many failed login attempts, your account has been locked";
    }

    return context.json(
        {
            success: false,
            message: errorMessage,
        },
        401
    );
}

export async function requestOTP(context) {
    const admin = context.get("admin");
    try {
        await OTP.deleteMany({ admin_id: admin._id });

        const randomOTP = Math.random().toString().slice(2, 6);
        await OTP.create({
            admin_id: admin._id,
            token: randomOTP,
            validUntil: date.addMinutes(new Date(), 15),
        });

        if (admin.username?.email) {
            handleSendToEmail({ email: admin.username.email, otp: randomOTP });
        }
        if (admin.username?.phoneNumber) {
            const textMessage = `*${randomOTP}* is your verification code. For security reasons, please do not share this code.`;
            sendWhatsapp({
                chatId: admin.username.phoneNumber,
                text: textMessage,
            }).catch((err) => {
                logger.error(`Error: ${err.message} - ${err.stack}`);
            });
        }

        return context.json({
            success: true,
            message: "OTP is created and sent to your email or phone number",
        });
    } catch (error) {
        logger.error(`Error: ${error.message} - ${error.stack}`);
        return context.json(
            {
                success: false,
                message: "Failed to create OTP",
            },
            401
        );
    }
}

export async function validateOTP(context) {
    const admin = context.get("admin");
    const { otp } = await context.req.json();

    const validOTP = await OTP.findOne({
        admin_id: admin._id,
        validUntil: {
            $gte: new Date(),
        },
    });

    if (!validOTP) {
        await OTP.deleteMany({
            admin_id: admin._id,
        });

        return context.json(
            {
                success: false,
                message: "Please request a new OTP code",
            },
            401
        );
    }

    if (otp !== validOTP.token) {
        return await handleFailedAuthAttempt({ context, adminId: admin._id, type: "OTP" });
    }

    await OTP.deleteMany({
        admin_id: admin._id,
    });

    admin.token = signJWT({
        admin_id: admin._id,
    });

    const adminResponse = { ...admin };
    DISALLOW_ADMIN_RESPONSE_OBJECTS.forEach((key) => {
        delete adminResponse[key];
    });

    return context.json({
        success: true,
        message: "OTP is valid",
        admin: adminResponse
    });
}

export async function validatePassword(context) {
    const admin = await context.get("admin");
    const { password } = await context.req.json();

    const adminRecord = await Admin.findById(admin._id);
    const isPasswordValid = await adminRecord.comparePassword(password);

    if (!isPasswordValid) {
        return await handleFailedAuthAttempt({ context, adminId: admin._id, type: "Password" });
    }

    admin.token = signJWT({
        admin_id: admin._id,
    });

    const adminResponse = { ...admin };
    DISALLOW_ADMIN_RESPONSE_OBJECTS.forEach((key) => {
        delete adminResponse[key];
    });

    return context.json({
        success: true,
        message: "Password is valid",
        admin: adminResponse
    });
}

export default {
    requestOTP,
    validateOTP,
    validatePassword,
};
