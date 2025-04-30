const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    region: "default",
    endpoint: "https://sin1.contabostorage.com/internalappalhilal",
    credentials: {
        accessKeyId: "bb0ff921b91e55865e29ddc90836a868",
        secretAccessKey: "34fb097d4970946d98043290af4406cf"
    },
    s3BucketEndpoint: true
});

const upload = async (file) => {
    // Get current date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

    // Create the dated folder path
    const folderPath = `${year}/${month}/${day}`;
    const key = `${folderPath}/test.txt`;

    const params = {
        Bucket: "internalappalhilal",
        Key: key,
        Body: file,
        ACL: "public-read",
    };
    const result = await s3.upload(params).promise();


    // list all objects in the bucket
    const listParams = {
        Bucket: "internalappalhilal",
    };
    const listResult = await s3.listObjectsV2(listParams).promise();
    console.log("List result:", listResult);

    return { result };
};

const exampleFile = Buffer.from("This is a dummy file.");
upload(exampleFile)
    .then(response => console.log('Upload success:', response))
    .catch(error => console.error('Upload error:', error));