"use strict";
let fs = require("fs");
const childProcess = require("child_process");
let Backup = require("./backup.js");

class Run {
  execute(configFile, key) {
    if (!configFile || !key) {
      throw "supply config and key";
    }

    let config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    let backup = new Backup(key);

    while(true) {
      for(let from of config.from) {
        for(let to of config.to) {
          backup.run(from, to);
        }
      }
      console.log("\nDone, " + new Date().toISOString() + "\n");
      childProcess.execSync("df -h", {stdio:[0,1,2]});
// todo, show remaining number of API calls allowed

      console.log("\nSleeping 24h");
      childProcess.execSync("sleep 24h", {stdio:[0,1,2]});
  }
  }
}

new Run().execute(process.argv[2], process.argv[3]);