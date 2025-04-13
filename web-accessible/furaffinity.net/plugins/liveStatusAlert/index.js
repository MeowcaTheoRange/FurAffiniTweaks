const module = __fatweaks.namespace("liveStatusAlert");

const settings = __fatweaks.reference("settings");
const events = __fatweaks.reference("events");

let mySettings = settings.register({
  name: "Live Status Alert",
  namespace: "liveStatusAlert"
});
let playBlip = mySettings.boolean({
  id: "playBlip",
  name: "If a sound should play on a new notification",
  defaultValue: true
});
let flashNumbers = mySettings.boolean({
  id: "flashNumbers",
  name: "If the numbers should flash on a new notification",
  defaultValue: true
});

const blipURL = __fatweaks.assetURL("liveStatusAlert", "beep.mp3");
const blip = new Audio(blipURL);

function alert({ notifs, desktop_element, mobile_element }) {
  if (playBlip) {
    try {
      blip.currentTime = 0;
      blip.play();
    } catch (e) { }
  }

  if (flashNumbers) {
    desktop_element.classList.add("flash");
    mobile_element.classList.add("flash");
    setTimeout(() => {
      desktop_element.classList.remove("flash");
      mobile_element.classList.remove("flash");
    }, 200);
  }
}

events.listenToEvent("liveStatus", "changed", alert);