"use client";

import { useFundingApplication } from "@/lib/hooks/fundingApplication.hook";
import { ClockIcon, ArrowRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import date from 'date-and-time';
import { useParams } from "next/navigation";

function FundingApplicationUpdateHistory() {
    const params = useParams();
    const { data, isSuccess, isLoading } = useFundingApplication(params.id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const formatFieldName = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return date.format(d, 'MMM D, YYYY hh:mm A');
    };

    const renderValue = (value) => {
        if (typeof value === 'boolean') {
            return (
                <div className="flex items-center">
                    {value ? (
                        <>
                            <CheckIcon className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-700">Yes</span>
                        </>
                    ) : (
                        <>
                            <XMarkIcon className="w-4 h-4 text-red-500 mr-1" />
                            <span className="text-red-700">No</span>
                        </>
                    )}
                </div>
            );
        }
        return value;
    };

    return (
        <div className="">
            {isSuccess &&
                [...data.updateHistory].reverse().map((item) => (
                    <div
                        key={item._id}
                        className="relative border-l-2 border-slate-200 pb-6 pl-6 last:border-transparent"
                    >
                        {/* Timeline dot */}
                        <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full border-2 border-sky-500 bg-white" />

                        {/* Content */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                            {/* Header */}
                            <div className="mb-5">
                                <span className="font-medium text-gray-900">{item.name}</span>
                                <div className="flex items-center text-xs text-gray-500">
                                    <ClockIcon className="mr-1 h-4 w-4" />
                                    {formatDate(item.date)}
                                </div>
                            </div>

                            {/* Change details */}
                            <div className="space-y-2">
                                <div className="text-sm text-gray-600">
                                    Changed <span className="font-medium">{formatFieldName(item.key)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className={`px-3 py-1 rounded ${typeof item.oldData === 'boolean'
                                        ? item.oldData
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                        : 'bg-gray-100'
                                        }`}>
                                        {renderValue(item.oldData)}
                                    </span>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                                    <span className={`px-3 py-1 rounded font-medium ${typeof item.newData === 'boolean'
                                        ? item.newData
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                        : 'bg-emerald-50 text-emerald-700'
                                        }`}>
                                        {renderValue(item.newData)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {isSuccess && data?.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No update history available
                </div>
            )}
        </div>
    );
}

export default FundingApplicationUpdateHistory;