const windows = [
  {
    name: "index",
    width: 350,
    height: 500,
    view: "index.html",
    frame: false,
    parent: null,
    modal: false
  },
  {
    name: "profile",
    width: 650,
    height: 650,
    view: "profile.html",
    frame: false,
    parent: null,
    modal: false
  },
  {
    name: "profile_subpage",
    width: 500,
    height: 500,
    view: "profile_subpage.html",
    frame: false,
    parent: "profile",
    modal: true
  }
];

module.exports = windows;