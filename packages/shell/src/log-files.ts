import moment, { Moment } from "moment";
import path from "path";

import { io, DataStore } from "./utils";

const tempStore = new DataStore("tmp");

const LOG_TIMESTAMP_REGEX = /.+\s-\s(.+)\.log/;
const TIMESTAMP_FROMAT = "MM-DD-YYYY HH.mm.ss";
const LINE_ENDING = "\r\n";
const LOG_FILE_ENCODING = "utf8";

const getFileTimestamp = (logFileName: string): Moment => {
  const matches = LOG_TIMESTAMP_REGEX.exec(logFileName);

  if (!matches) {
    throw new Error("Missing time stamp in log file");
  }

  const [_, timestampStr] = matches;
  const timestamp = moment(timestampStr, TIMESTAMP_FROMAT);
  return timestamp;
};

export const getLogFileNames = async () => {
  const { FILE_LOCATION_MTGA_LOG } = process.env;
  const logPath = FILE_LOCATION_MTGA_LOG!;
  const filelist = await io.readdir(logPath);

  return filelist.map((file) => path.resolve(path.join(logPath, file)));
};

const getLatestLogFileName = (fileNames: string[]): string => {
  let logFilename: string = "";
  let lastestTimestamp = moment().add("y", -10);
  fileNames.forEach((fileName) => {
    const timestamp = getFileTimestamp(fileName);
    if (timestamp.isAfter(lastestTimestamp)) {
      lastestTimestamp = timestamp;
      logFilename = fileName;
    }
  });

  return logFilename;
};

export const readLatestLogFile = async (): Promise<string> => {
  const fileNames = await getLogFileNames();
  const latestLogFilename = getLatestLogFileName(fileNames);
  const data = await io.readFile(latestLogFilename, LOG_FILE_ENCODING);

  return data;
};

export const getLog = async (): Promise<any> => {
  const logData = await readLatestLogFile();

  const systemLogMatcher = /\[(\w+)\]\s(.+)/;
  const matcher = /\[(.+)\]\s+\[(.+)\](?:<==|==>)\s+(?:(\w+)(?:\.(\w+))?)\s+(\{.+\})/;

  const log: { system: string[]; other: string[]; stuff: any[] } = {
    system: [],
    stuff: [],
    other: [],
  };

  for (const entry of logData.split(LINE_ENDING)) {
    if (!entry.trim()) {
      continue;
    }

    let match = systemLogMatcher.exec(entry);
    if (!match) {
      log.system.push(entry);
      continue;
    }

    match = matcher.exec(entry);
    if (!match) {
      log.other.push(entry);
      continue;
    }

    log.stuff.push(eventHandler(match));
  }

  tempStore.write("system", JSON.stringify(log.system));
  tempStore.write("other", JSON.stringify(log.other));
  tempStore.write("stuff", JSON.stringify(log.stuff));

  return "HER KOMMER DATA";
};

const eventHandler = (entry: RegExpExecArray) => {
  const [_, code, logger, category, messageType, data] = entry;

  return { code, logger, category, messageType, data };
};
