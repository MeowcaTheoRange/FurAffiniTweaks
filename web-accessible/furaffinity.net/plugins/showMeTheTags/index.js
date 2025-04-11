const domparser = new DOMParser();

let uploads = document.querySelectorAll("img[data-tags]");

uploads.forEach((upload_elem) => {
  let link = upload_elem.parentElement;
  let figure = upload_elem.closest('figure');

  if (figure == null) return;

  let figure2 = figure.cloneNode(false);
  while (figure.hasChildNodes()) figure2.appendChild(figure.firstChild);
  figure.replaceWith(figure2);
  figure = figure2;
  let section = figure.parentElement;

  if (link == null) return;
  let fa_fig = figure.querySelector("figcaption");
  if (fa_fig) {
    if (section.classList.contains("nodesc"))
      link.appendChild(fa_fig);
    else figure.appendChild(fa_fig);
  }

  let tags = upload_elem.dataset.tags;
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