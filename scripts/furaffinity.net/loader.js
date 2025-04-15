const STYLE = 0b0001;
const SCRIPT = 0b0010;
const DEFAULT_PLUGIN = 0b0100;
const BASE_PLUGIN = 0b1000;

const queuedStylesheets = [];
const baseScripts = [];
const otherScripts = [];

let styleHolder;
let scriptHolder;

window.__fatweaks = {};

// Queue plugins
function queuePlugins(plugins) {
  plugins.forEach(([namespace, type]) => {
    const enabled = localStorage.getItem(`fatweaks_settings_loader_${namespace}`);
    const shouldLoad =
      (type & BASE_PLUGIN) || // always load base
      (enabled === "true") || // explicitly enabled
      (enabled === null && (type & DEFAULT_PLUGIN)); // default on

    if (!shouldLoad) return;
    console.debug(`Queued ${namespace}`);

    if (type & SCRIPT) {
      const scriptUrl = chrome.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/index.js`);
      if (type & BASE_PLUGIN) {
        baseScripts.push(scriptUrl);
      } else {
        otherScripts.push(scriptUrl);
      }
    }

    if (type & STYLE) {
      const styleUrl = chrome.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/style.css`);
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

  ["uwu", SCRIPT],

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


// Sequential script injection
function createScriptHolder(root) {
  const container = document.createElement("div");
  container.id = "fatweaks-script-holder";
  root.appendChild(container);
  return container;
}

function injectScriptSequentially(src, parent) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    script.onload = resolve;
    script.onerror = reject;
    parent.appendChild(script);
  });
}

async function onPageLoaded() {
  scriptHolder = createScriptHolder(document.body);

  for (const src of baseScripts) {
    try {
      await injectScriptSequentially(src, scriptHolder);
    } catch (err) {
      console.error(`Failed to load base script: ${src}`, err);
    }
  }

  for (const src of otherScripts) {
    try {
      await injectScriptSequentially(src, scriptHolder);
    } catch (err) {
      console.error(`Failed to load plugin: ${src}`, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  onPageLoaded();
  styleHolder.parentNode.appendChild(styleHolder);
  scriptHolder.parentNode.appendChild(scriptHolder);
});