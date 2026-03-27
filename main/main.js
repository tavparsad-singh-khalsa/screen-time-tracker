const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const preloadPath = path.join(__dirname, "../preload/preload.js");
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  console.log("Preload path:", preloadPath);
  console.log("Loading URL...");
  win.loadURL("http://localhost:5173");

  win.webContents.on("did-finish-load", async () => {
    try {
      const bridgeType = await win.webContents.executeJavaScript("typeof window.api");
      console.log("window.api type:", bridgeType);
    } catch (error) {
      console.error("Bridge check failed:", error);
    }
  });
}

app.whenReady().then(createWindow);