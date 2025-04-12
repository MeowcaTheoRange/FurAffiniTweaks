const settings = __fatweaks.reference("settings");

settings.registerSelfAsToggleable({
  name: "Ability to directly unwatch users with Disable Access to Minors enabled",
  namespace: "unwatchDATM",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Allow nuking all messages",
  namespace: "nukeAllMessages",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "External links open in a new tab",
  namespace: "externalTargetBlank",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Fix Overflowing Dropdowns",
  namespace: "fixOverflowingDropdowns",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Live Notification Status",
  namespace: "liveStatus",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Merge Mobile Bars",
  namespace: "mergeMobileBars",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No BBCode Colors",
  namespace: "noBBCodeColor",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No Gallery Preview",
  namespace: "noGalleryPreview",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No More News",
  namespace: "noMoreNews",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Notification Status in Tab Text",
  namespace: "tabStatus",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Overlay System Messages over previous page",
  namespace: "systemMessageOverlay",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Cookie Popup",
  namespace: "removeCookiePopup",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Footer Links",
  namespace: "removeFooterLinks",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Site Banner",
  namespace: "removeSiteBanner",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Topbar \"Support\" dropdown",
  namespace: "removeTopbarSupport",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Topbar FA+ and Shop buttons",
  namespace: "removeTopbarTransactions",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Section buttons in headers on mobile",
  namespace: "mobileFixMessagesButtons",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Show Me The Tags",
  namespace: "showMeTheTags",
  defaultValue: false
});