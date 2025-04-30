import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import path from "path";
import QRCode from "qrcode";

/**
 * Generates a Data URL for an asset QR code with specified header and footer texts.
 *
 * @param {Object} options - The options for generating the QR code.
 * @param {string} [options.headerText=""] - The text to display at the top of the QR code.
 * @param {string} [options.footerTextOne=""] - The text to display between the QR code and the footer.
 * @param {string} [options.footerTextTwo=""] - The text to display at the bottom of the QR code.
 * @param {string} [options.qrData=""] - The data to encode in the QR code.
 * @returns {Promise<string>} A promise that resolves to a Data URL of the generated QR code image.
 */
async function generateAssetQRDataURL({ headerText = "", footerTextOne = "", footerTextTwo = "", qrData = "" }) {
    GlobalFonts.registerFromPath(path.join(__dirname, '../../../public/fonts/Roboto-Bold.ttf'), "Roboto-Bold");
    GlobalFonts.registerFromPath(path.join(__dirname, '../../../public/fonts/Roboto-Regular.ttf'), "Roboto-Regular");

    const qrCodeSize = 256;
    const canvas = createCanvas(qrCodeSize, qrCodeSize + 90)
    const context = canvas.getContext('2d');

    // Fill the entire canvas background with white to remove transparency
    context.fillStyle = '#fff'; // Background color white
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set background color to black for headerText and footerTextTwo areas
    context.fillStyle = '#000'; // Background color black

    // Draw the background rectangle for the headerText
    context.fillRect(0, 0, canvas.width, 30);

    // Draw the background rectangle for the footerTextTwo (below the QR code)
    context.fillRect(0, qrCodeSize + 60, canvas.width, 30);

    // Set text properties for headerText and footerTextTwo (white text)
    context.font = '14px Roboto';
    context.textAlign = 'center';
    context.fillStyle = '#fff'; // Text color white

    // Draw the company name on top of the black rectangle
    context.fillText(headerText, canvas.width / 2, 20);

    // Draw the company address below the QR code, also on the black rectangle
    context.fillText(footerTextTwo, canvas.width / 2, qrCodeSize + 80);

    // Now generate the QR code and place it between the text
    await new Promise((resolve, reject) => {
        QRCode.toDataURL(
            qrData,
            { margin: 1 },
            async function (err, dataurl) {
                if (err) reject(err);

                const qrImage = await loadImage(dataurl);
                context.drawImage(qrImage, 0, 30, qrCodeSize, qrCodeSize);

                resolve();
            }
        );
    })

    // Change the text color for footerTextOne to black
    context.fillStyle = '#000'; // Text color black
    context.font = '14px Roboto';

    // Add the company code (no background) between the QR code and the company address
    context.fillText(footerTextOne, canvas.width / 2, qrCodeSize + 40);

    return canvas.toDataURL('image/png')
}

export default generateAssetQRDataURL;