const fatweaks = window.__fatweaks = {};

fatweaks.reference = function (id, required) {
  if (fatweaks.modules[id] == null)
    if (required) throw "Module not loaded";
    else return null;
  return fatweaks.modules[id];
};

fatweaks.namespace = function (id) {
  if (fatweaks.modules[id]) return "Module already loaded or namespace taken";
  fatweaks.modules[id] = {};
  return fatweaks.modules[id];
}

fatweaks.modules = {};