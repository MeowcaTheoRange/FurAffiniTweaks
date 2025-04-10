function createStyleHolder() {
  let container = document.createElement("div");
  document.head.appendChild(container);
  return container;
}
function injectStyle(src, parent = document.head) {
  let url = browser.runtime.getURL("web-accessible/furaffinity.net/styles/" + src);
  const link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  parent.appendChild(link);
}
async function onHeadLoaded() {
  const styleHolder = createStyleHolder(document.head);
  injectStyle("mergeMobileBars.css", styleHolder);
  injectStyle("mobileWhyYouDoThat.css", styleHolder);
  injectStyle("noGalleryPreview.css", styleHolder);
  injectStyle("noMoreNews.css", styleHolder);
  injectStyle("removeCookiePopup.css", styleHolder);
  injectStyle("removeFooterLinks.css", styleHolder);
  injectStyle("removeSiteBanner.css", styleHolder);
  injectStyle("removeTopbarSupport.css", styleHolder);
  injectStyle("removeTopbarTransactions.css", styleHolder);
  injectStyle("showMeTheTags.css", styleHolder);
}

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

function createScriptHolder() {
  let container = document.createElement("div");
  document.body.appendChild(container);
  return container;
}

function injectScript(src, parent = document.body) {
  let url = browser.runtime.getURL("web-accessible/furaffinity.net/scripts/" + src);
  const script = document.createElement("script");
  script.src = url;
  script.type = "module";
  parent.appendChild(script);
}

function onPageLoaded() {
  console.log("FurAffiniTweaks loaded!");
  const scriptHolder = createScriptHolder();
  injectScript("base.js", scriptHolder);
  injectScript("tooltip.js", scriptHolder);
  injectScript("noGalleryPreview.js", scriptHolder);
  injectScript("nukeAllMessages.js", scriptHolder);
  injectScript("showMeTheTags.js", scriptHolder);
  injectScript("titlebarStatus.js", scriptHolder);
  injectScript("liveStatus.js", scriptHolder);
  injectScript("unwatchDATM.js", scriptHolder);
  onHeadLoaded();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);