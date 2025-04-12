const settings = __fatweaks.reference("settings");

function craftCategory(upper) {
  let headerElement = document.createElement("h3");
  headerElement.innerHTML = upper ? "FURAFFINITWEAKS" : "FurAffiniTweaks";

  let aElement = document.createElement("a");
  aElement.innerHTML = "Plugin Settings";
  aElement.href = "#";
  aElement.onclick = openSettingsPage;

  return [headerElement, aElement];
}

function createSettingsMenuHull() {
  let container = document.createElement("div");
  container.id = "fatweaks_faSettingsPage_settingsPage";
  container.style.position = "fixed";
  container.style.width = "100%";
  container.style.height = "100vh";
  container.style.display = "none";
  container.style.backgroundColor = "#0008";
  container.style.overflowY = "hidden";
  container.style.top = "0";
  container.style.zIndex = "100000000";

  let section = document.createElement("section");
  section.classList.add("aligncenter");
  section.style.maxWidth = "768px";
  section.style.height = "calc(100% - 20px)";
  section.style.overflow = "hidden";
  section.style.boxShadow = "0 4px 8px #0008";
  section.style.textAlign = "start";
  container.appendChild(section);

  let sectionHeader = document.createElement("div");
  sectionHeader.classList.add("section-header");
  sectionHeader.innerHTML = `<div class="align-options-header section_controls">
  <button class="standard">Save</button>
  <button class="standard stop">Close</button>
</div>
<h2>FurAffiniTweaks Settings</h2>`;
  sectionHeader.querySelector("button.standard").addEventListener("click", () => {
    settings.saveNSes();
    location.reload();
  });
  sectionHeader.querySelector("button.stop").addEventListener("click", closeSettingsPage);
  section.appendChild(sectionHeader);

  let sectionBody = document.createElement("div");
  sectionBody.classList.add("section-body");
  sectionBody.style.height = "calc(100% - 42px)";
  sectionBody.style.boxSizing = "border-box";
  sectionBody.style.overflowY = "auto";
  section.appendChild(sectionBody);

  return container;
}

function createSettingsMenuHeader(header) {
  let hhhh = document.createElement("h4");
  hhhh.textContent = header;

  return hhhh;
}

function resolveItemType({
  type,
  namespace,
  id,
  fieldName,
  value,
  def
}) {
  let controlPanelItemOptions = document.createElement("div");
  controlPanelItemOptions.classList.add("control-panel-item-2");

  switch (type) {
    case "boolean":
      let select = document.createElement("select");

      let optionFalse = document.createElement("option");
      optionFalse.textContent = "Off";
      optionFalse.value = "false";
      select.appendChild(optionFalse);

      let optionTrue = document.createElement("option");
      optionTrue.textContent = "On";
      optionTrue.value = "true";
      select.appendChild(optionTrue);

      select.selectedIndex = +value;
      select.addEventListener("change", () => {
        settings.setNSSetting(namespace, id, select.value == "true");
      });

      controlPanelItemOptions.appendChild(select);
      break;
    case "number":
      let input = document.createElement("input");
      input.type = "number";
      input.value = value;
      input.classList.add("textbox");

      input.addEventListener("change", () => {
        if (isNaN(parseFloat(input.value))) return;
        settings.setNSSetting(namespace, id, +input.value);
      });

      controlPanelItemOptions.appendChild(input);
      break;
  }

  return controlPanelItemOptions;
}

function createSettingsMenuItem({
  type,
  namespace,
  id,
  name: fieldName,
  currentValue: value,
  defaultValue: def
}) {
  let controlPanelItemContainer = document.createElement("div");
  controlPanelItemContainer.classList.add("control-panel-option");

  let controlPanelItemDescription = document.createElement("div");
  controlPanelItemDescription.classList.add("control-panel-item-1");
  controlPanelItemDescription.textContent = fieldName;
  controlPanelItemContainer.appendChild(controlPanelItemDescription);

  controlPanelItemContainer.appendChild(
    resolveItemType({ type, namespace, id, fieldName, value, def })
  );

  return controlPanelItemContainer;
}

function createSettingsDropdownMenu() {
  let settingsButton = document.querySelector("li.submenu-trigger:last-of-type");
  if (settingsButton == null) return;
  let dropdownColumn = settingsButton.querySelector(".dropdown-right .column");
  if (dropdownColumn == null) return;
  let category = craftCategory();
  dropdownColumn.prepend(...category);
}
function createSettingsDropdownMenuMobile() {
  let settingsButton = document.querySelector(".mobile-nav-content-container div.nav-ac-container:last-of-type");
  if (settingsButton == null) return;
  let dropdownColumn = settingsButton.querySelector(".nav-ac-content.nav-ac-content-dropdown");
  if (dropdownColumn == null) return;
  let category = craftCategory(true);
  dropdownColumn.prepend(...category);
}

let hull;
function start() {
  createSettingsDropdownMenu();
  createSettingsDropdownMenuMobile();

  hull = createSettingsMenuHull();
  let hullbody = hull.querySelector(".section-body");

  settings.getNSes().forEach((namespace) => {
    let head = createSettingsMenuHeader(settings.getNSName(namespace));
    hullbody.appendChild(head);
    settings.getNSSettings(namespace).forEach((setting) => {
      let settingData = settings.getNSSetting(namespace, setting);
      settingData.id = setting;
      settingData.namespace = namespace;
      let item = createSettingsMenuItem(settingData);
      hullbody.appendChild(item);
    });
  });

  document.body.appendChild(hull);
}

function openSettingsPage(e) {
  hull.style.display = "block";
  e.preventDefault();
}

function closeSettingsPage(e) {
  hull.style.display = "none";
  e?.preventDefault();
}

start();
