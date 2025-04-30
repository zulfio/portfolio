import { forwardRef, useImperativeHandle, useState } from "react";
import Image from "next/image";
import { DocumentTextIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import classNames from "@/lib/utils/dom/classNames";

function Item({ data }) {
    if (data.type.startsWith("image")) {
        return (
            <Image
                src={data.s3Url}
                alt="media file"
                fill
                sizes="260px"
                style={{
                    objectFit: "cover",
                }}
            />
        );
    }

    if (data.type.startsWith("audio")) {
        return (
            <>
                <div className="absolute flex h-full w-full items-center justify-center bg-gray-100">
                    <PlayCircleIcon className="h-24 w-24 text-slate-400" />
                </div>
                <div className="absolute bottom-0 z-20 w-full border-t bg-white p-2 opacity-90">
                    <span className="line-clamp-3 break-words text-xs">{data.path?.split("/").pop()}</span>
                </div>
            </>
        );
    }

    if (data.type.startsWith("video")) {
        return (
            <>
                <div className="absolute flex h-full w-full items-center justify-center bg-gray-100">
                    <VideoCameraIcon className="h-24 w-24 text-slate-400" />
                </div>
                <div className="absolute bottom-0 w-full border-t bg-white p-2 opacity-90">
                    <span className="line-clamp-3 break-words text-xs">{data.path?.split("/").pop()}</span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="absolute flex h-full w-full items-center justify-center bg-gray-100 pb-7">
                <DocumentTextIcon className="h-20 w-20 text-slate-400" />
            </div>
            <div className="absolute bottom-0 w-full border-t bg-white p-2 opacity-90">
                <span className="line-clamp-3 break-words text-center text-xs font-medium text-slate-800">
                    {data.path?.split("/").pop()}
                </span>
            </div>
        </>
    );
}

/**
 * Renders a list of media items with the ability to select multiple items.
 * @param {Object} props - The component props.
 * @param {Array} props.media - The array of media items to render.
 * @param {boolean} props.selectMultiple - Indicates whether multiple items can be selected.
 * @param {boolean} props.isPreview - Indicates whether to open the media file in a new tab.
 * @param {Function} props.onSelected - The callback function when items are selected.
 * @param {React.Ref} ref - The ref object for accessing the component's methods.
 * @returns {JSX.Element} - The rendered component.
 */
const MediaItems = forwardRef(function MediaItems({ media = [], selectMultiple = false, isPreview = false, onSelected = () => { } }, ref) {
    const [selectedItems, setSelectedItems] = useState([]);

    function handleSelect(item) {
        let selected;

        if (selectMultiple) {
            const index = selectedItems.findIndex((selectedItem) => selectedItem._id === item._id);
            if (index > -1) {
                selected = selectedItems.filter((selectedItem) => selectedItem._id !== item._id);
            } else {
                selected = [...selectedItems, item];
            }
        } else {
            selected = [item];
        }

        setSelectedItems(selected);
        onSelected(selected);
    }

    useImperativeHandle(ref, () => ({
        reset() {
            setSelectedItems([]);
            onSelected([]);
        },
    }));

    return (
        <div className="flex flex-wrap justify-center gap-2 overflow-auto">
            {media.map((item, index) => (
                <div
                    className={classNames(
                        "relative h-32 w-32 cursor-pointer overflow-hidden rounded border-4 sm:h-36 sm:w-36",
                        index == media.length - 1 && "last-media-item",
                        selectedItems.some((selectedItem) => selectedItem._id === item._id)
                            ? "border-tremor-brand-subtle opacity-70"
                            : "border-slate-100",
                    )}
                    key={item._id}
                    onClick={() => {
                        isPreview ? window.open(item.s3Url, "_blank").focus() : handleSelect(item);
                    }}
                >
                    <Item data={item} />
                </div>
            ))}
        </div>
    );
});

export default MediaItems;
