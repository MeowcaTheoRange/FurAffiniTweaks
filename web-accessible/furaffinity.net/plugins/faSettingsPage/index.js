const settings = __fatweaks.reference("settings");
const events = __fatweaks.reference("events");
const dropdownManager = __fatweaks.reference("dropdownManager");

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
  sectionBody.innerHTML = `<div class="align-options-body section_controls">
  <button class="standard">Save</button>
  <button class="standard stop">Close</button>
</div>`;
  sectionBody.querySelector("button.standard").addEventListener("click", () => {
    settings.saveNSes();
    location.reload();
  });
  sectionBody.querySelector("button.stop").addEventListener("click", closeSettingsPage);
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
  description,
  authors,
  fieldName,
  currentValue: value,
  defaultValue: def
}) {
  let controlPanelItemContainer = document.createElement("div");
  controlPanelItemContainer.classList.add("control-panel-option");

  let controlPanelItemDescription = document.createElement("div");
  controlPanelItemDescription.classList.add("control-panel-item-1");

  let controlPanelItemDescriptionText = document.createElement("p");
  controlPanelItemDescriptionText.textContent = fieldName;
  controlPanelItemDescriptionText.style.marginBottom = "0.25em";
  controlPanelItemDescription.appendChild(controlPanelItemDescriptionText);

  if (authors) {
    let controlPanelItemDescriptionAuthors = document.createElement("p");
    controlPanelItemDescriptionAuthors.textContent = "by " + authors.join(", ");
    controlPanelItemDescriptionAuthors.style.fontSize = "0.8em";
    controlPanelItemDescriptionAuthors.style.marginBottom = "0.5em";
    controlPanelItemDescription.appendChild(controlPanelItemDescriptionAuthors);
  }

  if (description) {
    let controlPanelItemDescriptionDesc = document.createElement("p");
    controlPanelItemDescriptionDesc.textContent = description;
    controlPanelItemDescriptionDesc.style.fontSize = "0.75em";
    controlPanelItemDescription.appendChild(controlPanelItemDescriptionDesc);
  }

  controlPanelItemContainer.appendChild(controlPanelItemDescription);

  controlPanelItemContainer.appendChild(
    resolveItemType({ type, namespace, id, fieldName, value, def })
  );

  return controlPanelItemContainer;
}

let hull;
function start() {
  dropdownManager.createDropdownEntry("FurAffiniTweaks Settings", "#", openSettingsPage);

  hull = createSettingsMenuHull();
  let hullbody = hull.querySelector(".section-body");

  events.listenToEvent("settings", "namespaceRegistered", ({ name, namespace }) => {
    let head = createSettingsMenuHeader(name);
    hullbody.appendChild(head);
  });

  events.listenToEvent("settings", "namespaceFieldRegistered", (settingData) => {
    let item = createSettingsMenuItem(settingData);
    hullbody.appendChild(item);
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