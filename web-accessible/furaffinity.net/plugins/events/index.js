const module = __fatweaks.namespace("events");

let eventsToFire = [];
let fireLatch = false;

module.pushEvent = function (
  namespace = "",
  eventName = "",
  detail = {},
  fromElement = document.body
) {
  let event = new CustomEvent(`fatweaks_events_${namespace}_${eventName}`, {
    bubbles: true,
    detail
  });

  if (fireLatch)
    fromElement.dispatchEvent(event);
  else eventsToFire.push([event, fromElement]);
}

module.listenToEvent = function (
  namespace = "",
  eventName = "",
  callback = (event = {}) => { },
  fromElement = document.body
) {
  fromElement.addEventListener(
    `fatweaks_events_${namespace}_${eventName}`,
    (event) => callback(event.detail)
  );
}

module.switchLatch = function () {
  fireLatch = true;
  eventsToFire.forEach(([ev, fromElement]) => {
    fromElement.dispatchEvent(ev);
  });
}