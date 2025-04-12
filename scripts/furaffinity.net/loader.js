let styleHolder;
let scriptHolder;

let queuedStylesheets = [];
let queuedScripts = [];

// Plugin functions

function queuePlugin(namespace, type) {
  let ls_enabled = localStorage.getItem(`fatweaks_settings_loader_${namespace}`);
  if (ls_enabled != null && ls_enabled != "true") return;
  if ((type & 0b10) > 0) {
    let script_url = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/index.js`);
    queuedScripts.push(script_url);
  }
  if ((type & 0b01) > 0) {
    let styles_url = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/style.css`);
    queuedStylesheets.push(styles_url);
  }
}

queuePlugin("fixOverflowingDropdowns", 1);
queuePlugin("mergeMobileBars", 1);
queuePlugin("mobileFixMessagesButtons", 1);
queuePlugin("noBBCodeColor", 1);
queuePlugin("noMoreNews", 1);
queuePlugin("removeCookiePopup", 1);
queuePlugin("removeFooterLinks", 1);
queuePlugin("removeSiteBanner", 1);
queuePlugin("removeTopbarSupport", 1);
queuePlugin("removeTopbarTransactions", 1);

queuePlugin("modules", 2);
queuePlugin("settings", 2);
queuePlugin("allToggleablePlugins", 2);

queuePlugin("tabStatus", 2);
queuePlugin("liveStatus", 2);

queuePlugin("unwatchDATM", 2);
queuePlugin("systemMessageOverlay", 2);

queuePlugin("nukeAllMessages", 2);
queuePlugin("noGalleryPreview", 3);
queuePlugin("showMeTheTags", 3);

queuePlugin("faSettingsPage", 2);


// Style functions

function createStyleHolder(element) {
  let container = document.createElement("div");
  container.id = "fatweaks-style-holder";
  element.appendChild(container);
  return container;
}

function injectStyle(src, parent = document.head) {
  const link = document.createElement("link");
  link.href = src;
  link.rel = "preload stylesheet";
  link.setAttribute('blocking', 'render');
  parent.appendChild(link);
}

async function onHeadLoaded() {
  styleHolder = createStyleHolder(document.documentElement);
  queuedStylesheets.forEach(x => injectStyle(x, styleHolder));
}

onHeadLoaded();

// Script functions

function createScriptHolder(element) {
  let container = document.createElement("div");
  container.id = "fatweaks-script-holder";
  element.appendChild(container);
  return container;
}
function injectScript(src, parent = document.body) {
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.defer = true;
  parent.appendChild(script);
}
async function onPageLoaded() {
  scriptHolder = createScriptHolder(document.body);
  queuedScripts.forEach(x => injectScript(x, scriptHolder));
}

document.addEventListener("DOMContentLoaded", () => {
  onPageLoaded();
  styleHolder.parentNode.appendChild(styleHolder);
  scriptHolder.parentNode.appendChild(scriptHolder);
});