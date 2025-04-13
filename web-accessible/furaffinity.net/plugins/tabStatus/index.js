const module = __fatweaks.namespace("tabStatus");

const events = __fatweaks.reference("events");

let prevTitle = document.title;
module.refresh = function (element) {
  let newString
  if (typeof element === "string")
    newString = element;
  else
    newString = element.textContent.trim();
  if (newString.length < 1) document.title = prevTitle;
  else document.title = `(${newString}) ${prevTitle}`;
}

let desktop_messagebar = document.querySelector(".message-bar-desktop");
if (desktop_messagebar) module.refresh(desktop_messagebar);

events.listenToEvent("liveStatus", "updated", ({ notifs }) => module.refresh(notifs));