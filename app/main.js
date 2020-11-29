"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const process = require("process");
let mainWindow;
mainWindow = null;
function createWindow() {
    var args = process.argv;
    var electronOptions = {
        width: 800,
        height: 480,
        x: 0,
        y: 0,
        darkTheme: true,
        fullscreen: args.includes("full"),
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
function runScript() {
    var args = process.argv;
    if (args.includes("json")) {
        const { spawn } = require('child_process');
        const subprocess = spawn('python3', ['./py/makejson.py']);
        subprocess.stdout.on('data', (data) => {
            console.log(`data:${data}`);
        });
        subprocess.stderr.on('data', (data) => {
            console.log(`error:${data}`);
        });
        subprocess.stderr.on('close', () => {
            console.log("makejson finish");
        });
        return subprocess;
    }
    return null;
}
electron_1.app.on("ready", () => {
    if (mainWindow === null) {
        runScript();
        createWindow();
    }
});
electron_1.app.on("window-all-closed", () => {
    electron_1.app.quit();
});
electron_1.app.on("activate", () => {
    if (mainWindow === null) {
        runScript();
        createWindow();
    }
});
//# sourceMappingURL=main.js.map