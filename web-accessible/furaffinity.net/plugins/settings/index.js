/** @import { Module } from "../modules/index.js" */

/**
 * @typedef {Object} SettingsModule.Setting
 * @template T
 * @property {string} type
 * @property {string} name
 * @property {string} description
 * @property {T} currentValue
 * @property {T} defaultValue
 * @property {string[]} authors
 */

/**
 * The system that FurAffiniTweaks uses to manage plugin settings. This is one of the base modules that can't be unloaded.
 * Go to `.register()` if you'd like to find out how to give your plugin settings.
 * @typedef {Module} SettingsModule
 */
const module = __fatweaks.namespace("settings");

const events = __fatweaks.reference("events");

module.settingNamespaces = {
};

/**
 * Gets all the registered namespaces.
 * @alias SettingsModule.getNSes
 * @returns {string[]}
 * @example
 * const settings = __fatweaks.reference("settings");
 * 
 * // ["loader", "liveStatus", etc...]
 * console.log(settings.getNSes());
 */
module.getNSes = function () {
  return Object.keys(module.settingNamespaces);
}
/**
 * Gets the name of a registered namespace.
 * @alias SettingsModule.getNSName
 * @param {string} namespace - The registered namespace's ID.
 * @returns {string}
 * @example
 * const settings = __fatweaks.reference("settings");
 * 
 * // "Toggle Plugins"
 * console.log(settings.getNSName("loader"));
 */
module.getNSName = function (namespace) {
  return module.settingNamespaces[namespace].name;
}
/**
 * Gets the setting keys on a registered namespace.
 * @alias SettingsModule.getNSSettings
 * @param {string} namespace - The registered namespace's ID.
 * @returns {string[]}
 */
module.getNSSettings = function (namespace) {
  return Object.keys(module.settingNamespaces[namespace].settings);
}
/**
 * Gets a setting on a registered namespace.
 * @alias SettingsModule.getNSSetting
 * @param {string} namespace - The registered namespace's ID.
 * @param {string} id - The ID of the setting.
 * @returns {Setting<any>}
 * @example
 * const settings = __fatweaks.reference("settings");
 * 
 * // false
 * console.log(settings.getNSSetting("loader", "liveStatus"));
 */
module.getNSSetting = function (namespace, id) {
  return module.settingNamespaces[namespace].settings[id];
}
/**
 * Modifies the value of a setting on a registered namespace.
 * @template T
 * @alias SettingsModule.setNSSetting
 * @param {string} namespace - The registered namespace's ID.
 * @param {string} id - The ID of the setting.
 * @param {T} value - The value you want to set the setting to.
 */
module.setNSSetting = function (namespace, id, value) {
  module.settingNamespaces[namespace].settings[id].currentValue = value;
}
/**
 * Saves all settings to localStorage.
 * @alias SettingsModule.saveNSes
 */
module.saveNSes = function () {
  module.getNSes().forEach(namespace => {
    module.getNSSettings(namespace).forEach(setting => {
      let value = module.getNSSetting(namespace, setting);
      let lsnsname = `fatweaks_settings_${namespace}_${setting}`;
      localStorage.setItem(lsnsname, value.currentValue);
    });
  });
}

/**
 * Registers a namespace in the settings index.
 * @alias SettingsModule.register
 * @param {Object} obj
 * @param {string} obj.name
 * @param {string} obj.namespace
 * @fires SettingsModule.namespaceRegistered
 * @returns {RegisteredNamespace}
 * @example
 * const settings = __fatweaks.reference("settings");
 * 
 * let mySettings = settings.register({
 *   name: "TF the site into a duck",
 *   namespace: "example"
 * });
 */
