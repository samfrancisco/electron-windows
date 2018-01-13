const { remote } = require('electron');
const url = require('url');
const path = require('path');

$(document).ready(() => {
	$('#redirect').click((e) => {
		const { name, width, height, view, frame, parent, modal } = require('./configs/windows')['profile'];
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
});
