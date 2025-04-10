const fatweaks = window.__fatweaks;
fatweaks.smtt = {};
let module = fatweaks.smtt;

// let tooltip = fatweaks.tooltip;

const domparser = new DOMParser();

// function fail() {
//   tooltip.hideTooltip();
// }

// document.addEventListener("mouseover", (e) => {
//   if (e.target.tagName !== "IMG") return fail();
//   if (e.target.dataset.tags == null) return fail();
//   if (e.target.dataset.tags.length < 1)
//     tooltip.showTooltip("[No tags]");
//   else
//     tooltip.showTooltip(e.target.dataset.tags);
// });
// document.addEventListener("mouseout", fail);

let elements = document.querySelectorAll("figure");

elements.forEach((figure) => {
  let figure2 = figure.cloneNode(true);
  figure.replaceWith(figure2);
  figure = figure2;
  let section = figure.parentElement;

  let link = figure.querySelector("a");
  if (link == null) return;
  let fa_fig = figure.querySelector("figcaption");
  if (fa_fig) {
    if (section.classList.contains("nodesc"))
      link.appendChild(fa_fig);
    else figure.appendChild(fa_fig);
  }

  let img = link.querySelector("img");

  let tags = img.dataset.tags;
  let figcaption = document.createElement("figcaption");
  let p = document.createElement("p");
  p.innerHTML = tags || "[No tags]";
  // figcaption.setAttribute("style", "display: block !important;");
  figcaption.appendChild(p);
  if (section.classList.contains("nodesc"))
    figure.appendChild(figcaption);
  else link.appendChild(figcaption);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("nodesc")) {
        if (figcaption) figure.appendChild(figcaption);
        if (fa_fig) link.appendChild(fa_fig);
      } else {
        if (figcaption) link.appendChild(figcaption);
        if (fa_fig) figure.appendChild(fa_fig);
      }
    });
  });

  observer.observe(section, { attributes: true, attributeFilter: ['class'] });
})