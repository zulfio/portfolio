import Media from "../../database/models/Media";

async function checkMediaByID(c, next) {
    const admin = c.get("loggedInAdmin");
    const id = c.req.param("id");

    const media = await Media.findById(id);
    if (!media || !media.author?.equals(admin._id)) {
        return c.json(
            {
                success: false,
                message: "Media not found",
            },
            404
        );
    }

    c.set("media", media);
    await next();
}

export default checkMediaByID;
