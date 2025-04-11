const module = __fatweaks.namespace("tabStatus");

let prevTitle = document.title;
module.refresh = function (element) {
  let newString = element.textContent.trim()
  if (newString.length < 1) document.title = prevTitle;
  else document.title = `(${newString}) ${prevTitle}`;
}

let desktop_messagebar = document.querySelector(".message-bar-desktop");
if (desktop_messagebar) module.refresh(desktop_messagebar);