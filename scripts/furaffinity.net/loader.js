const STYLE = 0b0001;
const SCRIPT = 0b0010;
const DEFAULT_PLUGIN = 0b0100;
const BASE_PLUGIN = 0b1000;

const queuedStylesheets = [];
const queuedScripts = [];

let styleHolder;
let scriptHolder;

// Queue plugins
function queuePlugins(plugins) {
  plugins.forEach(([namespace, type]) => {
    let ls_enabled = localStorage.getItem(`fatweaks_settings_loader_${namespace}`);
    if (!(type & BASE_PLUGIN)) {
      if (ls_enabled == null && !(type & DEFAULT_PLUGIN)) return;
      if (ls_enabled != null && ls_enabled != "true") return;
    }
    console.debug(`Queued ${namespace}`);

    if (type & SCRIPT) {
      const scriptUrl = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/index.js`);
      queuedScripts.push(scriptUrl);
    }

    if (type & STYLE) {
      const styleUrl = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/style.css`);
      queuedStylesheets.push(styleUrl);
    }
  });
}

// Plugin declarations
queuePlugins([
  // Styles are here to be loaded as fast as possible
  ["fixOverflowingDropdowns", STYLE | DEFAULT_PLUGIN],
  ["mergeMobileBars", STYLE],
  ["mobileFixMessagesButtons", STYLE],
  ["noBBCodeColor", STYLE],
  ["noMoreNews", STYLE],
  ["removeCookiePopup", STYLE],
  ["removeFooterLinks", STYLE],
  ["removeSiteBanner", STYLE],
  ["removeTopbarSupport", STYLE],
  ["removeTopbarTransactions", STYLE],

  // Base stuff, most plugins need at least one of these
  ["modules", SCRIPT | BASE_PLUGIN],
  ["events", SCRIPT | BASE_PLUGIN],
  ["settings", SCRIPT | BASE_PLUGIN],
  ["allToggleablePlugins", SCRIPT | BASE_PLUGIN],
  ["dropdownManager", SCRIPT | BASE_PLUGIN],
  ["faSettingsPage", SCRIPT | BASE_PLUGIN],

  // Plugins here
  ["doesAnyoneKnowWhatThoseSymbolsNextToPeoplesUsernamesMean", SCRIPT],
  ["nukeAllMessages", SCRIPT | DEFAULT_PLUGIN],
  ["tabStatus", SCRIPT | DEFAULT_PLUGIN],
  ["liveStatus", SCRIPT],
  ["externalTargetBlank", SCRIPT | DEFAULT_PLUGIN],

  ["liveStatusAlert", STYLE | SCRIPT],
  ["noGalleryPreview", STYLE | SCRIPT],
  ["showMeTheTags", STYLE | SCRIPT],

  ["systemMessageOverlay", SCRIPT],
  ["unwatchDATM", SCRIPT],

  // Runs when all plugins load, unlatches events
  ["allPluginsLoaded", SCRIPT | DEFAULT_PLUGIN],
]);

// Style injection
function createStyleHolder(root) {
  const container = document.createElement("div");
  container.id = "fatweaks-style-holder";
  root.appendChild(container);
  return container;
}

function injectStyle(src, parent = document.head) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = src;
  parent.appendChild(link);
}

async function onHeadLoaded() {
  styleHolder = createStyleHolder(document.documentElement);
  queuedStylesheets.forEach(src => injectStyle(src, styleHolder));
}

onHeadLoaded();

// Script injection
function createScriptHolder(root) {
  const container = document.createElement("div");
  container.id = "fatweaks-script-holder";
  root.appendChild(container);
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
  queuedScripts.forEach(src => injectScript(src, scriptHolder));
}

document.addEventListener("DOMContentLoaded", () => {
  onPageLoaded();
  styleHolder.parentNode.appendChild(styleHolder);
  scriptHolder.parentNode.appendChild(scriptHolder);
});