var automatic = {
  "ON_timer": null,
  "OFF_timer": null,
  "run": function () {
    if (config.automatic.mode) {
      automatic.set_ON_timer();
      automatic.set_OFF_timer();
    }
  },
  "set_ON_timer": function () {
    var date = new Date();
    var H = config.automatic.on.split(':')[0];
    var M = config.automatic.on.split(':')[1];
    var diff = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(H), Number(M), 0, 0) - date;
    if (diff < 0) diff += 86400000;
    /*  */
    if (automatic.ON_timer) window.clearTimeout(automatic.ON_timer);
    automatic.ON_timer = window.setTimeout(function () {
      if (config.automatic.mode) {
        config.addon.mode = "OFF";
        config.update("page");
      }
    }, diff);
  },
  "set_OFF_timer": function () {
    var date = new Date();
    var H = config.automatic.off.split(':')[0];
    var M = config.automatic.off.split(':')[1];
    var diff = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(H), Number(M), 0, 0) - date;
    if (diff < 0) diff += 86400000;
    /*  */
    if (automatic.OFF_timer) window.clearTimeout(automatic.OFF_timer);
    automatic.OFF_timer = window.setTimeout(function () {
      if (config.automatic.mode) {
        config.addon.mode = "ON";
        config.update("page");
      }
    }, diff);
  }
};

config.update = function (n, o) {
  automatic.run();
  app.icon(config.addon.mode);
  /*  */
  if (n) {
    app.addon.send(n + ":storagedata", {
      "hue": config.addon.hue,
      "mode": config.addon.mode,
      "sepia": config.addon.sepia,
      "frame": config.addon.frame,
      "hasblack": config.addon.hasblack,
      "bodydark": config.addon.bodydark,
      "contrast": config.addon.contrast,
      "addcombo": config.hotkey.addcombo,
      "whitelist": config.whitelist.array,
      "grayscale": config.addon.grayscale,
      "modecombo": config.hotkey.modecombo,
      "brightness": config.addon.brightness,
      "removecombo": config.hotkey.removecombo,
      "backgroundimage": config.addon.hasbackgroundimage,
      "backgroundcolor": config.addon.hasbackgroundcolor
    }, (o ? o.tabId : null));
    /*  */
    if (n === "page") config.update("options", null);
  }
};

app.Hotkey(function (e) {
  if (e === "_add" && config.hotkey.add) config.whitelist.add();
  else if (e === "_remove" && config.hotkey.remove) config.whitelist.remove();
  else if (e === "_mode" && config.hotkey.mode) {
    config.addon.mode = (config.addon.mode === "ON") ? "OFF" : "ON";
    config.update("page");
  }
  /*  */
  config.update("popup");
});

app.addon.receive("popup:storePopupData", function (data) {
  config.addon.brightness = data.brightness;
  config.addon.grayscale = data.grayscale;
  config.addon.contrast = data.contrast;
  config.addon.sepia = data.sepia;
  config.addon.mode = data.mode;
  config.addon.hue = data.hue;
  config.update("page");
});

app.addon.receive("options:storeOptionsData", function (data) {
  config.whitelist.array = data.whiteList;
  config.update("page");
});

app.addon.receive("options:changed", function (o) {
  config.set(o.pref, o.value);
  app.addon.send("options:set", {"pref": o.pref, "value": config.get(o.pref)});
  config.update("page");
});

app.addon.receive("popup:options", app.tab.openOptions);
app.tab.onCreated(function (e) {config.update("page", e)});
app.tab.onUpdated(function (e) {config.update("page", e)});
app.addon.receive("popup:add-whitelist", config.whitelist.add);
app.addon.receive("popup:remove-whitelist", config.whitelist.remove);
app.addon.receive("popup:load", function () {config.update("popup")});
app.addon.receive("page:load", function (e) {config.update("page", e)});
app.addon.receive("options:load", function () {config.update("options")});
app.addon.receive("popup:test", function () {app.tab.open(config.test.page)});
app.addon.receive("popup:support", function () {app.tab.open(app.homepage())});
app.addon.receive("popup:donation", function () {app.tab.open(app.homepage() + "?reason=support")});
app.addon.receive("options:get", function (pref) {app.addon.send("options:set", {"pref": pref, "value": config.get(pref)})});

window.setTimeout(config.update, 300);
