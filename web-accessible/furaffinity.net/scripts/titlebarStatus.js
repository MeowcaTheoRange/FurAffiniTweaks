const fatweaks = window.__fatweaks;
fatweaks.titlebarStatus = {};
let module = fatweaks.titlebarStatus;

// -- //

let prevTitle = document.title;
module.refresh = function (element) {
  let newString = element.textContent.trim()
  if (newString.length < 1) document.title = prevTitle;
  else document.title = `(${newString}) ${prevTitle}`;
}

let desktop_messagebar = document.querySelector(".message-bar-desktop");
module.refresh(desktop_messagebar);