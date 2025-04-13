const allATags = document.querySelectorAll("a");

allATags.forEach((tag) => {
  if (tag.href == null) return;
  if (tag.href.length < 1) return;
  let hrefURL;
  try {
    hrefURL = new URL(tag.href);
  } catch (e) { }
  if (hrefURL.origin == location.origin) return;
  tag.target = "_blank";
});