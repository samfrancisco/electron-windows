const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const _ = require('lodash');

const windows = require('./configs/windows');

let window;

spawnWindow = () => {
	const { width, height, view, frame } = windows.index;
	window = new BrowserWindow({
		frame
	});
	window.loadURL(
		url.format({
			pathname: path.join(__dirname, 'views/', view),
			protocol: 'file',
			slashes: true
		})
	);
	window.setSize(width, height);

	window.on('closed', () => {
		window = null;
	});
};

app.on('ready', spawnWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (window === null) {
		spawnWindow();
	}
});
