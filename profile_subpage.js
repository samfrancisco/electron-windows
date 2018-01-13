const { remote } = require('electron');

$(document).ready(() => {
	$('#close_modal_window').click((e) => {
		remote.getCurrentWindow().close();
	});
});
