const { ipcRenderer } = require("electron");
const events = require("./configs/events");

$(document).ready(() => {
  $("#close_modal_window").click(e => {
    ipcRenderer.send(events.closeModalWindow);
  });
});