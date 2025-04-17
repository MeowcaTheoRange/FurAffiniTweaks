/**
 * The system that FurAffiniTweaks uses to create entries in the Settings dropdown. This is one of the base modules that can't be unloaded.
 * @typedef {Module} DropdownManagerModule
 */
const module = __fatweaks.namespace("dropdownManager");

function craftCategoryHeader(upper = false) {
  let headerElement = document.createElement("h3");
  headerElement.innerHTML = upper ? "FURAFFINITWEAKS" : "FurAffiniTweaks";

  return headerElement;
}

function craftCategoryEntry(name, href, onclick) {
  let aElement = document.createElement("a");
  aElement.classList.add("fatweaks-generated");
  aElement.textContent = name;
  aElement.href = href;
  if (onclick) aElement.addEventListener("click", onclick);

  return aElement;
}

function appendToDropdownMenu(element) {
  let settingsButton = document.querySelector("li.submenu-trigger:last-of-type");
  if (settingsButton == null) return;
  let dropdownColumn = settingsButton.querySelector(".dropdown-right .column");
  if (dropdownColumn == null) return;
  dropdownColumn.prepend(element);
}

function appendToDropdownMenuMobile(element) {
  let settingsButton = document.querySelector(".mobile-nav-content-container div.nav-ac-container:last-of-type");
  if (settingsButton == null) return;
  let dropdownColumn = settingsButton.querySelector(".nav-ac-content.nav-ac-content-dropdown");
  if (dropdownColumn == null) return;
  dropdownColumn.prepend(element);
}

let headerDesktop;
let headerMobile;

function appendToFATweaksHeader(headerElement = headerDesktop, element) {
  let parent = headerElement.parentNode;
  if (parent == null) return;
  if (headerElement.nextSibling)
    parent.insertBefore(element, headerElement.nextSibling);
  else parent.appendChild(element);
}

function start() {
  headerDesktop = craftCategoryHeader();
  headerMobile = craftCategoryHeader(true);

  appendToDropdownMenu(headerDesktop);
  appendToDropdownMenuMobile(headerMobile);
}

start();

/**
 * Creates a dropdown entry in the "Settings" menu, on both mobile and desktop.
 * @alias DropdownManagerModule.createDropdownEntry
 * @param {string} name - The title of the dropdown.
 * @param {string} href - Where the dropdown entry will go when clicked.
 * @param {function (MouseEvent) | null} onclick - The event the dropdown entry will fire when clicked. Can override.
 * @example
 * const dropdownManager = __fatweaks.reference("dropdownManager");
 * 
 * dropdownManager.createDropdownEntry("Turn into Duck", "#", module.transformSiteToDuck);
 */
module.createDropdownEntry = function (name = "", href = "#", onclick) {
  let entryDesktop = craftCategoryEntry(name, href, onclick);
  let entryMobile = craftCategoryEntry(name, href, onclick);

  appendToFATweaksHeader(headerDesktop, entryDesktop);
  appendToFATweaksHeader(headerMobile, entryMobile);
}