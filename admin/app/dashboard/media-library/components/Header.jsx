import FileUpload from "@/components/fileManager/FileUpload";
import { Transition } from "@headlessui/react";

import { Button, Metric } from "@tremor/react";
import { memo, useState } from "react";

/**
 * Renders the header component for the media library.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleOnUploaded - The callback function to handle uploaded files.
 * @returns {JSX.Element} The rendered header component.
 */
function Header({ handleOnUploaded }) {
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

    return (
        <>
            <div className="mb-7">
                <Metric>Media Library</Metric>
            </div>
            <div className="absolute right-0 top-0">
                <Button size="xs" onClick={() => setIsFileUploadOpen((c) => !c)}>
                    Upload File
                </Button>
            </div>
            <Transition
                show={isFileUploadOpen}
                enter="transition-all duration-300"
                enterFrom="transform -translate-y-10 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition-all duration-75"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-10 opacity-0"
            >
                <div className="mx-auto mb-5 max-w-4xl">
                    <FileUpload
                        description={`Maximum upload file size: ${process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE} MB.`}
                        maxSize={parseInt(process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE)}
                        accept="*"
                        multiple
                        withPreview={false}
                        onChange={handleOnUploaded}
                    />
                </div>
            </Transition>
        </>
    );
}

export default memo(Header);
