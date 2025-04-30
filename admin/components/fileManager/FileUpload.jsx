"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import classNames from "@/lib/utils/dom/classNames";
import uploadMedia from "@/lib/utils/file/uploadFile";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/20/solid";

/**
 * FileUpload component for uploading files.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.variant="default"] - The variant of the file upload component. "default" or "simple".
 * @param {string} [props.description="PNG, JPG, GIF"] - The description of the allowed file types.
 * @param {string|string[]} [props.accept=""] - The accepted file types. "*" for all types or an array of specific types (e.g. ["png", "jpg", "jpeg", "gif"]).
 * @param {boolean} [props.multiple=false] - Indicates whether multiple files can be uploaded.
 * @param {number} [props.maxSize=10] - The maximum file size allowed in megabytes.
 * @param {Function} [props.onChange=() => {}] - The callback function triggered when files are successfully uploaded.
 * @param {Function} [props.onError=() => {}] - The callback function triggered when an error occurs during file upload.
 * @param {boolean} [props.withPreview=true] - Indicates whether to show a preview of the uploaded files.
 * @returns {JSX.Element} The FileUpload component.
 */
function FileUpload({
    variant = "default", // "default" or "simple"
    description = "",
    accept = "*", // "*" or array of file types (e.g. ["png", "jpg", "jpeg", "gif"])
    multiple = false,
    maxSize = 10,
    withPreview = false,
    onChange = () => { },
    onError = () => { },
}) {
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);

    const fileInput = useRef(null);
    const dropzone = useRef(null);
    const dropOverlay = useRef(null);
    const [isDragEnter, setIsDragEnter] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== dropOverlay.current) {
            setIsDragEnter(true);
        }
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === dropOverlay.current) {
            setIsDragEnter(false);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragEnter(false);

        const files = e.dataTransfer.files;
        if (files.length === 0) return;

        validateFile(files);
    }

    async function validateFile(files) {
        setIsUploading(true);

        try {
            if (!multiple && files.length > 1) {
                const errorMessage = "Only one file is allowed";
                onError({ message: errorMessage, file: files });
                setError(errorMessage);

                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileType = file.name.split(".").pop();

                if (accept !== "*" && !accept.includes(fileType)) {
                    const errorMessage = `File type is not allowed. Only ${accept.join(", ")} are allowed`;
                    onError({ message: errorMessage, file });
                    setError(errorMessage);

                    return;
                }

                if (file.size > maxSize * 1024 * 1024) {
                    const errorMessage = `File size is too large. Only ${maxSize}MB are allowed`;
                    onError({ message: errorMessage, file });
                    setError(errorMessage);

                    return;
                }
            }

            await handleUpload(Array.from(files));
            fileInput.current.value = "";
        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    }

    async function handleUpload(files) {
        const uploadedFiles = await uploadMedia(files);
        onChange(uploadedFiles);
        setFiles(uploadedFiles);
    }

    useEffect(() => {
        dropzone.current.addEventListener("dragover", handleDragOver);
        dropzone.current.addEventListener("drop", handleDrop);
        dropzone.current.addEventListener("dragenter", handleDragEnter);
        dropzone.current.addEventListener("dragleave", handleDragLeave);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!error) return;

        toast.error(error);
        setError(null);
    }, [error]);

    return (
        <div className={classNames(variant == "simple" ? "max-w-max" : "")}>
            {withPreview && files.length > 0 && (
                <div className="flex flex-col gap-2">
                    {files.map((file, index) => {
                        const fileName = file.path.split("/").pop();

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div className="relative h-16 w-16">
                                    {file.type.startsWith("image") ? (
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${file.path}`}
                                            alt={fileName}
                                            className="max-w-52"
                                            fill
                                            sizes="360px"
                                        />
                                    ) : (
                                        <div className="relative flex flex-shrink-0 items-center justify-center rounded-md bg-slate-100">
                                            <DocumentIcon className="h-5 w-5 text-slate-600" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="line-clamp-1 text-xs font-medium text-slate-600">{fileName}</p>
                                    <button
                                        onClick={() => {
                                            const newFiles = files.filter((f) => f._id !== file._id);
                                            setFiles(newFiles);
                                            onChange(newFiles);
                                        }}
                                        type="button"
                                        className="inline text-left text-xs font-medium text-rose-700 hover:border-b-2 hover:border-rose-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <label
                ref={dropzone}
                className={classNames(
                    "relative mx-auto flex h-full w-full cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-tremor-brand bg-tremor-brand-faint text-center",
                    withPreview && files.length > 0 ? "hidden" : "",
                    variant === "simple" ? "px-4 py-2" : "p-8",
                )}
            >
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-tremor-brand-faint">
                        <svg
                            className="-ml-1 mr-3 h-5 w-5 animate-spin text-emerald-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="text-md text-slate-800">Uploading...</p>
                    </div>
                )}

                {isDragEnter && (
                    <div className="absolute inset-0 bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-xl bg-tremor-brand-faint">
                        <div ref={dropOverlay} className="absolute h-full w-full"></div>
                        <p className="text-lg text-slate-700">Drop {multiple ? "Files" : "File"} Here</p>
                    </div>
                )}
                {variant === "default" && (
                    <div className="mb-4 rounded-full bg-tremor-brand p-1.5">
                        <ArrowUpTrayIcon className="h-5 w-5 text-white" />
                    </div>
                )}

                <h2 className="text-sm font-medium text-slate-700">
                    Drag & Drop or{" "}
                    <span className="text-tremor-brand-emphasis underline">Choose {multiple ? "Files" : "File"}</span>{" "}
                    to upload
                </h2>
                {description && <p className="mt-2 text-xs text-slate-600">{description}</p>}
                <input
                    ref={fileInput}
                    type="file"
                    accept=""
                    className="hidden"
                    onChange={(e) => validateFile(e.target.files)}
                    multiple={multiple}
                    disabled={isUploading}
                />
            </label>
        </div>
    );
}

export default FileUpload;
