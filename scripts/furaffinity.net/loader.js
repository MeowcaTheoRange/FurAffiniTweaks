const STYLE = 0b01;
const SCRIPT = 0b10;

const queuedStylesheets = [];
const queuedScripts = [];

let styleHolder;
let scriptHolder;

// Queue plugins
function queuePlugin(namespace, type) {
  console.log(`Queued ${namespace}`);

  if (type & SCRIPT) {
    console.log("Has script");
    const scriptUrl = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/index.js`);
    queuedScripts.push(scriptUrl);
  }

  if (type & STYLE) {
    console.log("Has style");
    const styleUrl = browser.runtime.getURL(`web-accessible/furaffinity.net/plugins/${namespace}/style.css`);
    queuedStylesheets.push(styleUrl);
  }
}

// Plugin declarations
[
  ["mergeMobileBars", STYLE],
  ["mobileFixMessagesButtons", STYLE],
  ["noBBCodeColor", STYLE],
  ["noMoreNews", STYLE],
  ["removeCookiePopup", STYLE],
  ["removeFooterLinks", STYLE],
  ["removeSiteBanner", STYLE],
  ["removeTopbarSupport", STYLE],
  ["removeTopbarTransactions", STYLE],

  ["modules", SCRIPT],
  ["tabStatus", SCRIPT],
  ["liveStatus", SCRIPT],
  ["unwatchDATM", SCRIPT],
  ["systemMessageOverlay", SCRIPT],
  ["nukeAllMessages", SCRIPT],

  ["noGalleryPreview", STYLE | SCRIPT],
  ["showMeTheTags", STYLE | SCRIPT]
].forEach(([name, type]) => queuePlugin(name, type));

// Style injection
function createStyleHolder(root) {
  const container = document.createElement("div");
  container.id = "fatweaks-style-holder";
  root.appendChild(container);
  return container;
}

//**
// function injectStyle(src, parent = document.head) {
//   const link = document.createElement("link");
//   link.href = src;
//   link.rel = "preload stylesheet"; // Note: this is invalid, updated function below
//   link.setAttribute("blocking", "render");
//   parent.appendChild(link);
// }
//*/

function injectStyle(src, parent = document.head) {
  const supportsPreload = document.createElement("link").relList.supports?.("preload");

  if (supportsPreload) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = src;
    link.as = "style";
    link.setAttribute("blocking", "render");

    const swapRel = () => {
      link.rel = "stylesheet";
      link.removeAttribute("as");
    };

    link.onload = swapRel;
    link.onerror = swapRel;

    parent.appendChild(link);
  } else {
    const fallback = document.createElement("link");
    fallback.rel = "stylesheet";
    fallback.href = src;
    fallback.setAttribute("blocking", "render");
    parent.appendChild(fallback);
  }
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