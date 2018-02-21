"use strict";
const request = require("sync-request");

module.exports = class GitHub {
  constructor(key) {
    this.key = key;
  }

  listRepositories(user) {
    const url = "https://api.github.com" + user + "/repos?per_page=100";
    let buffer = request("GET", url,
      {"headers": {"user-agent": "larshp/github_backup",
        "Authorization": "token " + this.key
      }});
    return JSON.parse(buffer.getBody().toString());
  }
}