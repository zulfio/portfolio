import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Dialog from "@/components/micro/Dialog.jsx";
import classNames from "@/lib/utils/dom/classNames.js";
import FileUpload from "./FileUpload.jsx";
import MediaItems from "./MediaItems.jsx";
import DateFilter from "./DateFilter.jsx";
import SearchInput from "../form/SearchInput.jsx";
import { Button } from "@tremor/react";
import { reqDeleteMedia, reqGetMedia, reqGetStaticDirrectory } from "@/backend/fileManager.js";
import copyTextToClipboard from "@/lib/utils/dom/copyTextToClipboard.js";
import { prettyBytes } from "@/lib/utils/string.js";


function FileManager({
    open = false,
    selectMultiple = true,
    onSelect = () => { },
    onClose = () => { },
    trigger = "Select Media",
    type,
    withPreview = false,
    defaultValues = [],
}) {
    const LIMIT = 20;

    const [isOpened, setIsOpened] = useState(false);
    const [activeTab, setActiveTab] = useState("library");
    const [isFetchingMedia, setIsFetchingMedia] = useState(false);
    const [refreshMediaTrigger, setRefreshMediaTrigger] = useState(0);

    const [directories, setDirectories] = useState([]);
    const [media, setMedia] = useState([]);
    const [total, setTotal] = useState(0);
    const [options, setOptions] = useState({
        page: 1,
        date: "",
    });

    const mediaItemsRef = useRef(null);

    const [selectedItems, setSelectedItems] = useState(defaultValues);
    const lastItem = selectedItems[selectedItems.length - 1];

    const getMediaData = useCallback(
        async (filterOptions) => {
            try {
                setIsFetchingMedia(true);

                let { media, total } = await reqGetMedia({
                    limit: LIMIT,
                    type,
                    ...filterOptions,
                });

                media = media.map(item => {
                    const src = item.s3Url ?? `${process.env.NEXT_PUBLIC_STATIC_PATH}/${item.path}`;
                    return {
                        ...item,
                        url: src,
                    }
                })

                setTotal(total);
                setMedia(media);
                setOptions(filterOptions);
            } catch (error) {
                toast.error("Failed to fetch media");
            } finally {
                setIsFetchingMedia(false);
            }
        },
        [type],
    );

    async function deleteMediaById(mediaId) {
        try {
            const { success } = await reqDeleteMedia(mediaId);
            if (!success) throw new Error("Failed to delete media.");

            await getMediaData({
                page: 1,
            });
            mediaItemsRef.current.reset();

            toast.success("Media has been deleted.", {
                duration: 5000,
                position: "bottom-right",
            });
        } catch (error) {
            toast.error("Failed to delete media.");
        }
    }

    async function loadMore(nextPageNumber) {
        try {
            setIsFetchingMedia(true);

            let { media, total } = await reqGetMedia({
                limit: LIMIT,
                type,
                page: nextPageNumber,
            });

            setTotal(total);
            setMedia((c) => [...c, ...media]);
            setOptions((c) => ({ ...c, page: nextPageNumber }));

            setTimeout(() => {
                document.querySelector(".last-media-item")?.scrollIntoView({ behavior: "smooth" });
            }, 0);
        } catch (error) {
            toast.error("Failed to fetch media");
        } finally {
            setIsFetchingMedia(false);
        }
    }

    async function getDirectories() {
        try {
            const { directories } = await reqGetStaticDirrectory();
            setDirectories(directories);
        } catch (error) {
            toast.error("Failed to fetch directories");
        }
    }

    useEffect(() => {
        (async () => {
            await getMediaData({ page: 1, date: options.date });
        })();
    }, [options.date, refreshMediaTrigger, getMediaData]);

    useEffect(() => {
        getDirectories();
    }, []);

    useEffect(() => {
        setIsOpened(open);
    }, [open]);

    return (
        <>
            <Dialog
                open={isOpened}
                onClose={() => {
                    setIsOpened(false);
                    onClose();
                }}
                className="h-[95vh] max-h-none w-[99%] max-w-none"
            >
                <div className="relative flex h-full flex-col">
                    <h1 className="py-3 pl-4 text-xl font-bold text-slate-800">Select or Upload Media</h1>
                    <div className="relative z-20 -mb-[1px] ml-2 flex">
                        <button
                            type="button"
                            onClick={() => setActiveTab("upload")}
                            className={classNames(
                                "px-2 py-2 text-sm text-slate-700",
                                activeTab === "upload" ? "border border-b-0 bg-white font-medium" : "",
                            )}
                        >
                            Upload Files
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("library")}
                            className={classNames(
                                "px-2 py-2 text-sm text-slate-700",
                                activeTab === "library" ? "border border-b-0 bg-white font-medium" : "",
                            )}
                        >
                            Media Library
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden border-t border-slate-200">
                        <div className={classNames(activeTab === "upload" ? "block h-full" : "hidden")}>
                            <div className="flex h-full items-center justify-center">
                                <div className="max-w-2xl flex-1 px-3">
                                    <FileUpload
                                        description="Maximum upload file size: 10 MB."
                                        maxSize={10}
                                        accept="*"
                                        multiple={selectMultiple}
                                        onChange={() => {
                                            setRefreshMediaTrigger((c) => c + 1);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classNames(activeTab === "library" ? "block h-full" : "hidden")}>
                            {/* media library */}
                            <div className="flex h-full justify-between">
                                <div className="flex flex-1 flex-col p-4">
                                    <div className="mb-4 flex flex-wrap justify-center gap-3 sm:justify-between">
                                        <div className="w-full sm:w-auto">
                                            <DateFilter
                                                value={options.date}
                                                data={directories}
                                                onChange={(data) => setOptions((c) => ({ ...c, date: data }))}
                                            />
                                        </div>
                                        <div className="w-full sm:w-auto">
                                            <SearchInput />
                                        </div>
                                    </div>
                                    {!media?.length ? (
                                        <div className="text-center text-gray-500">
                                            No media found, try uploading some files.
                                        </div>
                                    ) : (
                                        <>
                                            <MediaItems
                                                ref={mediaItemsRef}
                                                media={media}
                                                selectMultiple={selectMultiple}
                                                onSelected={(items) => {
                                                    setSelectedItems(items);
                                                }}
                                            />
                                            {total && options.page * LIMIT < total ? (
                                                <div className="mt-5 flex justify-center">
                                                    <Button
                                                        onClick={() => {
                                                            loadMore(options.page + 1);
                                                        }}
                                                        variant="secondary"
                                                        size="xs"
                                                        disabled={isFetchingMedia}
                                                    >
                                                        Load More
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </div>
                                <div className="hidden h-full w-80 bg-slate-100 lg:block">
                                    {selectedItems.length && lastItem ? (
                                        <div className="text-xs text-slate-800">
                                            <div className="mx-5 mb-5 flex flex-col gap-1 border-b border-gray-300 py-5">
                                                <div>
                                                    <strong>Uploaded on:</strong>{" "}
                                                    {new Date(lastItem.createdAt).toDateString()}
                                                </div>
                                                <div>
                                                    <strong>Uploaded by:</strong> {lastItem.author?.name || "Unknown"}
                                                </div>
                                                <div>
                                                    <strong>File name:</strong> {lastItem.fileName}
                                                </div>
                                                <div>
                                                    <strong>File type:</strong> {lastItem.type}
                                                </div>
                                                <div>
                                                    <strong>File size:</strong> {prettyBytes(lastItem.size)}
                                                </div>
                                                {lastItem.type.startsWith("image") && (
                                                    <div>
                                                        <strong>Dimensions:</strong> {lastItem.dimensions?.width} by{" "}
                                                        {lastItem.dimensions?.height} pixels
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mx-5 border-b border-gray-300 pb-5">
                                                <div>
                                                    <span className="mb-1 block">File URL</span>
                                                    <div className="relative">
                                                        <input
                                                            value={`${window.location.origin}${process.env.NEXT_PUBLIC_STATIC_PATH}/${lastItem.path}`}
                                                            type="text"
                                                            className="w-full rounded-md border-gray-200 p-2 text-sm shadow outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
                                                            disabled
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                copyTextToClipboard(
                                                                    `${window.location.origin}${process.env.NEXT_PUBLIC_STATIC_PATH}/${lastItem.path}`,
                                                                );
                                                                toast.success("URL copied to clipboard", {
                                                                    icon: "📋",
                                                                    position: "bottom-right",
                                                                });
                                                            }}
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
                                                        href={`${window.location.origin}${process.env.NEXT_PUBLIC_STATIC_PATH}/${lastItem.path}`}
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
                                                        onClick={() => {
                                                            const confirm = window.confirm(
                                                                "Are you sure you want to delete this file?",
                                                            );
                                                            if (!confirm) return;

                                                            deleteMediaById(lastItem._id);
                                                        }}
                                                        className="text-rose-700"
                                                    >
                                                        Delete permanently
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t p-3 text-right">
                        <Button
                            type="button"
                            variant="primary"
                            color={selectedItems.length ? "emerald" : "gray"}
                            size="xs"
                            className="w-full sm:w-auto"
                            disabled={!selectedItems.length}
                            onClick={() => {
                                onSelect(selectedItems);
                                setSelectedItems(selectedItems);
                                setIsOpened(false);
                                onClose();
                            }}
                        >
                            Select
                        </Button>
                    </div>
                </div>
            </Dialog>

            {withPreview && selectedItems.length > 0 && (
                <div className="mb-3">
                    <MediaItems media={selectedItems} isPreview={true} />
                </div>
            )}

            <div className="flex items-center gap-3">
                {selectedItems.length > 0 && (
                    <Button
                        variant="secondary"
                        type="button"
                        size="xs"
                        color="rose"
                        onClick={() => {
                            setSelectedItems([]);
                            onSelect([]);
                        }}
                    >
                        <span className="text-rose-600">Reset</span>
                    </Button>
                )}
                <Button
                    variant="primary"
                    type="button"
                    size="xs"
                    onClick={() => {
                        setIsOpened(true);
                        getMediaData({ page: 1 });
                        onClose();
                    }}
                >
                    <span className="text-white">{trigger}</span>
                </Button>
            </div>
        </>
    );
}

export default FileManager;
