import stringSimilarity from "string-similarity";
import Employee from "../src/database/models/Employee";
import FundingApplication from "../src/database/models/FundingApplication";

import data from "./pengajuan.AmountRequest.json";
import mongoose from "mongoose";

const acceptedAmountSources = ["dskl", "amil", "zakat", "sedekah", "wakaf", "aqiqah", "lainnya"];
const acceptedPrograms = [
    "pendidikan", "sosial", "dakwah", "kesehatan", "ekonomi", "operasional_tugas_amil", "biaya_syiar", "pembelian_aset", "biaya_pelatihan_amil", "operasional_kantor", "operasional_amil", "pinbuk_donasi", "fee_operasional_amil", "refund", "maintenance_kantor", "maintenance_kendaraan", "maintenance_aplikasi", "lainnya"
]
const acceptedMustahik = [
    "amil",
    "fakir",
    "miskin",
    "mualaf",
    "riqab",
    "gharimin",
    "fisabilillah",
    "ibnu_sabil",
    "lainnya",
]
const acceptedPaymentMethod = ["transfer", "cash", "debit", "virtual_account", "lainnya"];
const acceptedApplicationType = ["uang_muka", "reimbursement", "pembayaran", "program", "lainnya"];

try {
    await mongoose.connect("mongodb://localhost:27001/crowdfundingapp", {
        autoIndex: true,
    });

    console.log("Database connection established successfully.");
} catch (error) {
    console.log("Database connection failed.");

    process.exit(1);
}

async function importFundingApplications() {

    const success = [];
    const failed = [];

    for (let i = 0; i < data.length; i++) {
        const pengajuan = data[i];

        try {
            const isPPDNumberExist = await FundingApplication.find({
                ppdNumber: pengajuan.ppd_number
            });

            if (isPPDNumberExist.length > 0) {
                pengajuan.ppd_number = `${pengajuan.ppd_number}-${Math.random().toString(36).substring(7)}`;
            }


            const currentEmployee = pengajuan.user ? await Employee.findOne({
                name: {
                    $regex: pengajuan.user.name.replace(' ', '.*'),
                    $options: "i"
                }
            }) : {
                _id: "6723097dbe35d44a27c57ac5"
            };
            const currentApplovedBy = pengajuan.approvedBy ? await Employee.findOne(
                {
                    name: {
                        $regex: pengajuan.approvedBy.name.replace(' ', '.*'),
                        $options: "i"
                    }
                }
            ) : {
                _id: "6723097dbe35d44a27c57ac5"
            };
            const amountSource = stringSimilarity.findBestMatch(pengajuan.amountSource?.title || 'lainnya', acceptedAmountSources).bestMatch.target;
            const program = stringSimilarity.findBestMatch(pengajuan.program || 'lainnya', acceptedPrograms).bestMatch.target;
            const mustahik = stringSimilarity.findBestMatch(pengajuan.mustahik || 'lainnya', acceptedMustahik).bestMatch.target;
            const paymentMethod = stringSimilarity.findBestMatch(pengajuan.transferType || 'lainnya', acceptedPaymentMethod).bestMatch.target;
            const applicationType = stringSimilarity.findBestMatch(pengajuan.type || 'lainnya', acceptedApplicationType).bestMatch.target;

            if (!pengajuan.dateObj) {
                const date = new Date(pengajuan.createdAt);
                pengajuan.dateObj = {
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear() - 2000
                }
            }

            const dataToInsert = {
                employee: currentEmployee._id,
                ppdNumber: pengajuan.ppd_number,
                totalAmount: pengajuan.amount,
                amountSource,
                description: pengajuan.purpose,
                program,
                mustahik,
                payTo: pengajuan.paidFor || "lainnya",
                approvedBy: currentApplovedBy._id,
                paymentMethod,
                paymentCredentials: pengajuan.bankCredentials,
                acceptedByManager: pengajuan.acceptedByManager || false,
                acceptedByDirector: pengajuan.acceptedByDirector || false,
                applicationType: applicationType,
                createdAtObj: {
                    day: pengajuan.dateObj.day || 1 * 1,
                    month: pengajuan.dateObj.month || 1 * 1,
                    year: pengajuan.dateObj.year || 20 * 1,
                },
                createdAt: new Date(pengajuan.createdAt.$date),
            }

            const fundingApplication = await FundingApplication.create(dataToInsert);
            success.push(fundingApplication._id);
        } catch (error) {
            failed.push(pengajuan);

            console.log("message", error.message);
            console.log("error on data", pengajuan);
            process.exit(1);
        }
    }

    if (failed.length > 0) {
        console.log("failed data", failed.length);
    }

    if (success.length > 0) {
        console.log("success data", success.length);
    }
}

await importFundingApplications();



console.log("import funding applications done");
process.exit(0);