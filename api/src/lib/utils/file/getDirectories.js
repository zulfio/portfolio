import { readdirSync } from "fs";
import { join } from "path";

/**
 * Recursively retrieves all directories and subdirectories within the given path.
 * @param {string} path - The path to the directory.
 * @returns {string[]} - An array of directory paths.
 */
function getDirectories(path) {
    return [].concat(
        path.split("uploads/").pop(),
        ...readdirSync(path, { withFileTypes: true }).map((dirent) => {
            return dirent.isDirectory() ? getDirectories(join(path, dirent.name)) : [];
        })
    );
}

export default getDirectories;
