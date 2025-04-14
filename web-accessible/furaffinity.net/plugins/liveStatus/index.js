/**
 * Live Status by MeowcaTheoRange
 * @typedef {Object} LiveStatusPlugin
 */

const settings = __fatweaks.reference("settings");
const events = __fatweaks.reference("events");

let mySettings = settings.register({
  name: "Live Status",
  namespace: "liveStatus"
});
let updateTime = mySettings.number({
  id: "updateTime",
  name: "How often (in seconds) to update status",
  defaultValue: 10
});

const domparser = new DOMParser();
let desktop_messagebar = document.querySelector(".message-bar-desktop");
let mobile_messagebar = document.querySelector(".mobile-notification-bar");

async function updateliveStatus() {
  if (desktop_messagebar == null && mobile_messagebar == null) return;

  // Loading BLM page because it's a static page
  // Also because Black Lives Matter 🖤🤎
  let linkRequest = await fetch(window.location.origin + "/blm/");
  if (!linkRequest.ok) return null;
  let linkText = await linkRequest.text();
  let dom = domparser.parseFromString(linkText, "text/html");
  let new_desktop_messagebar = dom.querySelector(".message-bar-desktop");
  let new_mobile_messagebar = dom.querySelector(".mobile-notification-bar");
  let old_notifs = desktop_messagebar.textContent.trim();
  let notifs = new_desktop_messagebar.textContent.trim();
  desktop_messagebar.replaceWith(new_desktop_messagebar);
  desktop_messagebar = new_desktop_messagebar;
  mobile_messagebar.replaceWith(new_mobile_messagebar);
  mobile_messagebar = new_mobile_messagebar;
  events.pushEvent("liveStatus", "updated", {
    notifs,
    desktop_element: new_desktop_messagebar,
    mobile_element: new_mobile_messagebar
  });
  if (old_notifs != notifs)
    events.pushEvent("liveStatus", "changed", {
      notifs,
      desktop_element: new_desktop_messagebar,
      mobile_element: new_mobile_messagebar
    });
}

setInterval(updateliveStatus, updateTime * 1000);

/**
 * Fires when Live Status updates the notification text.
 * @event LiveStatusPlugin.updated
 * @type {object}
 * @property {string} notifs - The notification text as a string (e.x. `"2S 3F 4W 5J"`).
 * @property {Element} desktop_element - The desktop notification text element.
 * @property {Element} mobile_element - The mobile notification text element.
 */

/**
 * Fires when the notification status has changed its state.
 * @event LiveStatusPlugin.changed
 * @type {object}
 * @property {string} notifs - The notification text as a string (e.x. `"2S 3F 4W 5J"`).
 * @property {Element} desktop_element - The desktop notification text element.
 * @property {Element} mobile_element - The mobile notification text element.
 */