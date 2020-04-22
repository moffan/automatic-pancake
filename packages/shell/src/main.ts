import { app, BrowserWindow } from "electron";

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const mainWindowUrl = new URL("http://localhost:8080/");
  if (mainWindowUrl) {
    win.loadURL(mainWindowUrl.toJSON());
  } else {
    win.loadFile("index.html");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
