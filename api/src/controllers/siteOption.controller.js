import SiteOption from "../database/models/SiteOption";

export async function getOptions(c) {
    const query = c.req.query();
    const findQuery = {};

    if (query.fields) {
        const fields = query.fields.split(",");
        findQuery.name = { $in: fields };
    }

    const isPublic = c.get("isPublic");
    if (isPublic) {
        findQuery.isPublic = true;
    }

    const options = await SiteOption.find(findQuery);

    return c.json({
        success: true,
        options,
    });
}

export async function updateOptions(c) {
    const body = await c.req.json();

    const publicOptions = [
        "site_logo",
        "site_title",
        "site_description",
        "cookie_consent",
        "allow_registration",
        "user_login_methods",
        "admin_login_methods",
    ];
    const privateOptions = ["email", "twilio"];

    const updateProcess = Object.keys(body).map((key) => {
        const isPublic = publicOptions.includes(key);
        const isPrivate = privateOptions.includes(key);

        if (!isPublic && !isPrivate) {
            return null;
        }

        return SiteOption.updateOne(
            { name: key },
            {
                value: body[key],
                isPublic,
            },
            { upsert: true }
        );
    });

    await Promise.all(updateProcess);

    return c.json({
        success: true,
        options: body,
    });
}
