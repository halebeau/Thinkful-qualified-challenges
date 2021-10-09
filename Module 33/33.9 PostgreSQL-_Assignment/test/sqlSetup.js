const fs = require("fs");
const path = require("path");
module.exports = (name) =>
  fs.readFileSync(path.join("setup", `${name}.sql`), "utf-8");
