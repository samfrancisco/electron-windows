const { ipcRenderer } = require("electron");
const events = require("./configs/events");

$(document).ready(() => {
  $("#redirect").click(e => {
    const targetPage = $(e.target).data("targetPage");
    ipcRenderer.send(events.changeWindow, targetPage);
  });

  $("#show_modal_window").click(e => {
    const targetPage = $(e.target).data("targetPage");
    ipcRenderer.send(events.showModalWindow, targetPage);
  });
});