import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  var electronOptions = {
		width: 800,
		height: 480,
		x: 0,
		y: 0,
    darkTheme: true,
    fullscreen: true,
    autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
		},
		backgroundColor: "#000000"
	};

  mainWindow = new BrowserWindow(electronOptions);

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
  }));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
