const STYLE = 0b0001;
const SCRIPT = 0b0010;
const DEFAULT_PLUGIN = 0b0100;
const BASE_PLUGIN = 0b1000;

const queuedStylesheets = [];
const baseScripts = [];
const otherScripts = [];

let styleHolder;
let scriptHolder;

window.__fatweaks = {
  loadedPlugins: new Set(),
  failedPlugins: new Set()
};

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
  ["iDontCareIfYoureAnAdminYoureFuckingUpMySchema", STYLE],
  ["mergeMobileBars", STYLE],
  ["mobileFixMessagesButtons", STYLE],
  ["noBBCodeColor", STYLE],
  ["noMoreNews", STYLE],
  ["removeCookiePopup", STYLE],
  ["removeFooterLinks", STYLE],
  ["removeSiteBanner", STYLE],
  ["resizeTextareaBoxes", STYLE | DEFAULT_PLUGIN],
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

  ["furAffinAmp", STYLE | SCRIPT],
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
  const existing = document.getElementById("fatweaks-style-holder");
  if (existing) return existing;

  const container = document.createElement("div");
  container.id = "fatweaks-style-holder";
  root.appendChild(container);
  return container;
}
function injectStyle(styleData, parent = document.head) {
  return new Promise((resolve, reject) => {
    const { namespace, url } = typeof styleData === 'string' 
      ? { namespace: 'unknown', url: styleData }
      : styleData;
      
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.dataset.plugin = namespace;
    
    link.onload = () => {
      window.__fatweaks.loadedPlugins.add(namespace);
      resolve();
    };
    
    link.onerror = (err) => {
      console.error(`Failed to load style: ${namespace}`, err);
      window.__fatweaks.failedPlugins.add(namespace);
      reject(err);
    };
    
    parent.appendChild(link);
  });
}
async function loadStyles() {
  const stylePromises = queuedStylesheets.map(style => 
    injectStyle(style, styleHolder).catch(err => {
      console.warn(`Style loading error:`, err);
    })
  );
  
  await Promise.allSettled(stylePromises);
}


// Script injection
function createScriptHolder(root) {
  const existing = document.getElementById("fatweaks-script-holder");
  if (existing) return existing;
  
  const container = document.createElement("div");
  container.id = "fatweaks-script-holder";
  root.appendChild(container);
  return container;
}
function injectScript(scriptData, parent) {
  return new Promise((resolve, reject) => {
    const { namespace, url } = typeof scriptData === 'string'
      ? { namespace: 'unknown', url: scriptData }
      : scriptData;
      
    const script = document.createElement("script");
    script.src = url;
    script.type = "module";
    script.dataset.plugin = namespace;
    
    script.onload = () => {
      window.__fatweaks.loadedPlugins.add(namespace);
      resolve();
    };
    
    script.onerror = (err) => {
      console.error(`Failed to load plugin: ${namespace}`, err);
      window.__fatweaks.failedPlugins.add(namespace);
      reject(err);
    };
    
    parent.appendChild(script);
  });
}
async function loadScripts() {
  for (const script of baseScripts) {
    try {
      await injectScript(script, scriptHolder);
    } catch (err) {
      console.error(`Critical error loading base script: ${script.namespace || script}`, err);
      if (script.namespace === 'modules' || script.namespace === 'events') {
        console.error('Essential base module failed. Stopping plugin loading.');
        return;
      }
    }
  }

  const scriptPromises = otherScripts.map(script => 
    injectScript(script, scriptHolder).catch(err => {
      console.warn(`Plugin loading error:`, err);
    })
  );

  await Promise.allSettled(scriptPromises);
  
  document.dispatchEvent(new CustomEvent('fatweaks:allPluginsLoaded', {
    detail: {
      loadedPlugins: Array.from(window.__fatweaks.loadedPlugins),
      failedPlugins: Array.from(window.__fatweaks.failedPlugins)
    }
  }));
}


async function onHeadLoaded() {
  styleHolder = createStyleHolder(document.documentElement);
  await loadStyles();
}
async function onPageLoaded() {
  scriptHolder = createScriptHolder(document.body);
  await loadScripts();
}
onHeadLoaded();


if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", onPageLoaded);
} else {
  onPageLoaded();
}

// Removed the DOM reattachment because that might cause flicker
document.addEventListener("DOMContentLoaded", () => {
  if (styleHolder && !styleHolder.isConnected) {
    document.documentElement.appendChild(styleHolder);
  }
  
  if (scriptHolder && !scriptHolder.isConnected) {
    document.body.appendChild(scriptHolder);
  }
});