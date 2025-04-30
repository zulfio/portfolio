import mongoose from "mongoose";
import { DEPARTEMENTS } from "../../config/CONSTANTS";

const Schema = new mongoose.Schema(
    {
        profile_picture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["laki-laki", "perempuan"],
        },
        date_of_birth: Date,
        email: String,
        phone_number: String,
        address: {
            city: { type: String, default: "" },
            province: { type: String, default: "" },
            subdistrict: { type: String, default: "" },
            complete: { type: String, default: "" },
        },
        signature: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
        },
        nik_number: String,
        npwp_number: String,
        other_documents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Media",
            }
        ],
        nip: String,
        position: {
            type: String,
            enum: ["staff", "manager", "director", "other"],
            default: "other",
        },
        department: {
            type: String,
            enum: [...DEPARTEMENTS],
            default: "lainnya",
        },
        division: {
            type: String,
            enum: ["finance", "marcomm", "fundraising", "program", "secretariat", "other"],
            default: "other",
        },
        workplace: { type: mongoose.Types.ObjectId, ref: "Workplace" },
        sallary: {
            type: Number,
            default: 0,
        },
        join_at: Date,
        description: String,
    },
    { timestamps: true, collection: "employees" },
);

Schema.pre("save", async function (next) {
    const employee = this;

    if (employee.nip) {
        next();
        return;
    }

    // Ensure the date_of_birth and join_at are present
    if (!employee.date_of_birth && !employee.join_at) {
        employee.nip = "invalid tanggal lahir atau tanggal bergabung";
        next();
    } else {
        const dob = new Date(employee.date_of_birth);
        const join = new Date(employee.join_at);

        // Extract year, month, and day
        const dobYear = dob.getFullYear().toString().padStart(4, "0");
        const dobMonth = (dob.getMonth() + 1).toString().padStart(2, "0");
        const dobDay = dob.getDate().toString().padStart(2, "0");

        const joinYear = join.getFullYear().toString().padStart(4, "0");
        const joinMonth = (join.getMonth() + 1).toString().padStart(2, "0");

        // Find the latest NIP matching the date of birth and join year and month pattern
        const nipPattern = `${dobYear}${dobMonth}${dobDay}${joinYear}${joinMonth}`;

        const latestEmployee = await mongoose.models.Employee.findOne({
            nip: new RegExp(`^${nipPattern}`)
        }).sort({ nip: -1 }).exec();

        let incremental = "0001"; // Default incremental for new NIP

        if (latestEmployee) {
            // Extract the incremental part from the latest NIP and increment it
            const latestNip = latestEmployee.nip;
            const lastIncremental = parseInt(latestNip.slice(-4), 10); // Get last 4 digits
            incremental = (lastIncremental + 1).toString().padStart(4, "0");
        }

        // Combine everything to form the new NIP
        const newNip = `${dobYear}${dobMonth}${dobDay}${joinYear}${joinMonth}${incremental}`;
        employee.nip = newNip;

        next();
    }
});


export default mongoose.models.Employee || mongoose.model("Employee", Schema);
