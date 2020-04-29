import fs from "fs";
import { promisify } from "util";

export const writeFile = promisify(fs.writeFile);
export const readFile = promisify(fs.readFile);
export const exists = promisify(fs.exists);
export const mkdir = promisify(fs.mkdir);
export const readdir = promisify(fs.readdir);
