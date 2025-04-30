import { promises as fs } from "fs";

/**
 * Replace text inside file
 * @param {string} path file path
 * @param {[string]} from
 * @param {[string]} to
 *
 * @returns {Promise}
 */
export default async function replaceInFile({ path, from, to }) {
  let file = await fs.readFile(path, "utf8");

  from.forEach((target, index) => {
    file = file.replace(target, to[index]);
  });

  return file;
}
