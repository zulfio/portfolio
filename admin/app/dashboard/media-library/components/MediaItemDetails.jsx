import Image from "next/image";
import toast from "react-hot-toast";
import Dialog from "@/components/micro/Dialog.jsx";
import { ArrowLeftIcon, ArrowRightIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/20/solid";
import copyTextToClipboard from "@/lib/utils/dom/copyTextToClipboard";
import { prettyBytes } from "@/lib/utils/string";

function Thumbnail({ item }) {
    if (item.type.startsWith("image")) {
        return (
            <Image
                src={item.s3Url}
                alt="media file"
                fill
                sizes="720px"
                style={{
                    objectFit: "contain",
                }}
            />
        );
    }

    if (item.type.startsWith("audio")) {
        // html 5 input type="audio"
        return (
            <audio controls className="w-full">
                <source src={item.s3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        );
    }

    if (item.type.startsWith("video")) {
        return (
            <video controls className="w-full">
                <source src={item.s3Url} type="video/mp4" />
                Your browser does not support the video element.
            </video>
        );
    }

    return <DocumentTextIcon className="mx-auto h-28 w-28 text-slate-400" />;
}

function MediaItemDetails({
    deleteMediaById,
    selectedItem,
    isDetailOpen,
    isFirst,
    isLast,
    onClose = () => { },
    onNext = () => { },
    onPrevious = () => { },
}) {
    function handleCopyURL() {
        copyTextToClipboard(selectedItem.s3Url);
        toast.success("URL copied to clipboard", {
            icon: "📋",
            position: "bottom-right",
        });
    }

    function handleDelete(id) {
        const confirm = window.confirm("Are you sure you want to delete this file?");
        if (!confirm) return;

        deleteMediaById(id);
    }

    return (
        <Dialog className="h-full max-w-screen-2xl rounded" open={isDetailOpen} onClose={onClose}>
            {selectedItem && (
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b text-slate-700 shadow">
                        <h2 className="ml-5 text-lg font-medium">Attachment details</h2>
                        <div className="flex divide-x border-l">
                            <button
                                disabled={isFirst}
                                type="button"
                                onClick={() => onPrevious(selectedItem)}
                                className="flex h-12 w-12 cursor-pointer items-center justify-center transition duration-150 ease-in-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>

                            <button
                                disabled={isLast}
                                type="button"
                                onClick={() => onNext(selectedItem)}
                                className="flex h-12 w-12 cursor-pointer items-center justify-center transition duration-150 ease-in-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ArrowRightIcon className="h-6 w-6" />
                            </button>

                            <div
                                onClick={onClose}
                                className="flex h-12 w-12 cursor-pointer items-center justify-center transition duration-150 ease-in-out hover:bg-slate-100"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>

                    <div className="grid h-full grid-cols-1 place-content-start bg-gray-100 md:grid-cols-3 md:place-content-stretch">
                        <div className="col-span-2 h-80 overflow-hidden border-r bg-white p-5 pb-0 md:h-full">
                            <div className="relative h-full max-h-[90%] w-full">
                                <Thumbnail item={selectedItem} />
                            </div>
                        </div>
                        <div className="col-span-1 text-xs text-slate-800">
                            <div className="mx-5 mb-5 flex flex-col gap-1 border-b border-gray-300 py-5">
                                <div>
                                    <strong>Uploaded on:</strong> {new Date(selectedItem.createdAt).toDateString()}
                                </div>
                                <div>
                                    <strong>Uploaded by:</strong> {selectedItem.author?.name || "Unknown"}
                                </div>
                                <div>
                                    <strong>File name:</strong> {selectedItem.fileName}
                                </div>
                                <div>
                                    <strong>File type:</strong> {selectedItem.type}
                                </div>
                                <div>
                                    <strong>File size:</strong> {prettyBytes(selectedItem.size)}
                                </div>
                                {selectedItem.type.startsWith("image") && (
                                    <div>
                                        <strong>Dimensions:</strong> {selectedItem.dimensions?.width} by{" "}
                                        {selectedItem.dimensions?.height} pixels
                                    </div>
                                )}
                            </div>
                            <div className="mx-5 border-b border-gray-300 pb-5">
                                <div>
                                    <span className="mb-1 block">File URL</span>
                                    <div className="relative">
                                        <input
                                            value={selectedItem.s3Url ? selectedItem.s3Url : `${window.location.origin}${selectedItem.s3Url}`}
                                            type="text"
                                            className="w-full rounded-md border-gray-200 p-2 text-sm shadow outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
                                            disabled
                                        />
                                        <button
                                            onClick={handleCopyURL}
                                            type="button"
                                            className="absolute right-2 top-1/2 h-4/6 -translate-y-1/2 transform rounded-md bg-slate-600 px-3 text-xs font-medium text-slate-50 transition duration-150 ease-in-out hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5 flex flex-wrap justify-center divide-x divide-slate-400 md:justify-start">
                                <span className="pr-3">
                                    <a
                                        href={selectedItem.s3Url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sky-700"
                                    >
                                        Download file
                                    </a>
                                </span>
                                <span className="pl-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(selectedItem._id)}
                                        className="text-rose-700"
                                    >
                                        Delete permanently
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Dialog>
    );
}

export default MediaItemDetails;
