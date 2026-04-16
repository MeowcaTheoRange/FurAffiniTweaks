/**
 * @typedef {Object} Module
 */

/** 
 * Container for all FATweaks modules.
 * @global
 */
const fatweaks = window.__fatweaks = class FATweaks_Module {
  static modules = {};
  static mySrc = import.meta.url;

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
  /**
   * Returns a URL to an asset fo
   * if (example) example.transformSiteToDuck();
   */
  static reference (id, required = true) {
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
  static namespace (id) {
    if (fatweaks.modules[id]) return "Module already loaded or namespace taken";
    fatweaks.modules[id] = {};
    return fatweaks.modules[id];
  }
  /**
   * Returns a URL to an asset found under a namespace.
   * @param {string} namespace - The namespace where the asset is.
   * @param {string} pathname - The path of the asset within the namespace.
   * @example
   * let duck = __fatweaks.assetURL("example", "duck.jpg");
   * document.body.innerHTML = `<img src="${duck}" />`;
   * @returns {`/web_accessible/furaffinity.net/plugins/${namespace}/${pathname}`}
   */
  static assetURL (namespace, pathname) {
    return new URL(`/web-accessible/furaffinity.net/plugins/${namespace}/${pathname}`, mySrc).toString();
  }
}