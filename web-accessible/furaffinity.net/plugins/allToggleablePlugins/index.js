const settings = __fatweaks.reference("settings");

settings.registerSelfAsToggleable({
  name: "External target=\"_blank\"",
  shortDescription: "Make external (non-FurAffinity) links open in a new tab",
  authors: ["MeowcaTheoRange"],
  namespace: "externalTargetBlank",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Fix Overflowing Dropdowns",
  shortDescription: "Makes all topbar dropdowns scroll when they're bigger than the screen",
  authors: ["MeowcaTheoRange"],
  namespace: "fixOverflowingDropdowns",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Fix Section Buttons",
  shortDescription: "Keeps the buttons in sections in the header on mobile",
  authors: ["MeowcaTheoRange"],
  namespace: "mobileFixMessagesButtons",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Live Status",
  shortDescription: "Updates the top-corner notification status every so often",
  authors: ["MeowcaTheoRange"],
  namespace: "liveStatus",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Merge Mobile Bars",
  shortDescription: "Merges the two topbars on mobile to become one unified topbar, similar to desktop",
  authors: ["MeowcaTheoRange"],
  namespace: "mergeMobileBars",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No BBCode Colors",
  shortDescription: "Removes color from BBCode elements, like [color], [a], and [h1-6]",
  authors: ["MeowcaTheoRange"],
  namespace: "noBBCodeColor",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No Gallery Preview",
  shortDescription: "Removes the \"preview\" part of a userpage's Gallery and Favourites section, opting for a more traditional display instead",
  authors: ["MeowcaTheoRange"],
  namespace: "noGalleryPreview",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "No More News",
  shortDescription: "Removes any news below the topbar",
  authors: ["MeowcaTheoRange"],
  namespace: "noMoreNews",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Nuke All Messages",
  shortDescription: "Allow nuking all messages in the Other Messages menu",
  authors: ["MeowcaTheoRange"],
  namespace: "nukeAllMessages",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Remove Cookie Popup",
  shortDescription: "Removes the cookie popup at the bottom of the site",
  authors: ["MeowcaTheoRange"],
  namespace: "removeCookiePopup",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Footer Links",
  shortDescription: "Removes the links in the footer of the site",
  authors: ["MeowcaTheoRange"],
  namespace: "removeFooterLinks",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Site Banner",
  shortDescription: "Removes the banner at the top of the site",
  authors: ["MeowcaTheoRange"],
  namespace: "removeSiteBanner",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Topbar Support",
  shortDescription: "Removes the \"Support\" dropdown from the topbar",
  authors: ["MeowcaTheoRange"],
  namespace: "removeTopbarSupport",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Remove Topbar Transactions",
  shortDescription: "Removes the FA+ and Shop buttons from the topbar",
  authors: ["MeowcaTheoRange"],
  namespace: "removeTopbarTransactions",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Show Me The Tags",
  shortDescription: "Puts tags on submission indexes",
  authors: ["MeowcaTheoRange"],
  namespace: "showMeTheTags",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "System Message Overlay",
  shortDescription: "Overlay System Messages over the site, instead of going to another page for it",
  authors: ["MeowcaTheoRange"],
  namespace: "systemMessageOverlay",
  defaultValue: false
});

settings.registerSelfAsToggleable({
  name: "Tab Status",
  shortDescription: "Brings the top-corner notification status to the tab's title",
  authors: ["MeowcaTheoRange"],
  namespace: "tabStatus",
  defaultValue: true
});

settings.registerSelfAsToggleable({
  name: "Unwatch DATM",
  shortDescription: "Adds the ability to directly unwatch users with Disable Access to Minors enabled",
  authors: ["MeowcaTheoRange"],
  namespace: "unwatchDATM",
  defaultValue: false
});