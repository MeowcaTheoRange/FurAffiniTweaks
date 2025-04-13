const module = __fatweaks.namespace("systemMessageOverlay");

const udatm = __fatweaks.reference("unwatchDATM", false);
const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "System Message Overlay",
  namespace: "systemMessageOverlay"
});
let reloadOnClose = mySettings.boolean({
  id: "reloadOnClose",
  name: "Reload page when system message is closed",
  defaultValue: true
});

const allATags = document.querySelectorAll("a");

const domparser = new DOMParser();

function fail(href) {
  window.location.assign(href);
}

module.closeSysMessage = function (e) {
  if (reloadOnClose) return location.reload();
  let page = e.target.closest("#standardpage");
  page.parentElement.removeChild(page);
}

allATags.forEach((tag) => {
  if (tag.href == null) return;
  if (tag.href.length < 1) return;
  let hrefURL;
  try {
    hrefURL = new URL(tag.href);
  } catch (e) { return }
  if (hrefURL.origin == location.origin)
    tag.addEventListener("click", async (e) => {
      e.preventDefault();
      let request = await fetch(tag.href);
      if (!request.ok) return fail(tag.href);
      let html = await request.text();
      let dom = domparser.parseFromString(html, "text/html");

      if (dom.body.id != "pageid-redirect") return fail(tag.href);

      let thispage = dom.querySelector("#standardpage");

      thispage.style.position = "fixed";
      thispage.style.width = "100%";
      thispage.style.top = "56px";
      thispage.style.zIndex = "1000000";
      let section = thispage.querySelector("section");
      section.style.maxWidth = "768px";
      section.style.boxShadow = "0 4px 8px #0008";
      let redirbutton = section.querySelector("a.button");
      redirbutton.parentElement.innerHTML = `<button class="button standard stop" onclick="window.__fatweaks.modules.systemMessageOverlay.closeSysMessage(event)">Close</button>`;

      document.body.appendChild(thispage);

      if (udatm) udatm.checkDATMPage(hrefURL.pathname);
    });
});