const fatweaks = window.__fatweaks;
fatweaks.ngp = {};
let module = fatweaks.ngp;

let tooltip = fatweaks.tooltip;

const domparser = new DOMParser();

let gal_lat_cache = {};

function fail() {
  tooltip.hideTooltip();
  return;
}

function tooltipable(element) {
  let curSub = "";
  element.addEventListener("mouseover", async (e) => {
    if (e.target == element) return;
    if (e.target.tagName !== "IMG") return;
    tooltip.showTooltip("Loading...");
    let link = e.target.parentElement;
    if (link == null) return fail();
    curSub = link.href;
    if (gal_lat_cache[link.href] == null) {
      let linkRequest = await fetch(link.href);
      if (!linkRequest.ok) return fail();
      let linkText = await linkRequest.text();
      let dom = domparser.parseFromString(linkText, "text/html");
      let title = dom.querySelector(".submission-title > h2 > p").textContent;
      let author = dom.querySelector(".submission-id-sub-container .c-usernameBlockSimple__displayName").textContent;
      gal_lat_cache[link.href] = `${title} by ${author}`;
    }
    if (curSub != link.href) return;
    tooltip.showTooltip(gal_lat_cache[curSub]);
  });
  element.addEventListener("mouseout", async (e) => {
    tooltip.hideTooltip();
    curSub = "";
  });
}

const galleryLatestS = document.querySelector("#gallery-latest-submissions");
if (galleryLatestS) tooltipable(galleryLatestS);

const galleryLatestF = document.querySelector("#gallery-latest-favorites");
if (galleryLatestF) tooltipable(galleryLatestF);