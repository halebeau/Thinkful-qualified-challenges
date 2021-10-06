const fs = require("fs");
const path = require("path");
const prefix = path.resolve(`${process.env.SOLUTION_PATH || ""}`, "src");
module.exports = (kind, name) =>
  fs.readFileSync(path.join(prefix, kind, `${name}.sql`), "utf-8");
