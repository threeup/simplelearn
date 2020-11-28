import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

mainWindow = null;

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

function runScript() {
  const { spawn } = require('child_process');
  const subprocess = spawn('python3', ['./py/makejson.py']);
  
  // print output of script
  subprocess.stdout.on('data', (data:any) => {
    console.log(`data:${data}`);
  });
  subprocess.stderr.on('data', (data:any) => {
    console.log(`error:${data}`);
  });
  subprocess.stderr.on('close', () => {
    console.log("makejson finish");
  });
  return subprocess;
}

app.on("ready", () => {
  if (mainWindow === null) {
    runScript();
    createWindow();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    runScript();
    createWindow();
  }
});
