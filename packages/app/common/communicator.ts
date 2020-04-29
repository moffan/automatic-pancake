/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from "electron";

import { ResponseChannels } from "../../common";

const getResonseChannels = (command: string): ResponseChannels => ({
  success: `${command}${Math.random() * 1000000}`,
  error: `${command}${Math.random() * 1000000}`,
});

export const send = (channel: string, ...args: any[]): Promise<any> => {
  const responseChannels = getResonseChannels(channel);

  console.debug(`Sending command on channel ${channel}`);
  ipcRenderer.send(channel, responseChannels, args);

  return new Promise((resolve, reject) => {
    ipcRenderer.once(responseChannels.success, (_, args) => {
      console.debug(`Success resonse for channel ${channel}`);
      ipcRenderer.removeAllListeners(responseChannels.error);
      resolve(args);
    });

    ipcRenderer.once(responseChannels.error, () => {
      console.debug(`Error resonse for channel ${channel}`);
      ipcRenderer.removeAllListeners(responseChannels.success);
      reject();
    });
  });
};
