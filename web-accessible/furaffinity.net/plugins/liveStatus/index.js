const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "Live Status",
  namespace: "liveStatus"
});
let updateTime = mySettings.number({
  id: "updateTime",
  name: "How often (in seconds) to update status",
  defaultValue: 10
});

const tabStatus = __fatweaks.reference("tabStatus", false);

const domparser = new DOMParser();
let desktop_messagebar = document.querySelector(".message-bar-desktop");
let mobile_messagebar = document.querySelector(".mobile-notification-bar");

async function updateliveStatus() {
  // Loading BLM page because it's a static page
  // Also because Black Lives Matter 🖤🤎
  let linkRequest = await fetch(window.location.origin + "/blm/");
  if (!linkRequest.ok) return null;
  let linkText = await linkRequest.text();
  let dom = domparser.parseFromString(linkText, "text/html");
  let new_desktop_messagebar = dom.querySelector(".message-bar-desktop");
  let new_mobile_messagebar = dom.querySelector(".mobile-notification-bar");
  desktop_messagebar.replaceWith(new_desktop_messagebar);
  desktop_messagebar = new_desktop_messagebar;
  mobile_messagebar.replaceWith(new_mobile_messagebar);
  mobile_messagebar = new_mobile_messagebar;
  if (tabStatus) tabStatus.refresh(desktop_messagebar);
}

setInterval(updateliveStatus, updateTime * 1000);