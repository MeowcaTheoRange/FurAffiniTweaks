const settings = __fatweaks.reference("settings");

let mySettings = settings.register({
  name: "Toggle Plugins",
  namespace: "loader"
})

mySettings.boolean({
  name: "Does Anyone Know What Those Symbols Next To People's Usernames Mean?!",
  shortDescription: "Replace the ~@-!∞ symbols next to usernames with something more descriptive",
  authors: ["MeowcaTheoRange"],
  id: "doesAnyoneKnowWhatThoseSymbolsNextToPeoplesUsernamesMean",
  defaultValue: false
});

mySettings.boolean({
  name: "External target=\"_blank\"",
  shortDescription: "Make external (non-FurAffinity) links open in a new tab",
  authors: ["MeowcaTheoRange"],
  id: "externalTargetBlank",
  defaultValue: true
});

mySettings.boolean({
  name: "Fix Overflowing Dropdowns",
  shortDescription: "Makes all topbar dropdowns scroll when they're bigger than the screen",
  authors: ["MeowcaTheoRange"],
  id: "fixOverflowingDropdowns",
  defaultValue: true
});

mySettings.boolean({
  name: "Fix Section Buttons",
  shortDescription: "Keeps the buttons in sections in the header on mobile",
  authors: ["MeowcaTheoRange"],
  id: "mobileFixMessagesButtons",
  defaultValue: false
});

mySettings.boolean({
  name: "\"I don't care if you're an admin! You're fucking up my schema!\"",
  shortDescription: "Removes the blue tint from admin comments.",
  authors: ["MeowcaTheoRange"],
  id: "iDontCareIfYoureAnAdminYoureFuckingUpMySchema",
  defaultValue: false
});

mySettings.boolean({
  name: "Live Status",
  shortDescription: "Updates the top-corner notification status every so often",
  authors: ["MeowcaTheoRange"],
  id: "liveStatus",
  defaultValue: false
});

mySettings.boolean({
  name: "Live Status Alert",
  shortDescription: "Blip and flash for Live Status. Also an example of how plugins can extend off of each other with the new event system.",
  authors: ["MeowcaTheoRange"],
  id: "liveStatusAlert",
  defaultValue: false
});

mySettings.boolean({
  name: "Merge Mobile Bars",
  shortDescription: "Merges the two topbars on mobile to become one unified topbar, similar to desktop",
  authors: ["MeowcaTheoRange"],
  id: "mergeMobileBars",
  defaultValue: false
});

mySettings.boolean({
  name: "No BBCode Colors",
  shortDescription: "Removes color from BBCode elements, like [color], [a], and [h1-6]",
  authors: ["MeowcaTheoRange"],
  id: "noBBCodeColor",
  defaultValue: false
});

mySettings.boolean({
  name: "No Gallery Preview",
  shortDescription: "Removes the \"preview\" part of a userpage's Gallery and Favourites section, opting for a more traditional display instead",
  authors: ["MeowcaTheoRange"],
  id: "noGalleryPreview",
  defaultValue: false
});

mySettings.boolean({
  name: "No More News",
  shortDescription: "Removes any news below the topbar",
  authors: ["MeowcaTheoRange"],
  id: "noMoreNews",
  defaultValue: false
});

mySettings.boolean({
  name: "Nuke All Messages",
  shortDescription: "Allow nuking all messages in the Other Messages menu",
  authors: ["MeowcaTheoRange"],
  id: "nukeAllMessages",
  defaultValue: true
});

mySettings.boolean({
  name: "Remove Cookie Popup",
  shortDescription: "Removes the cookie popup at the bottom of the site",
  authors: ["MeowcaTheoRange"],
  id: "removeCookiePopup",
  defaultValue: false
});

mySettings.boolean({
  name: "Remove Footer Links",
  shortDescription: "Removes the links in the footer of the site",
  authors: ["MeowcaTheoRange"],
  id: "removeFooterLinks",
  defaultValue: false
});

mySettings.boolean({
  name: "Remove Site Banner",
  shortDescription: "Removes the banner at the top of the site",
  authors: ["MeowcaTheoRange"],
  id: "removeSiteBanner",
  defaultValue: false
});

mySettings.boolean({
  name: "Remove Topbar Support",
  shortDescription: "Removes the \"Support\" dropdown from the topbar",
  authors: ["MeowcaTheoRange"],
  id: "removeTopbarSupport",
  defaultValue: false
});

mySettings.boolean({
  name: "Remove Topbar Transactions",
  shortDescription: "Removes the FA+ and Shop buttons from the topbar",
  authors: ["MeowcaTheoRange"],
  id: "removeTopbarTransactions",
  defaultValue: false
});

mySettings.boolean({
  name: "Resize Textareas",
  shortDescription: "Makes any textareas on the site vertically resizable.",
  authors: ["MeowcaTheoRange"],
  id: "resizeTextareaBoxes",
  defaultValue: true
});

mySettings.boolean({
  name: "Show Me The Tags",
  shortDescription: "Puts tags on submission indexes",
  authors: ["MeowcaTheoRange"],
  id: "showMeTheTags",
  defaultValue: false
});

mySettings.boolean({
  name: "System Message Overlay",
  shortDescription: "Overlay System Messages over the site, instead of going to another page for it",
  authors: ["MeowcaTheoRange"],
  id: "systemMessageOverlay",
  defaultValue: false
});

mySettings.boolean({
  name: "Tab Status",
  shortDescription: "Brings the top-corner notification status to the tab's title",
  authors: ["MeowcaTheoRange"],
  id: "tabStatus",
  defaultValue: true
});

mySettings.boolean({
  name: "Unwatch DATM",
  shortDescription: "Adds the ability to directly unwatch users with Disable Access to Minors enabled",
  authors: ["MeowcaTheoRange"],
  id: "unwatchDATM",
  defaultValue: false
});

mySettings.boolean({
  name: "Unaccountability",
  shortDescription: "Removes the aliases arrow next to users with Display Names enabled",
  authors: ["MeowcaTheoRange"],
  id: "unaccountability",
  defaultValue: false
});

mySettings.boolean({
  name: "UwU",
  shortDescription: "Rewrites words to sound smol and adorbs~!",
  authors: ["Bexxi"],
  id: "uwu",
  defaultValue: false
});