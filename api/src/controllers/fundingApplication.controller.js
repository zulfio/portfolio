import FundingApplication from "../database/models/FundingApplication";
import { numberToRoman } from "../lib/utils/formatter";
import FilterAPI from "../lib/utils/database/FilterAPI";

export async function createFundingApplication(context) {
    let body = await context.req.json();
    let ppd_number = "";
    const currentDate = new Date(body.requestDate);
    const currentMonth = currentDate.getMonth() + 1;
    const currentMonthInRoman = numberToRoman(currentMonth);
    const currentYear = currentDate.getFullYear();

    const latestDataThisMonth = await FundingApplication.find({
        "createdAtObj.month": currentMonth,
        "createdAtObj.year": currentYear,
        "program": body.program,
    }).sort({ createdAt: -1 }).limit(1);

    if (latestDataThisMonth.length === 0) {
        ppd_number = `1/${body.program}/${currentMonthInRoman}/${currentYear}`;
    } else {
        const number = parseInt(latestDataThisMonth[0].ppdNumber.split("/")[0]) + 1;
        ppd_number = `${number}/${body.program}/${currentMonthInRoman}/${currentYear}`;
    }

    const newFundingApplication = await FundingApplication.create({
        ...body,
        ppdNumber: ppd_number.toUpperCase(),
        createdAtObj: {
            day: currentDate.getDate(),
            month: currentMonth,
            year: currentYear,
        },
    });

    return context.json({
        success: true,
        message: "Pengajuan dana berhasil dibuat",
        fundingApplication: newFundingApplication,
    });
}

export async function getFundingApplications(context) {
    const query = await context.req.query();
    const totalQuery = {
        ...query
    };

    if (query.search) {
        query.ppdNumber = {
            $regex: query.search,
            $options: "i",
        };
        totalQuery.ppdNumber = query.ppdNumber;
    }
    delete query.search;

    if (query.isAccepted) {
        const isAccepted = query.isAccepted === "true";

        if (isAccepted) {
            // For true: both must be true (AND)
            query.acceptedByManager = true;
            query.acceptedByDirector = true;

            totalQuery.acceptedByManager = true;
            totalQuery.acceptedByDirector = true;
        } else {
            // For false: either can be false (OR)
            query.$or = [
                { acceptedByManager: false },
                { acceptedByDirector: false }
            ];

            totalQuery.$or = [
                { acceptedByManager: false },
                { acceptedByDirector: false }
            ];
        }
    }
    delete query.isAccepted;
    delete totalQuery.isAccepted;

    const fundingApplications = await new FilterAPI(FundingApplication, query).get().sort().pagination().fields().populate('employee').data;

    const excludedTotalQueryKeys = ["sort", "page", "limit", "fields"];
    excludedTotalQueryKeys.forEach((key) => {
        delete totalQuery[key];
    });
    const total = await FundingApplication.countDocuments(totalQuery);

    return context.json({
        success: true,
        fundingApplications,
        total,
    });
}

export async function getFundingApplication(context) {
    const currentFundingApplication = context.get("funding_application");
    const fundingApplication = await FundingApplication.findById(currentFundingApplication._id)
        .populate({
            path: 'employee',
            populate: {
                path: 'signature'
            }
        })
        .populate({
            path: 'approvedBy',
            populate: {
                path: 'signature'
            }
        });


    return context.json({
        success: true,
        fundingApplication,
    });
}

export async function deleteFundingApplication(context) {
    const fundingApplication = context.get("funding_application");
    await FundingApplication.findByIdAndDelete(fundingApplication._id);

    return context.json({
        success: true,
    });
}

export async function updateFundingApplication(context) {
    const currentFundingApplication = context.get("funding_application");
    const loggedInAdmin = context.get("loggedInAdmin");
    const body = await context.req.json();

    const historyEntries = [];
    Object.keys(body).forEach(key => {
        if (JSON.stringify(currentFundingApplication[key]) !== JSON.stringify(body[key])) {
            historyEntries.push({
                name: loggedInAdmin.name,
                key: key,
                oldData: currentFundingApplication[key],
                newData: body[key],
                date: new Date(),
            });
        }
    });

    if (historyEntries.length > 0) {
        await FundingApplication.findByIdAndUpdate(
            currentFundingApplication._id,
            {
                ...body,
                $push: {
                    updateHistory: {
                        $each: historyEntries
                    }
                }
            },
            { new: true }
        );
    } else {
        await FundingApplication.findByIdAndUpdate(currentFundingApplication._id, body);
    }

    return context.json({
        success: true,
    });
}