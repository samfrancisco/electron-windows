const { remote } = require('electron');
const url = require('url');
const path = require('path');

let profileSubPage;

$(document).ready(() => {
	$('#redirect').click((e) => {
		const { width, height, view } = require('./configs/windows')['index'];
		let currentWindow = remote.getCurrentWindow();
		currentWindow.loadURL(
			url.format({
				pathname: path.join(__dirname, 'views/', view),
				protocol: 'file',
				slashes: true
			})
		);
		currentWindow.setSize(width, height);
	});

	$('#show_modal_window').click((e) => {
		const { width, height, view } = require('./configs/windows')['profile_subpage'];
		let currentWindow = remote.getCurrentWindow();
		const { BrowserWindow } = remote;
		profileSubPage = new BrowserWindow({
			parent: currentWindow,
			modal: true,
			show: false
		});
		profileSubPage.setSize(width, height);
		profileSubPage.loadURL(
			url.format({
				pathname: path.join(__dirname, 'views/', view),
				protocol: 'file',
				slashes: true
			})
		);

		profileSubPage.once('ready-to-show', () => {
			profileSubPage.show();
		});

		profileSubPage.on('closed', () => {
			profileSubPage = null;
		});
	});
});
