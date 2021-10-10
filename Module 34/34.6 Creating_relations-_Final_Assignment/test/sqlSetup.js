const fs = require("fs");
const path = require("path");
module.exports = (name) =>
  fs.readFileSync(
    path.join(process.env.SOLUTION_PATH || "", "setup", `${name}.sql`),
    "utf-8"
  );
