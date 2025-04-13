const module = __fatweaks.namespace("settings");

module.settingNamespaces = {
  loader: {
    name: "Toggle Plugins",
    settings: {}
  }
};

module.getNSes = function () {
  return Object.keys(module.settingNamespaces);
}
module.getNSName = function (namespace) {
  return module.settingNamespaces[namespace].name;
}
module.getNSSettings = function (namespace) {
  return Object.keys(module.settingNamespaces[namespace].settings);
}
module.getNSSetting = function (namespace, id) {
  return module.settingNamespaces[namespace].settings[id];
}

module.setNSSetting = function (namespace, id, value) {
  module.settingNamespaces[namespace].settings[id].currentValue = value;
  console.log(module.getNSSetting(namespace, id));
}

module.saveNSes = function () {
  module.getNSes().forEach(namespace => {
    module.getNSSettings(namespace).forEach(setting => {
      let value = module.getNSSetting(namespace, setting);
      let lsnsname = `fatweaks_settings_${namespace}_${setting}`;
      localStorage.setItem(lsnsname, value.currentValue);
    });
  });
}

module.register = function ({
  name,
  namespace,
}) {
  let template = {
    name,
    settings: {}
  };

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

  module.settingNamespaces[namespace] = template;

  return template;
}

module.registerSelfAsToggleable = function ({
  name,
  namespace,
  shortDescription,
  authors,
  defaultValue = false
}) {
  let lsnsname = `fatweaks_settings_loader_${namespace}`;
  let currentValue = localStorage.getItem(lsnsname);
  if (currentValue == null) {
    localStorage.setItem(lsnsname, defaultValue);
    currentValue = defaultValue;
  } else {
    currentValue = currentValue == "true";
  }

  module.settingNamespaces.loader.settings[namespace] = {
    type: "boolean",
    name,
    description: shortDescription,
    authors,
    currentValue,
    defaultValue
  };
}