module.register = function ({
  name,
  namespace,
}) {
  /**
   * @typedef {Object} SettingsModule.RegisteredNamespace
   * @param {string} name - The name of this namespace.
   * @param {Object<string, Setting<any>>} settings - The settings this namespace has.
   */
  let template = {
    name,
    settings: {}
  };

  /**
   * Defines a setting that takes a boolean as an input.
   * @alias SettingsModule.RegisteredNamespace.boolean
   * @function
   * @param {Object} obj 
   * @param {string} obj.id - The id of the setting.
   * @param {string} obj.name - The name the setting will show.
   * @param {string} obj.shortDescription - The description of what the setting does.
   * @param {string[]} obj.authors - Who made the function that the setting affects (used for plugin toggles)
   * @param {boolean} obj.defaultValue - The default value the setting will have if unset.
   * @fires SettingsModule.RegisteredNamespace.namespaceFieldRegistered
   * @returns {boolean} The current value of the setting in localStorage, or defaultValue if unset.
   * @example
   * const settings = __fatweaks.reference("settings");
   * 
   * let mySettings = settings.register({
   *   name: "TF the site into a duck",
   *   namespace: "example"
   * });
   * let shouldQuackLoudly = mySettings.boolean({
   *   id: "shouldQuackLoudly",
   *   name: "If the site should quack upon being TFed into a duck",
   *   defaultValue: true
   * });
   * 
   * // true
   * console.log(shouldQuackLoudly);
   */
  template.boolean = function ({
    id,
    name: fieldName,
    shortDescription,
    authors,
    defaultValue
  }) {
    let lsnsname = `fatweaks_settings_${namespace}_${id}`;
    let currentValue = localStorage.getItem(lsnsname);

    if (currentValue == null) {
      localStorage.setItem(lsnsname, defaultValue);
      currentValue = defaultValue;
    } else {
      currentValue = currentValue == "true";
    }

    events.pushEvent("settings", "namespaceFieldRegistered", {
      name,
      namespace,
      type: "boolean",
      id,
      fieldName,
      description: shortDescription,
      authors,
      currentValue,
      defaultValue
    });

    template.settings[id] = {
      type: "boolean",
      name: fieldName,
      description: shortDescription,
      authors,
      currentValue,
      defaultValue
    };

    return currentValue;
  };

  /**
   * Defines a setting that takes a number as an input.
   * @alias SettingsModule.RegisteredNamespace.number
   * @function
   * @param {Object} obj 
   * @param {string} obj.id - The id of the setting.
   * @param {string} obj.name - The name the setting will show.
   * @param {string} obj.shortDescription - The description of what the setting does.
   * @param {string[]} obj.authors - Who made the function that the setting affects (used for plugin toggles)
   * @param {number} obj.defaultValue - The default value the setting will have if unset.
   * @fires SettingsModule.RegisteredNamespace.namespaceFieldRegistered
   * @returns {number} The current value of the setting in localStorage, or defaultValue if unset.
   * @example
   * const settings = __fatweaks.reference("settings");
   * 
   * let mySettings = settings.register({
   *   name: "TF the site into a duck",
   *   namespace: "example"
   * });
   * let quackLoudlyVolume = mySettings.number({
   *   id: "quackLoudlyVolume",
   *   name: "How loud (in dB) the duck should quack",
   *   defaultValue: 500
   * });
   * 
   * // 500
   * console.log(quackLoudlyVolume);
   */
  template.number = function ({
    id,
    name: fieldName,
    shortDescription,
    authors,
    defaultValue
  }) {
    let lsnsname = `fatweaks_settings_${namespace}_${id}`;
    let currentValue = localStorage.getItem(lsnsname);

    if (currentValue == null) {
      localStorage.setItem(lsnsname, defaultValue);
      currentValue = defaultValue;
    } else {
      currentValue = +currentValue;
    }

    events.pushEvent("settings", "namespaceFieldRegistered", {
      name,
      namespace,
      type: "number",
      id,
      fieldName,
      description: shortDescription,
      authors,
      currentValue,
      defaultValue
    });

    template.settings[id] = {
      type: "number",
      name: fieldName,
      description: shortDescription,
      authors,
      currentValue,
      defaultValue
    };

    return currentValue;
  };

  events.pushEvent("settings", "namespaceRegistered", {
    name,
    namespace,
  });

  module.settingNamespaces[namespace] = template;

  return template;
}

/**
 * Fires when a namespace registers a setting.
 * @event SettingsModule.RegisteredNamespace.namespaceFieldRegistered
 * @type {object}
 * @property {string} name - The name that the namespace goes by in a menu.
 * @property {string} namespace - The namespace that registered.
 * @property {string} type - The type you should expect the setting to be.
 * @property {string} id - The ID of the setting.
 * @property {string} fieldName - The name that the setting goes by in a menu.
 * @property {string} description - The description of the setting.
 * @property {string[]} authors - The authors of the function that the setting controls.
 * @property {any} currentValue - The current value of the setting in localStorage, or defaultValue if unset.
 * @property {any} defaultValue - The value of the setting when unset.
 */

/**
 * Fires when a namespace registers itself to have settings.
 * @event SettingsModule.namespaceRegistered
 * @type {object}
 * @property {string} name - The name that the namespace goes by in a menu.
 * @property {string} namespace - The namespace that registered.
 */