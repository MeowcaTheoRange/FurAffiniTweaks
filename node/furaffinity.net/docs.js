const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const { globSync } = require("glob")
const path = require("path");

let files = globSync("web-accessible/furaffinity.net/plugins/**/*.js");

files.map(async (file) => {
  const output = await jsdoc2md.render({ files: file });
  if (output.length < 1) return;
  fs.writeFileSync(`docs/plugins/api/${path.basename(path.dirname(file)).replace(/\\|\/index.js/g, "")}.md`, output);
});