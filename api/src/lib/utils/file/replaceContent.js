import { promises as fs } from "fs";

/**
 * Replace text inside html file or any file with type text or json
 * @param {string} path file path
 * @param {[string]} from array of string to be replaced
 * @param {[string]} to array of string to replace
 *
 * @returns {Promise}
 */
export default async function replaceContent({ path, from, to }) {
  let file = await fs.readFile(path, "utf8");

  from.forEach((target, index) => {
    file = file.replace(target, to[index]);
  });

  return file;
}
