"use strict";
const fs = require("fs");
const fsextra = require("fs-extra");
const GitHub = require("./github.js");
const childProcess = require("child_process");

module.exports = class Backup {
  constructor(key) {
    this.github = new GitHub(key);
  }

  checkDir(to) {
    let stat = fs.lstatSync(to);
    if (!stat.isDirectory()) {
      throw "dir " + to + " does not exist";
    }
  }

  run(from, to) {
    this.checkDir(to);

    console.log("Backup: " + from + " to " + to);

    let repos = this.github.listRepositories(from);
    for(let repo of repos) {
      if(!repo.fork) {
        console.log("\t" + repo.name);
        this.runRepo(to, from, repo.name, repo.clone_url)
      }
    }
  }

  runRepo(to, from, name, git) {
    let dir = to + "github_backup" + from + "/" + name + "/" + new Date().toISOString().substr(0,7) + "/" + new Date().toISOString().substr(8,2) + "/";
    let cwd = dir + "git/";
    fsextra.ensureDirSync(cwd);
    childProcess.execSync("git clone " + git + " " + cwd, {cwd: cwd, stdio:[0,1,2]});
  }
}