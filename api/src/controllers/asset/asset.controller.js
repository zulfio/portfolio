import PDFDocument from 'pdfkit';

import Asset from "../../database/models/Asset/Asset";
import FilterAPI from "../../lib/utils/database/FilterAPI";
import generateAssetQRDataURL from "../../lib/utils/file/generateAssetQRDataURL";

export async function getAssets(context) {
    const query = await context.req.query();
    const totalQuery = {
        ...query,
    };

    if (query.search) {
        query.$or = [
            { name: { $regex: query.search, $options: "i" } },
            { code: { $regex: query.search, $options: "i" } }
        ];
        totalQuery.$or = query.$or;
    }
    delete query.search;
    delete totalQuery.search;

    let assets = await new FilterAPI(Asset, query)
        .get()
        .sort()
        .pagination()
        .fields()
        .populate('author', 'name')
        .populate('location', 'name')
        .populate('category', 'name')
        .populate('sub_category', 'name')
        .populate('brand', 'name')
        .populate('store', 'name')
        .data;

    const excludedTotalQueryKeys = ["sort", "page", "limit", "fields"];
    excludedTotalQueryKeys.forEach((key) => {
        delete totalQuery[key];
    });

    const total = await Asset.countDocuments(totalQuery);

    return context.json({
        success: true,
        assets,
        total,
    });
}

export async function getAsset(context) {
    const query = await context.req.query();

    const asset = await Asset.findById(context.get("asset")._id).populate('author', 'name')
        .populate('location')
        .populate('category')
        .populate('sub_category')
        .populate('brand')
        .populate('store')
        .populate('image')
        .populate('attachments');

    let assetObj = asset.toObject();

    if (query.withQR) {
        const qrData = await generateAssetQRDataURL({
            headerText: assetObj.category?.name,
            footerTextOne: assetObj.code,
            footerTextTwo: assetObj.name,
            qrData: `${process.env.MAIN_CLIENT_URL}/asset-detail/${assetObj._id}`
        });
        assetObj = { ...assetObj, qrData };
    }

    return context.json({
        success: true,
        asset: assetObj,
    });
}

export async function createAsset(context) {
    const body = await context.req.json();

    const latestAsset = await Asset.findOne().sort({ createdAt: -1 });
    const latestAssetCode = latestAsset ? latestAsset.code : "0/INV/01/2021";
    const [latestNumber, , latestMonth, latestYear] = latestAssetCode.split("/");

    const currentDate = new Date();
    const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const currentYear = currentDate.getFullYear().toString();

    let newNumber;
    if (currentMonth === latestMonth && currentYear === latestYear) {
        newNumber = parseInt(latestNumber, 10) + 1;
    } else {
        newNumber = 1;
    }

    const assetCode = `${newNumber}/INV/${currentMonth}/${currentYear}`;

    body.code = assetCode;

    const newAsset = await Asset.create(body);

    return context.json({
        success: true,
        asset: newAsset,
    });
}

export async function updateAsset(context) {
    const asset = context.get("asset");
    const body = await context.req.json();

    const updatedAsset = await Asset.findByIdAndUpdate(asset._id, body, { new: true });

    return context.json({
        success: true,
        asset: updatedAsset,
    });
}

export async function deleteAsset(context) {
    const asset = context.get("asset");

    await Asset.findByIdAndDelete(asset._id);

    return context.json({
        success: true,
    });
}

export async function deleteAssets(context) {
    const body = await context.req.json();

    await Asset.deleteMany({ _id: { $in: body.ids } });

    return context.json({
        success: true,
    });
}


export async function exportAssetQRPDF(context) {
    const query = await context.req.query();
    const assetIds = query.ids?.split(",").filter(Boolean);
    const assets = await Asset.find({ _id: { $in: assetIds } }).populate('category');

    const doc = new PDFDocument({ size: 'A4' });
    doc.info.Title = "Assets QR Code";

    const qrWidth = 100;
    let positionX = 10;
    let positionY = 10;
    const maxPositionX = 500;
    const maxPositionY = 700;

    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const qrData = await generateAssetQRDataURL({
            headerText: asset.category?.name,
            footerTextOne: asset.code,
            footerTextTwo: asset.name,
            qrData: `${process.env.MAIN_CLIENT_URL}/asset-detail/${asset._id}`
        });

        doc.image(qrData, positionX, positionY, { width: qrWidth });
        positionX += qrWidth + 10;

        if (positionX > maxPositionX) {
            positionX = 10;
            positionY += 150;
        }

        if (positionY > maxPositionY) {
            doc.addPage();
            positionX = 10;
            positionY = 10;
        }
    }

    doc.end();
    context.header("Content-Disposition", 'inline; filename="my-custom-filename.pdf"');
    return context.body(doc);
}
