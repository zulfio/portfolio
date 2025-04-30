import toast from "react-hot-toast";
import { reqAddMedia } from "@/backend/fileManager";

async function uploadMedia(files = []) {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            if (file.size <= 0) return;
            formData.append("files", file);
        });

        const { success, media, failed, message } = await reqAddMedia(formData);
        if (!success) throw new Error(message);

        media.forEach((file) => {
            toast.success(`${file.path.split("/").pop()} has been uploaded.`, {
                duration: 5000,
                position: "top-center",
            });
        });
        failed.forEach((file) => {
            toast.error(`${file.fileName} failed to upload. ${file.errorMessage}`, {
                duration: 5000,
                position: "top-center",
            });
        });

        return media;
    } catch (error) {
        toast.error("Failed to upload media.");
    }
}

export default uploadMedia;
