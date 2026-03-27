const { contextBridge } = require("electron");

const api = {
  hello: () => "Hello from Electron 👋",
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("api", api);
} else {
  window.api = api;
}