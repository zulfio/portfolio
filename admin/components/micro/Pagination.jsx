import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { usePagination } from "@/lib/hooks/usePagination";

function paginationItem({ type, page, disabled, selected, onPageChange, onPrevious, onNext }) {
    switch (type) {
        case "previous":
            return (
                <button
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    type="button"
                    disabled={disabled}
                    onClick={onPrevious}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            );
        case "page":
            return (
                <button
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ${
                        selected
                            ? "z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            : "text-gray-900 hover:bg-gray-50"
                    }`}
                    type="button"
                    disabled={disabled || selected}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            );
        case "end-ellipsis":
            return (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                </span>
            );
        case "next":
            return (
                <button
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    type="button"
                    disabled={disabled}
                    onClick={onNext}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            );
        default:
            break;
    }
}

function Pagination({
    currentPage = 1,
    totalItems = 0,
    perPage = 10,
    onPageChange = () => {},
    onPrevious = () => {},
    onNext = () => {},
}) {
    const pageNumbers = usePagination({
        currentPage: currentPage || 1,
        count: Math.ceil(totalItems / perPage),
    });

    return (
        <div className="bg-white px-4 py-3 sm:px-6">
            <div className="flex w-full flex-1 justify-between sm:hidden">
                <button
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    type="button"
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    type="button"
                    onClick={onNext}
                    disabled={currentPage === pageNumbers.filter((item) => item.type === "page").length}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex">
                <div className="m-auto mr-3">
                    <span className="text-xs text-slate-800">{totalItems} items</span>
                </div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    {pageNumbers.map((item, index) => {
                        return (
                            <div key={index}>
                                {paginationItem({
                                    ...item,
                                    currentPage,
                                    onPageChange,
                                    onPrevious,
                                    onNext,
                                })}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

export default Pagination;
