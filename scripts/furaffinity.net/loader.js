const STYLE = 0b01;
const SCRIPT = 0b10;

const queuedStylesheets = [];
const queuedScripts = [];

let styleHolder;
let scriptHolder;

// Queue plugins
function queuePlugins(plugins) {
  plugins.forEach(([namespace, type, force = false, onByDefault = false]) => {
    let ls_enabled = localStorage.getItem(`fatweaks_settings_loader_${namespace}`);
    if (!force) {
      if (ls_enabled == null && !onByDefault) return;
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
  ["fixOverflowingDropdowns", STYLE, false, true],
  ["mergeMobileBars", STYLE],
  ["mobileFixMessagesButtons", STYLE],
  ["noBBCodeColor", STYLE],
  ["noMoreNews", STYLE],
  ["removeCookiePopup", STYLE],
  ["removeFooterLinks", STYLE],
  ["removeSiteBanner", STYLE],
  ["removeTopbarSupport", STYLE],
  ["removeTopbarTransactions", STYLE],

  ["modules", SCRIPT, true],
  ["settings", SCRIPT, true],
  ["allToggleablePlugins", SCRIPT, true],
  ["dropdownManager", SCRIPT, true],

  ["tabStatus", SCRIPT, false, true],
  ["liveStatus", SCRIPT],

  ["doesAnyoneKnowWhatThoseSymbolsNextToPeoplesUsernamesMean", SCRIPT],
  ["nukeAllMessages", SCRIPT, false, true],
  ["noGalleryPreview", STYLE | SCRIPT],
  ["showMeTheTags", STYLE | SCRIPT],

  ["unwatchDATM", SCRIPT],
  ["systemMessageOverlay", SCRIPT],

  ["externalTargetBlank", SCRIPT, false, true],

  ["faSettingsPage", SCRIPT, true],
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