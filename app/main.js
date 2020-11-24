"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
function createWindow() {
    var electronOptions = {
        width: 800,
        height: 480,
        x: 0,
        y: 0,
        darkTheme: true,
        fullscreen: false,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: true,
        },
        backgroundColor: "#000000"
    };
    mainWindow = new electron_1.BrowserWindow(electronOptions);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
    }));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    electron_1.app.quit();
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map