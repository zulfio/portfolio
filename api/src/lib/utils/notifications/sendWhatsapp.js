import formatter from "../formatter";

/**
 *
 * @param {Object} payload {chatId: string, text: string}
 * @returns {Promise}
 */
export default async function sendMessage(payload) {
    payload = {
        ...payload,
        chatId: formatter.toWhatsAppFormat(payload.chatId),
        session: process.env.WA_API_SESSION_NAME,
    };
    const ENDPOINT = `${process.env.WA_API_HOST}/api/sendText`;

    const req = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.WA_API_KEY,
        },
    });

    if (req.status !== 201) {
        const res = await req.json();
        throw new Error(res.message || req.statusText);
    }
}
