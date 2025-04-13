const module = __fatweaks.namespace("tabStatus");

const events = __fatweaks.reference("events");

const blipURL = __fatweaks.assetURL("liveStatusAlert", "beep.mp3");
const blip = new Audio(blipURL);

function alert({ notifs, desktop_element, mobile_element }) {
  try {
    blip.currentTime = 0;
    blip.play();
  } catch (e) { }

  desktop_element.classList.add("flash");
  mobile_element.classList.add("flash");
  setTimeout(() => {
    desktop_element.classList.remove("flash");
    mobile_element.classList.remove("flash");
  }, 200);
}

events.listenToEvent("liveStatus", "changed", alert);