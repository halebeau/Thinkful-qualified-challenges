const fs = require("fs");
const path = require("path");
const prefix = path.resolve(`${process.env.SOLUTION_PATH || ""}`, "src");
module.exports = (name) =>
  fs.readFileSync(path.join(prefix, `${name}.sql`), "utf-8");
