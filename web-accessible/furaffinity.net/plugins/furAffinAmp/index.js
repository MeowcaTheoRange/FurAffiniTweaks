import "./webamp.bundle.min.js";

const module = __fatweaks.namespace("furAffinAmp");

function extractArrayFrom() {
  return new Promise((res, rej) => {
    let iframe = document.createElement("iframe");
    iframe.onload = () => {
      res(iframe.contentWindow.Array.from);
      iframe.remove();
    };
    iframe.onerror = () => {
      rej();
      iframe.remove();
    };
    document.documentElement.appendChild(iframe);
  });
}

function getAudioData() {
  /** @type {?HTMLAudioElement} */
  let element = document.querySelector(".audio-player");
  let title = document.querySelector(".submission-title");
  let artist = document.querySelector(".c-usernameBlockSimple__displayName");

  if (element == null || title == null || artist == null) return;

  element.remove();

  return [{
    metaData: {
      artist: artist.textContent.trim(),
      title: title.textContent.trim()
    },
    url: element.src
  }]
}

async function loadWebamp() {
  let newList = JSON.parse(localStorage.getItem("fatweaks_furAffinAmp_tracks") ?? "[]");

  let audioData = getAudioData() ?? [];

  if (audioData.length < 1 && newList.length < 1) return;

  let container = document.createElement("div");
  container.id = "fatweaks-furAffinAmp-webampContainer";
  container.innerHTML = " ";
  document.body.appendChild(container);

  module.webamp = new Webamp({
    handleLoadListEvent: () => JSON.parse(localStorage.getItem("fatweaks_furAffinAmp_tracks") ?? "[]"),
    handleSaveListEvent: (tracks) => {
      localStorage.setItem("fatweaks_furAffinAmp_tracks", JSON.stringify(tracks));
    },
    zIndex: 99999999,
  });

  Array.from = await extractArrayFrom();

  await module.webamp.renderWhenReady(container);

  let webamp = document.querySelector("#webamp");

  container.appendChild(webamp);
  container.style.position = "fixed";

  console.log(module.webamp.store);

  function readLocalStorage() {
    let localtrx = JSON.parse(localStorage.getItem("fatweaks_furAffinAmp_tracks") ?? "[]");
    let localstor = JSON.parse(localStorage.getItem("fatweaks_furAffinAmp_state") ?? `{"windows":{}}`);
    let windowList = Object.entries(localstor.windows);

    let newTrack = false;

    if (localtrx.length > 0) {
      module.webamp.appendTracks(localtrx);
      let state = module.webamp.store.getState();
      if (audioData.length > 0) {
        module.webamp.appendTracks(audioData);
        module.webamp.store.dispatch({ type: "BUFFER_TRACK", id: state.playlist.trackOrder.length });
        newTrack = true;
      } else {
        module.webamp.store.dispatch({ type: "BUFFER_TRACK", id: state.playlist.trackOrder.indexOf(localstor.playlist.currentTrack) });
      }
    }

    if (localstor.equalizer) {
      [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000, "preamp"].forEach((key) => {
        module.webamp.store.dispatch({ type: "SET_BAND_VALUE", band: key, value: localstor.equalizer.sliders[key] });
      });
      if (!localstor.equalizer.on)
        module.webamp.store.dispatch({ type: "SET_EQ_OFF" });

      module.webamp.store.dispatch({ type: "SET_EQ_AUTO", value: localstor.equalizer.auto });
    }

    if (localstor.media) {
      module.webamp.store.dispatch({ type: "SET_VOLUME", volume: localstor.media.volume });
      module.webamp.store.dispatch({ type: "SET_BALANCE", balance: localstor.media.balance });
      if (localstor.media.timeMode == "REMAINING")
        module.webamp.store.dispatch({ type: "TOGGLE_TIME_MODE" });
      if (localstor.media.repeat)
        module.webamp.store.dispatch({ type: "TOGGLE_REPEAT" });
      if (localstor.media.shuffle)
        module.webamp.store.dispatch({ type: "TOGGLE_SHUFFLE" });
      if (!newTrack) {
        if (localstor.media.status == "PLAYING")
          module.webamp.store.dispatch({ type: "PLAY" });
        if (localstor.media.status == "PAUSED")
          module.webamp.store.dispatch({ type: "PAUSE" });
        window.addEventListener("load", () =>
          module.webamp.seekToTime(localstor.media.timeElapsed));
      }
    }

    if (localstor.doubled)
      module.webamp.store.dispatch({ type: "TOGGLE_DOUBLESIZE_MODE" });

    windowList.forEach(([k, window]) => {
      if (!window.open)
        module.webamp.store.dispatch({ type: "TOGGLE_WINDOW", windowId: k });

      if (window.canShade && window.shade)
        module.webamp.store.dispatch({ type: "TOGGLE_WINDOW_SHADE_MODE", windowId: k });

      if (window.canResize)
        module.webamp.store.dispatch({
          size: window.size,
          type: "WINDOW_SIZE_CHANGED",
          windowId: k,
        });
    })

    if (windowList.length > 0)
      module.webamp.store.dispatch({
        absolute: true,
        positions: Object.fromEntries(windowList.map(([k, { position }]) => ([k, position]))),
        type: "UPDATE_WINDOW_POSITIONS",
      });
  }
  readLocalStorage();

  window.addEventListener("unload", (ev) => {
    let state = module.webamp.store.getState();

    let obj = {
      doubled: state.display.doubled,
      windows: state.windows.genWindows,
      media: state.media,
      equalizer: state.equalizer,
      playlist: state.playlist
    };

    localStorage.setItem("fatweaks_furAffinAmp_state", JSON.stringify(obj));

    return false;
  });
}

loadWebamp();