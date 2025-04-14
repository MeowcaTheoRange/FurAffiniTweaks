/**
 * @typedef {Object} Module
 */

/** 
 * Container for all FATweaks modules.
 * @alias __fatweaks
 */
const fatweaks = window.__fatweaks = {};

/**
 * References a plugin as a module in order to use its resources.
 * @param id - The namespace of the plugin you wish to reference.
 * @param required - If this function should throw an error when the plugin is not found.
 * @example 
 * const example = __fatweaks.reference("example");
 * 
 * // quack or else
 * example.transformSiteToDuck();
 * @example
 * const example = __fatweaks.reference("example", false);
 * 
 * // quack if user wants me to
 * if (example) example.transformSiteToDuck();
 */
fatweaks.reference = function (id, required = true) {
  if (fatweaks.modules[id] == null)
    if (required) throw "Module not loaded";
    else return null;
  return fatweaks.modules[id];
};

/**
 * Modulizes a plugin, so its resources can be used by other plugins.
 * @param id - The namespace of your plugin.
 * @example
 * const module = __fatweaks.namespace("example");
 * 
 * module.transformSiteToDuck = function() {...};
 */
fatweaks.namespace = function (id) {
  if (fatweaks.modules[id]) return "Module already loaded or namespace taken";
  fatweaks.modules[id] = {};
  return fatweaks.modules[id];
}

let mySrc = import.meta.url;
/**
 * Returns a URL to an asset found under a namespace.
 * @param namespace - The namespace where the asset is.
 * @param pathname - The path of the asset within the namespace.
 * @example
 * let duck = __fatweaks.assetURL("example", "duck.jpg");
 * document.body.innerHTML = `<img src="${duck}" />`;
 */
fatweaks.assetURL = function (namespace, pathname) {
  let srcURL = new URL(mySrc);
  return `${srcURL.origin}/web-accessible/furaffinity.net/plugins/${namespace}/${pathname}`;
}

/**
 * All registered modules.
 */
fatweaks.modules = {};