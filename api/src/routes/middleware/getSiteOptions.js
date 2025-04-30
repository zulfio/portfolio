import SiteOption from "../../database/models/SiteOption";

const getSiteOptions = async (c, next) => {
    let siteOptions = await SiteOption.find();

    siteOptions = siteOptions.reduce((acc, option) => {
        acc[option.name] = option.value;
        return acc;
    }, {});

    c.set("siteOptions", siteOptions);
    await next();
};

export default getSiteOptions;
