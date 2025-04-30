"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card } from "@tremor/react";
import toast from "react-hot-toast";

import TypeFilter from "@/components/fileManager/TypeFilter";
import DateFilter from "@/components/fileManager/DateFilter";
import MediaItems from "@/components/fileManager/MediaItems";
import SearchInput from "@/components/form/SearchInput";
import MediaItemDetails from "./MediaItemDetails";
import { reqDeleteMedia, reqGetMedia, reqGetStaticDirrectory } from "@/backend/fileManager";
import Header from "./Header";

const LIMIT = 20;

/**
 * Renders a media component that displays images, audio, video, and documents.
 *
 * @param {Object} props - The component props.
 * @param {string} props.data - The media data in JSON format.
 * @returns {JSX.Element} The rendered Media component.
 */
function Media() {
    const [isFetchingMedia, setIsFetchingMedia] = useState(false);

    const [media, setMedia] = useState([]);
    const [total, setTotal] = useState(0);
    const [directories, setDirectories] = useState([]);

    const mediaItemsRef = useRef(null);

    const [options, setOptions] = useState({
        page: 1,
        date: "",
        type: "",
    });

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const refreshMediaData = useCallback(async (filterOptions) => {
        try {
            setIsFetchingMedia(true);

            const resGetDirectories = await reqGetStaticDirrectory();
            let { media, total } = await reqGetMedia({
                ...filterOptions,
                limit: LIMIT,
            });

            setMedia(media);
            setTotal(total);
            setDirectories(resGetDirectories.directories);
            setOptions(filterOptions);
        } catch (error) {
            toast.error("Failed to fetch media");
        } finally {
            setIsFetchingMedia(false);
        }
    }, []);

    async function searchMediaData(keyword) {
        keyword = keyword.trim();

        if (keyword.length > 3 || keyword.length === 0) {
            const search = keyword.length > 3 ? keyword : "";
            await refreshMediaData({
                ...options,
                search,
                page: 1,
            });
        }
    }

    async function deleteMediaById(mediaId) {
        try {
            const { success } = await reqDeleteMedia(mediaId);
            if (!success) throw new Error("Failed to delete media.");

            await refreshMediaData({
                ...options,
                page: 1,
            });

            toast.success("Media has been deleted.", {
                duration: 5000,
                position: "bottom-right",
            });
        } catch (error) {
            toast.error(`Failed to delete media: ${error.message}`);
        }
    }

    const handleOnUploaded = useCallback(() => {
        refreshMediaData({
            ...options,
            page: 1,
            type: "",
            date: "",
            search: "",
        });
    }, [options, refreshMediaData]);

    async function nextPage(nextPageNumber) {
        try {
            setIsFetchingMedia(true);

            const newOptions = { ...options, page: nextPageNumber, limit: LIMIT };
            let { media, total } = await reqGetMedia(newOptions);

            setMedia((c) => [...c, ...media]);
            setTotal(total);
            setOptions(newOptions);
        } catch (error) {
            toast.error("Failed to fetch media");
        } finally {
            setIsFetchingMedia(false);
        }
    }

    useEffect(() => {
        (async () => {
            await refreshMediaData({
                date: options.date,
                type: options.type,
                page: 1,
            });
        })();
    }, [options.date, options.type, refreshMediaData]);

    useEffect(() => {
        setIsDetailOpen(false);
        setSelectedItem(null);
    }, [media]);

    return (
        <div>
            <Header handleOnUploaded={handleOnUploaded} />
            <Card className="p-0">
                <div className="flex flex-wrap items-center justify-center gap-5 border-b px-7 py-5 sm:justify-between sm:gap-0">
                    <div className="flex items-center gap-3">
                        <TypeFilter
                            value={options.type}
                            onChange={(value) => setOptions((c) => ({ ...c, type: value }))}
                        />
                        <DateFilter
                            value={options.date}
                            onChange={(value) => setOptions((c) => ({ ...c, date: value }))}
                            data={directories}
                        />
                    </div>
                    <div className="max-w-sm">
                        <SearchInput onSearch={searchMediaData} />
                    </div>
                </div>
                <div className="p-7">
                    {media?.length ? (
                        <>
                            <MediaItemDetails
                                deleteMediaById={deleteMediaById}
                                selectedItem={selectedItem}
                                isDetailOpen={isDetailOpen}
                                isFirst={media.findIndex((item) => item.path === selectedItem?.path) === 0}
                                isLast={
                                    media.findIndex((item) => item.path === selectedItem?.path) === media.length - 1
                                }
                                onClose={() => {
                                    setIsDetailOpen(false);
                                    setSelectedItem(null);
                                    mediaItemsRef.current.reset();
                                }}
                                onNext={(current) => {
                                    const currentIndex = media.findIndex((item) => item.path === current.path);
                                    if (currentIndex < media.length - 1) {
                                        setSelectedItem(media[currentIndex + 1]);
                                    }
                                }}
                                onPrevious={(current) => {
                                    const currentIndex = media.findIndex((item) => item.path === current.path);
                                    if (currentIndex > 0) {
                                        setSelectedItem(media[currentIndex - 1]);
                                    }
                                }}
                            />
                            <MediaItems
                                ref={mediaItemsRef}
                                media={media}
                                onSelected={(items) => {
                                    if (items.length > 0) {
                                        setSelectedItem(items[0]);
                                        setIsDetailOpen(true);
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <div className="text-center text-gray-500">No media found, click Add New to upload media.</div>
                    )}

                    {options.page * LIMIT < total && (
                        <div className="mt-5 flex justify-center">
                            <Button
                                onClick={() => {
                                    setOptions((c) => ({ ...c, page: c.page + 1 }));
                                    nextPage(options.page + 1);
                                }}
                                variant="secondary"
                                size="xs"
                                disabled={isFetchingMedia}
                            >
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default Media;
