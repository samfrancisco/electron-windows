const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

const _ = require("lodash");

const windows = require("./configs/windows");
const events = require("./configs/events");

let currentWindow;
let newWindow;
let childWindow;

setupFromTemplate = (template) => {
  const { name, width, height, view, frame, parent, modal } = template;

  let window;
  if (modal) {
    // On Windows it is not supported to change parent window dynamically.
    // To create a modal window, you have to set both parent and modal options.
    window = new BrowserWindow({
      width: width,
      height: height,
      frame: frame,
      parent: currentWindow,
      modal: modal
    });
  }
  else {
    window = new BrowserWindow({
      width: width,
      height: height,
      frame: frame
    });
  }

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/", view),
      protocol: "file",
      slashes: true
    })
  );

  return window;
}

reloadFromTemplate = (template) => {
  newWindow = setupFromTemplate(template);

  if (currentWindow) {
    currentWindow.close();
    currentWindow = null;
  }

  newWindow.show();
  currentWindow = newWindow;
};

showModalWindow = (templateName) => {
  const template = _.find(windows, {"name": templateName});
  childWindow = setupFromTemplate(template);
  childWindow.show();
}

closeModalWindow = () => {
  childWindow.close();
  childWindow = null;
}

spawnWindow = (templateName = "index") => {
  const template = _.find(windows, {"name": templateName});
  reloadFromTemplate(template);
};

app.on("ready", () => {
  spawnWindow();

  ipcMain.on(events.changeWindow, (event, arg) => {
    spawnWindow(arg);
  });

  ipcMain.on(events.showModalWindow, (event, arg) => {
    showModalWindow(arg);
  });

  ipcMain.on(events.closeModalWindow, (event, arg) => {
    closeModalWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) {
    spawnWindow();
  }
});