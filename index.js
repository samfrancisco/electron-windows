const { ipcRenderer } = require("electron");
const events = require("./configs/events");

$(document).ready(() => {
  $("#redirect").click(e => {
    const targetPage = $(e.target).data("targetPage");
    ipcRenderer.send(events.changeWindow, targetPage);
  });
});