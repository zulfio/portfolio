import nodemailer from "nodemailer";
import logger from "../logger";

const { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USERNAME, MAIL_PASSWORD } = process.env;
let nodemailerTransportOptions;

if (process.env.NODE_ENV === "development") {
    nodemailerTransportOptions = {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: MAIL_SECURE == "true",
    };
} else {
    nodemailerTransportOptions = {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: MAIL_SECURE == "true",
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
        },
    };
}
const transporter = nodemailer.createTransport(nodemailerTransportOptions);

/**
 *
 * @param {object} data {from, to, subject, text, html}
 */
export default async function sendEmail(data) {
    try {
        await transporter.sendMail(data);
    } catch (error) {
        logger.error(`Error: ${error.message} - ${error.stack}`);
    }
}
