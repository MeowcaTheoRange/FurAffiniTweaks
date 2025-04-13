let usernameBlockSymbols = document.querySelectorAll(".c-usernameBlock__symbol");

usernameBlockSymbols.forEach((symbolElement) => {
  let symbol = symbolElement.textContent;
  symbolElement.style.fontSize = "0.6rem";
  symbolElement.style.padding = "0.25rem 0.4rem";
  symbolElement.style.marginRight = "0.5rem";
  symbolElement.style.backgroundColor = "#353b45";
  symbolElement.style.verticalAlign = "10%";
  switch (symbol) {
    case "~":
      symbolElement.textContent = "Member";
      break;
    case "@":
      symbolElement.textContent = "Administrator";
      break;
    case "-":
      symbolElement.textContent = "Banned";
      break;
    case "!":
      symbolElement.textContent = "Suspended";
      break;
    case "∞":
      symbolElement.textContent = "R.I.P.";
      break;
  }
});