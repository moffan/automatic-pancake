/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
import path from "path";

import { io } from ".";

const { FILE_LOCATION_DATA } = process.env;

const dataFolder: Promise<string> = new Promise(async (resolve, reject) => {
  if (!FILE_LOCATION_DATA) {
    return reject("FILE_LOCATION_DATA is not set");
  }

  try {
    const dataPath = path.resolve(FILE_LOCATION_DATA);
    if (!(await io.exists(dataPath))) {
      await io.mkdir(dataPath);
    }

    resolve(dataPath);
  } catch (error) {
    reject(error);
  }
});

export class DataStore {
  private storeFolder: Promise<string>;

  private getDataFilePath = async (key: string): Promise<string> => {
    const storeFolder = await this.storeFolder;
    const dataFilePath = path.resolve(storeFolder, `${key}.json`);
    return dataFilePath;
  };

  constructor(storeName?: string) {
    this.storeFolder = new Promise(async (resolve, reject) => {
      try {
        const dataPath = await dataFolder;
        const storePath = storeName
          ? path.resolve(dataPath, storeName)
          : dataPath;

        if (storeName) {
          if (!(await io.exists(storePath))) {
            await io.mkdir(storePath);
          }
        }

        resolve(storePath);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async read(key: string): Promise<string | null> {
    const dataFile = await this.getDataFilePath(key);

    if (await io.exists(dataFile)) {
      const data = await io.readFile(dataFile, {
        encoding: "utf8",
      });
      return data;
    }

    return null;
  }

  public async write(key: string, data: string): Promise<void> {
    const dataFile = await this.getDataFilePath(key);

    await io.writeFile(dataFile, data);
  }
}
