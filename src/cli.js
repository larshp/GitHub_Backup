"use strict";
let fs = require("fs");
let Backup = require("./backup.js");

class Run {
  execute(configFile, key) {
    if (!configFile || !key) {
      throw "supply config and key";
    }

    let config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    let backup = new Backup(key);

    for(let from of config.from) {
      for(let to of config.to) {
        backup.run(from, to);
      }
    }
  }
}

new Run().execute(process.argv[2], process.argv[3]);