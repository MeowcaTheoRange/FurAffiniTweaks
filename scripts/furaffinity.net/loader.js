async function waitFor(selector, base = document, timeout = 1000) {
  const pollInterval = 0;
  const endTime = Date.now() + timeout;

  return new Promise((res, rej) => {
    const check = () => {
      const element = base.querySelector(selector);
      if (element) res(element);
      else if (Date.now() > endTime) rej();
      else setTimeout(check, pollInterval);
    };
    check();
  });
}

let styleHolder;
let scriptHolder;

function createStyleHolder(element) {
  let container = document.createElement("div");
  container.id = "fatweaks-style-holder";
  element.appendChild(container);
  return container;
}
function injectStyle(src, parent = document.head) {
  let url = browser.runtime.getURL("web-accessible/furaffinity.net/styles/" + src);
  const link = document.createElement("link");
  link.href = url;
  link.rel = "preload stylesheet";
  link.setAttribute('blocking', 'render');
  parent.appendChild(link);
}
async function onHeadLoaded() {
  styleHolder = createStyleHolder(document.documentElement);
  console.log("Loading styles...");
  injectStyle("mergeMobileBars.css", styleHolder);
  injectStyle("mobileWhyYouDoThat.css", styleHolder);
  injectStyle("noBBCodeColor.css", styleHolder);
  injectStyle("noGalleryPreview.css", styleHolder);
  injectStyle("noMoreNews.css", styleHolder);
  injectStyle("removeCookiePopup.css", styleHolder);
  injectStyle("removeFooterLinks.css", styleHolder);
  injectStyle("removeSiteBanner.css", styleHolder);
  injectStyle("removeTopbarSupport.css", styleHolder);
  injectStyle("removeTopbarTransactions.css", styleHolder);
  injectStyle("showMeTheTags.css", styleHolder);
}
onHeadLoaded();

function createScriptHolder(element) {
  let container = document.createElement("div");
  container.id = "fatweaks-script-holder";
  element.appendChild(container);
  return container;
}
function injectScript(src, parent = document.body) {
  let url = browser.runtime.getURL("web-accessible/furaffinity.net/scripts/" + src);
  const script = document.createElement("script");
  script.src = url;
  script.type = "module";
  script.defer = true;
  parent.appendChild(script);
}
async function onPageLoaded() {
  console.log("FurAffiniTweaks loaded!");
  scriptHolder = createScriptHolder(document.body);
  injectScript("base.js", scriptHolder);

  injectScript("tooltip.js", scriptHolder);
  injectScript("noGalleryPreview.js", scriptHolder);

  injectScript("titlebarStatus.js", scriptHolder);
  injectScript("liveStatus.js", scriptHolder);

  injectScript("nukeAllMessages.js", scriptHolder);
  injectScript("showMeTheTags.js", scriptHolder);

  injectScript("unwatchDATM.js", scriptHolder);
  injectScript("systemMessageOverlay.js", scriptHolder);
}

document.addEventListener("DOMContentLoaded", () => {
  onPageLoaded();
  styleHolder.parentNode.appendChild(styleHolder);
  scriptHolder.parentNode.appendChild(scriptHolder);
});