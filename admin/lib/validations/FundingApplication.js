import { z } from "zod";

const Schema = z.object({
    employee: z.string()
        .min(1, {
            message: "Pemohon wajib diisi",
        })
        .max(100),
    totalAmount: z.number().min(1, {
        message: "Dana wajib diisi",
    }).max(100_000_000_000),
    amountSource: z.string().min(1, {
        message: "Sumber Dana wajib diisi",
    }).max(100),
    description: z.string().max(1000).optional(),
    program: z.string().min(1, {
        message: "Program wajib diisi",
    }).max(100),
    mustahik: z.string().max(100).optional(),
    payTo: z.string().min(1, {
        message: "dibayarkan kepada waib diisi",
    }).max(100),
    approvedBy: z.string().min(1, {
        message: "Disetujui oleh wajib diisi",
    }).max(100),
    paymentMethod: z.string().min(1, {
        message: "Metode Pembayaran wajib diisi",
    }).max(100),
    paymentCredentials: z.string().max(500).optional(),
    applicationType: z.string().min(1, {
        message: "Tipe pengajuan wajib diisi",
    }).max(100)
});

const DefaultValues = {
    employee: "",
    totalAmount: 0,
    amountSource: "",
    description: "",
    program: "",
    mustahik: "lainnya",
    payTo: "",
    approvedBy: "",
    paymentMethod: "lainnya",
    paymentCredentials: "",
    applicationType: "pembayaran",
};

const FundingApplication = {
    Schema,
    DefaultValues,
};

export default FundingApplication;
