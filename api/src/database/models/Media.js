import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },
        fileName: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            default: "document",
        },
        meta: {
            type: Object,
            default: {},
        },
        s3key: String,
    },
    {
        timestamps: true,
        collection: "media",
    }
);

Schema.index({ createdAt: 1, type: 1 });

Schema.post("find", async function (docs, next) {
    const newDoc = docs.map(appendS3Url);
    await Promise.all(newDoc);
});

Schema.post("insertMany", async function (docs) {
    const newDocs = docs.map(appendS3Url);
    await Promise.all(newDocs);
});

Schema.post("findOne", async function (doc, next) {
    if (doc) await appendS3Url(doc);
});

async function appendS3Url(file) {
    if (!file.s3key) return;
    if (!file.s3key.startsWith(process.env.S3_BUCKET_NAME)) {
        file.s3key = `${process.env.S3_BUCKET_NAME}/${file.s3key}`
    }

    const s3Url = `https://sin1.contabostorage.com/${process.env.S3_TENANT_ID}:${process.env.S3_BUCKET_NAME}/${file.s3key}`;

    file._doc = {
        ...file._doc,
        s3Url,
    };
}

export default mongoose.models.Media || mongoose.model("Media", Schema);
