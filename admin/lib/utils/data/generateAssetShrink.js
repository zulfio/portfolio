import DateTime from "date-and-time";

export default function generateAssetShrink(asset) {
    const shrinkPerMonth = (asset.total_units * asset.price_per_unit) / (asset.economic_life * 12);
    const assetAgeInMonth = Math.ceil(DateTime.subtract(new Date(), new Date(asset.purchase_date)).toDays() / 30);
    const totalShrink = shrinkPerMonth * assetAgeInMonth;
    const currentValue = asset.price_per_unit * asset.total_units - totalShrink;

    return {
        shrinkPerMonth,
        assetAgeInMonth,
        totalShrink,
        currentValue,
    };
}