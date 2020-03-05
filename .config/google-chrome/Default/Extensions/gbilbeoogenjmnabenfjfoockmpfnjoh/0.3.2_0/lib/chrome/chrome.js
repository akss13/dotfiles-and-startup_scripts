var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "openOptions": function () {chrome.runtime.openOptionsPage(function () {})},
  "onCreated": function (callback) {chrome.tabs.onCreated.addListener(function (tab) {callback({"tabId": tab.id})})},
  "onUpdated": function (callback) {chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {if (changeInfo.status) callback({"tabId": tabId})})},
  "getActive": function (callback) {
    chrome.tabs.query({"active": true}, function (tabs) {
      if (tabs && tabs.length) {
        var tab = tabs[0];
        var domain = new URL(tab.url).host;
        callback(tab, domain);
      }
    });
  }
};

chrome.runtime.onInstalled.addListener(function (e) {
  window.setTimeout(function () {
    var previous = config.welcome.open && e.previousVersion !== undefined && e.previousVersion !== app.version();
    var doupdate = previous && parseInt((Date.now() - config.welcome.lastupdate) / (24 * 3600 * 1000)) > 45;
    if (e.reason === "install" || (e.reason === "update" && doupdate)) {
      var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
      app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
      config.welcome.lastupdate = Date.now();
    }
  }, 3000);
});

app.button = (function () {
  var callback;
  chrome.browserAction.onClicked.addListener(function (tab) {if (callback) callback()});
  return {"onCommand": function (c) {callback = c}}
})();

app.Hotkey = function (callback) {
  chrome.commands.onCommand.addListener(function (e) {
    if (e === "toggle-night-mode") callback("_mode");
    else if (e === "add-to-whitelist") callback("_add");
    else if (e === "remove-from-whitelist") callback("_remove");
  });
};

app.icon = function (state) {
  chrome.browserAction.setIcon({
    "path": {
      "16": "../../data/icons/" + (state ? state + '/' : '') + "16.png",
      "32": "../../data/icons/" + (state ? state + '/' : '') + "32.png",
      "48": "../../data/icons/" + (state ? state + '/' : '') + "48.png",
      "64": "../../data/icons/" + (state ? state + '/' : '') + "64.png"
    }
  });
};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 0);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.addon = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.method === id) {
          var a = request.data || {};
          if (sender.tab) {
            a["top"] = sender.tab.url;
            a["tabId"] = sender.tab.id;
          }
          tmp[id](a);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"method": id, "data": data});
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          var cond1 = tab.url.indexOf("http") === 0;
          var cond2 = tab.url.indexOf("/newtab/") !== -1;
          var cond3 = tab.url.indexOf("about:blank") === 0;
          if (cond1 || cond2 || cond3) {
            if (!tabId || (tabId && tab.id === tabId)) {
              var a = data || {};
              a["top"] = tab.url;
              a["tabId"] = tab.id;
              chrome.tabs.sendMessage(tab.id, {"method": id, "data": a});
            }
          }
        });
      });
    }
  }
})();
