const module = __fatweaks.namespace("nukeAllMessages");

const domparser = new DOMParser();

async function checkUCPPage() {
  if (!location.pathname.startsWith("/msg/others")) return;
  let global_selection_panel = document.querySelector("#messages-form > section:last-child");
  if (global_selection_panel == null) return;
  let buttons = global_selection_panel.querySelector(".align-options-header");
  buttons.insertAdjacentHTML("beforeend", `<button class="nuke" onclick="window.__fatweaks.modules.nukeAllMessages.nukeAll(event)">
  <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
    <path d="M9.912 8.531 7.121 3.877a.501.501 0 0 0-.704-.166 9.982 9.982 0 0 0-4.396 7.604.505.505 0 0 0 .497.528l5.421.09a4.042 4.042 0 0 1 1.973-3.402zm8.109-4.51a.504.504 0 0 0-.729.151L14.499 8.83a4.03 4.03 0 0 1 1.546 3.112l5.419-.09a.507.507 0 0 0 .499-.53 9.986 9.986 0 0 0-3.942-7.301zm-4.067 11.511a4.015 4.015 0 0 1-1.962.526 4.016 4.016 0 0 1-1.963-.526l-2.642 4.755a.5.5 0 0 0 .207.692A9.948 9.948 0 0 0 11.992 22a9.94 9.94 0 0 0 4.396-1.021.5.5 0 0 0 .207-.692l-2.641-4.755z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
</button>`);
  buttons = global_selection_panel.querySelector(".align-options-body");
  buttons.insertAdjacentHTML("beforeend", `<button class="nuke" onclick="window.__fatweaks.modules.nukeAllMessages.nukeAll(event)">
  <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
    <path d="M9.912 8.531 7.121 3.877a.501.501 0 0 0-.704-.166 9.982 9.982 0 0 0-4.396 7.604.505.505 0 0 0 .497.528l5.421.09a4.042 4.042 0 0 1 1.973-3.402zm8.109-4.51a.504.504 0 0 0-.729.151L14.499 8.83a4.03 4.03 0 0 1 1.546 3.112l5.419-.09a.507.507 0 0 0 .499-.53 9.986 9.986 0 0 0-3.942-7.301zm-4.067 11.511a4.015 4.015 0 0 1-1.962.526 4.016 4.016 0 0 1-1.963-.526l-2.642 4.755a.5.5 0 0 0 .207.692A9.948 9.948 0 0 0 11.992 22a9.94 9.94 0 0 0 4.396-1.021.5.5 0 0 0 .207-.692l-2.641-4.755z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
  </button>`);
}

module.nukeAll = function (event) {
  let is_this_ok = window.confirm("Nuke All (FurAffiniTweaks): All messages will be removed.\nAre you sure?");
  if (!is_this_ok) return event.preventDefault();
  function createInput(name = "", value = "") {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  }
  let form = document.querySelector("#messages-form");
  form.prepend(createInput("nuke-watches", "Nuke Watches"));
  form.prepend(createInput("nuke-submission-comments", "Nuke Submission Comments"));
  form.prepend(createInput("nuke-journal-comments", "Nuke Journal Comments"));
  form.prepend(createInput("nuke-shouts", "Nuke Shouts"));
  form.prepend(createInput("nuke-journals", "Nuke Journals"));
  form.prepend(createInput("nuke-favorites", "Nuke Favorites"));
};

checkUCPPage();