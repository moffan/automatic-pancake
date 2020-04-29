/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainEvent } from "electron";

export type IpcEventHandler = (event: IpcMainEvent, ...args: any[]) => void;
