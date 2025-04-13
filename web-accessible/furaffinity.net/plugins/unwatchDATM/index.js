const module = __fatweaks.namespace("unwatchDATM");

const events = __fatweaks.reference("events");

const domparser = new DOMParser();

module.checkDATMPage = async function (mypath = location.pathname) {
  if (mypath == location.pathname && document.body.id != "pageid-redirect") return;
  const uslUnderage = document.querySelector(".notice-message");
  if (uslUnderage == null) return;
  if (!uslUnderage.innerHTML.includes("underage users")) return;
  let linkUser = mypath.split("/")[2];

  async function getUnwatchLink(page = 1) {
    console.log("searching Buddy List page", page);
    let linkRequest = await fetch(window.location.origin + "/controls/buddylist/" + page, {
      method: "GET"
    });
    if (!linkRequest.ok) return null;
    let linkText = await linkRequest.text();
    let dom = domparser.parseFromString(linkText, "text/html");
    let pagesElements = dom.querySelectorAll(".pagination-links > a");
    let pagesCount = pagesElements.length + 1;
    let flexWatchlist = dom.querySelector(".flex-watchlist");
    let userUnwatchLink = flexWatchlist.querySelector(`a[href^="/unwatch/${linkUser}"]`);
    if (userUnwatchLink == null)
      if (page < pagesCount)
        return await getUnwatchLink(page + 1);
      else return null;
    console.log("Found unwatch link");
    let theHref = userUnwatchLink.href;
    theHref = theHref.replace(/\&.*/g, "");
    return theHref;
  }

  // async function getBlockList() {
  //   let linkRequest = await fetch(window.location.origin + "/controls/profile/");
  //   if (!linkRequest.ok) return null;
  //   console.log("Requested");
  //   let linkText = await linkRequest.text();
  //   let dom = domparser.parseFromString(linkText, "text/html");
  //   let requestKeyIN = dom.querySelector("input[name=key]");
  //   let blockListTA = dom.querySelector(`textarea[name=blocklist]`);
  //   console.log("Found blocklist entries");
  //   console.log(dom);
  //   return {
  //     key: requestKeyIN.value,
  //     blocklist: blockListTA.value
  //   };
  // }

  const linkOverride = uslUnderage.querySelector(".link-override");
  const proceedBtn = uslUnderage.querySelector(".proceed-btn-container");

  linkOverride.querySelectorAll(".fatweaks-udatm").forEach(x => x.parentElement.removeChild(x));

  let previHTML = linkOverride.innerHTML;

  if (!mypath.startsWith("/user/")) {
    linkOverride.innerHTML += `<br class="fatweaks-udatm" /><i class="fatweaks-udatm">To unwatch this user using FurAffiniTweaks, you must visit their userpage.</i>`;
    return;
  }

  //   linkOverride.innerHTML += `<br />
  //   <i>FurAffiniTweaks: Fetching block list...</i>`;
  //   let keys = await getBlockList();
  //   linkOverride.innerHTML = previHTML;
  //   if (keys) {
  //     console.log(keys);
  //     proceedBtn.innerHTML = `<form name="MsgForm" style="display:inline;" method="post" action="/controls/profile/">
  //     <input type="hidden" name="do" value="update" />
  //     <input type="hidden" name="key" value="${keys.key}" />
  //     <textarea name="blocklist" readonly style="display:none;">${keys.blocklist}
  // ${linkUser}</textarea>
  //     <input type="submit" value="Block" class="button standard stop" />
  //     </form>` + proceedBtn.innerHTML;
  //   }
  //   previHTML = linkOverride.innerHTML;

  linkOverride.innerHTML += `<br class="fatweaks-udatm" />
  <i class="fatweaks-udatm">FurAffiniTweaks: Finding unwatch link...</i>`;
  let link = await getUnwatchLink();
  linkOverride.innerHTML = previHTML;
  if (link) {
    proceedBtn.innerHTML = `<a class="fatweaks-udatm button standard stop" href="${link}">-Watch</a>` + proceedBtn.innerHTML;
  }
}

module.checkDATMPage();

events.listenToEvent("systemMessageOverlay", "displayed", ({ el, href }) => module.checkDATMPage(href.pathname));