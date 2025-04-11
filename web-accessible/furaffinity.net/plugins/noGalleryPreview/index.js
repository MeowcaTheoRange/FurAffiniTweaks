const submdata_element = document.getElementById('js-submissionData');
const submission_data = JSON.parse(submdata_element?.textContent ?? '{}');
const uploads = document.querySelectorAll("img[data-tags]");

function buildFigCaption(sid, title, username, displayName = username) {
  let figcaption = document.createElement("figcaption");

  let titleP = document.createElement("p");
  figcaption.appendChild(titleP);
  let authorP = document.createElement("p");
  figcaption.appendChild(authorP);

  let titleA = document.createElement("a");
  titleA.href = `/view/${sid}/`;
  titleA.title = title;
  titleA.textContent = title;
  titleP.appendChild(titleA);

  let authorI = document.createElement("i");
  authorI.textContent = "by";
  authorP.appendChild(authorI);

  let authorSpace = document.createTextNode(" ");
  authorP.appendChild(authorSpace);

  let authorA = document.createElement("a");
  authorA.href = `/user/${username}/`;
  authorA.title = displayName;
  authorA.textContent = displayName;
  authorP.appendChild(authorA);

  return figcaption;
}

uploads.forEach((upload_elem) => {
  let link = upload_elem.parentElement;
  let figure = upload_elem.closest('figure');

  if (figure == null) return;

  if (figure.querySelector("figcaption")) return;

  let gsection = upload_elem.closest(".nodesc");
  if (gsection) gsection.classList.remove("nodesc");

  // get image data
  let sid = figure.id.slice(4);
  let sdata = submission_data[sid];

  if (sdata == null) return;

  let figcaption = buildFigCaption(sid, sdata.title, sdata.lower, sdata.username);

  figure.appendChild(figcaption);
});