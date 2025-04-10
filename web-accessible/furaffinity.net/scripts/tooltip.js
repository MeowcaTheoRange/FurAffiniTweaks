const fatweaks = window.__fatweaks;
fatweaks.tooltip = {};
let module = fatweaks.tooltip;

module.tooltip = document.createElement("div");
module.tooltip.id = "fourier-tooltip";
module.tooltip.style.setProperty("--opacity", "0");
module.tooltip.innerHTML = "";

window.addEventListener("mousemove", (e) => {
  module.tooltip.style.setProperty("--mx", e.clientX + "px");
  module.tooltip.style.setProperty("--my", e.clientY + "px");
})

document.body.appendChild(module.tooltip);

// -- //

module.showTooltip = function (text) {
  module.tooltip.style.setProperty("--opacity", "1");
  module.tooltip.textContent = text;
}

module.hideTooltip = function () {
  module.tooltip.style.setProperty("--opacity", "0");
  module.tooltip.innerHTML = "";
}