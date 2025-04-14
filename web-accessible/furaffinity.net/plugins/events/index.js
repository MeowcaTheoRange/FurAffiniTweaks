/** @import { Module } from "../modules/index.js" */

/**
 * The system that FurAffiniTweaks uses to help plugins communicate with each other. This is one of the base modules that can't be unloaded.
 * Go to `.pushEvent()` and `.listenToEvent()` if you'd like to find out how to make your plugins communicate.
 * @typedef {Module} EventsModule
 */
const module = __fatweaks.namespace("events");

let eventsToFire = [];
let fireLatch = false;

/**
 * Pushes (fires) an event to other plugins under a namespace and a name.
 * @alias EventsModule.pushEvent
 * @param {string} namespace - The firing namespace's ID.
 * @param {string} eventName - The name of the event that's being fired. Should be consistent between firings.
 * @param {any} detail - Data that will be passed to listening events.
 * @param {HTMLElement} fromElement - The element the event will be fired from (defaults to the DOM body).
 * @example
 * const events = __fatweaks.reference("events");
 * 
 * module.quackDuck = function() {
 *   quack.play();
 *   events.pushEvent("example", "quack", quackLoudlyVolume);
 * }
 */
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

/**
 * Listens to an event fired by another or this plugin.
 * @alias EventsModule.listenToEvent
 * @param {string} namespace - The firing namespace's ID.
 * @param {string} eventName - The name of the event that's being fired.
 * @param {function (Object<string, any>): void} callback - The callback that will run when the event is fired.
 * @param {Object<string, any>} callback.detail - The data passed from the firing plugin.
 * @param {HTMLElement} fromElement - The element where the event will be listened to (defaults to the DOM body).
 * @example
 * const events = __fatweaks.reference("events");
 * 
 * events.listenToEvent("example", "quack", (dbVolume) => {
 *   if (dbVolume > 10)
 *     console.log("That was loud!");
 *   else console.log("What was that?");
 * });
 */
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

/**
 * A latch that executes any awaiting event firings once all of the plugins are loaded, so all plugins get a chance to recieve any early firings of the event they're listening to.
 * 
 * You should not run this function in your plugin under any circumstance.
 * @alias EventsModule.switchLatch
 */
module.switchLatch = function () {
  fireLatch = true;
  eventsToFire.forEach(([ev, fromElement]) => {
    fromElement.dispatchEvent(ev);
  });
}