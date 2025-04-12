const module = __fatweaks.namespace("externalTargetBlank");

const allATags = document.querySelectorAll("a");

allATags.forEach((tag) => {
  if (tag.href == null) return;
  if (tag.href.length < 1) return;
  let hrefURL = new URL(tag.href);
  if (hrefURL.origin == location.origin) return;
  tag.target = "_blank";
});