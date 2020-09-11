"use strict";
const request = require("sync-request");

module.exports = class GitHub {
  constructor(key) {
    this.key = key;
  }

  _fetch(path) {
    const url = "https://api.github.com" + path;
    console.log(url);
    let buffer = request("GET", url,
      {"headers": {"user-agent": "larshp/github_backup",
        "Authorization": "token " + this.key
      }});
    return JSON.parse(buffer.getBody().toString());
  }

  listRepositories(user) {
    let list = [];
    let page = 1;

    while (true) {
      const fetched = this._fetch(user + "/repos?page=" + page + "&per_page=100");
      page = page + 1;
      list = list.concat(fetched);
      if (fetched.length < 100) {
        break;
      }
    }

    return list;
  }

  /* push access required
  getTraffic(full_name) {
    return {
      referrers: this._fetch("/repos/" + full_name + "/traffic/popular/referrers"),
      paths: this._fetch("/repos/" + full_name + "/traffic/popular/paths"),
      views: this._fetch("/repos/" + full_name + "/traffic/views"),
      clones: this._fetch("/repos/" + full_name + "/traffic/clones"),
    }
  }
  */
}