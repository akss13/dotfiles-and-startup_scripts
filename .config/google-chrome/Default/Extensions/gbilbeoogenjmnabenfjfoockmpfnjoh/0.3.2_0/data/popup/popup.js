var config = {
  "handle": {},
  "global": {
    "hue": 360,
    "combo": '',
    "mode": "ON",
    "sepia" : 100,
    "grayscale" : 0,
    "contrast" : 100,
    "brightness": 100,
  },
  "store": function () {
    background.send("popup:storePopupData", {
      "hue": config.global.hue,
      "mode": config.global.mode,
      "sepia": config.global.sepia,
      "contrast": config.global.contrast,
      "grayscale": config.global.grayscale,
      "brightness": config.global.brightness,
    });
  },
  "toggle": function (flag) {
    var lightson = document.getElementById("lights-on-footer");
    var lightsoff = document.getElementById("lights-off-footer");
    /*  */
    if (flag === "ON") {
      var hueslidervalue = document.getElementById("hue-slider-value");
      var hueslider = document.getElementById("hue-slider");
      lightsoff.setAttribute("active", "false");
      lightson.setAttribute("active", "true");
      hueslidervalue.style.opacity = "0.5";
      hueslider.style.opacity = "0.5";
      hueslider.disabled = true;
    } else {
      var hueslidervalue = document.getElementById("hue-slider-value");
      var hueslider = document.getElementById("hue-slider");
      lightson.setAttribute("active", "false");
      lightsoff.setAttribute("active", "true");
      hueslidervalue.style.opacity = "1.0";
      hueslider.style.opacity = "1.0";
      hueslider.disabled = false;
    }
  },
  "add": {
    "listeners": function () {
      var options = document.getElementById("options");
      var support = document.getElementById("support");
      var donation = document.getElementById("donation");
      var lightson = document.getElementById("lights-on");
      var lightsoff = document.getElementById("lights-off");
      var hueslider = document.getElementById("hue-slider");
      var sepiaslider = document.getElementById("sepia-slider");
      var addwhitelist = document.getElementById("add-whitelist");
      var dimmerslider = document.getElementById("dimmer-slider");
      var contrastslider = document.getElementById("contrast-slider");
      var grayscaleslider = document.getElementById("grayscale-slider");
      var removewhitelist = document.getElementById("remove-whitelist");
      /*  */
      config.handle.click = function (e) {
        config.global.mode = e.target.getAttribute("type");
        config.toggle(config.global.mode);
        config.store();
      };
      /*  */
      config.handle.change = function (e) {
        var id = e.target.getAttribute("id");
        if (id.indexOf("hue") !== -1) config.global.hue = e.target.value;
        if (id.indexOf("sepia") !== -1) config.global.sepia = e.target.value;
        if (id.indexOf("dimmer") !== -1) config.global.brightness = e.target.value;
        if (id.indexOf("contrast") !== -1) config.global.contrast = e.target.value;
        if (id.indexOf("grayscale") !== -1) config.global.grayscale = e.target.value;
        config.toggle(config.global.mode);
        config.store();
      };
      /*  */
      background.receive("popup:storagedata", function (data) {
        config.global.hue = data.hue;
        config.global.mode = data.mode;
        config.global.sepia = data.sepia;
        config.global.combo = data.modecombo;
        config.global.contrast = data.contrast;
        config.global.grayscale = data.grayscale;
        config.global.brightness = data.brightness;
        /*  */
        config.toggle(config.global.mode);
        hueslider.value = config.global.hue;
        donation.textContent = "Make a donation";
        support.textContent = "Open support page";
        sepiaslider.value = config.global.sepia;
        contrastslider.value = config.global.contrast;
        dimmerslider.value = config.global.brightness;
        grayscaleslider.value = config.global.grayscale;
        test.textContent = "Test and calibrate dark mode";
        addwhitelist.textContent = "Add current page to whitelist (" + data.addcombo + ')';
        removewhitelist.textContent = "Remove current page from whitelist (" + data.removecombo + ')';
        options.textContent = "Open options page (whitelist has " + data.whitelist.length + " items)";
      });
      /*  */
      lightson.addEventListener("click", config.handle.click);
      lightsoff.addEventListener("click", config.handle.click);
      hueslider.addEventListener("input", config.handle.change);
      sepiaslider.addEventListener("input", config.handle.change);
      dimmerslider.addEventListener("input", config.handle.change);
      contrastslider.addEventListener("input", config.handle.change);
      grayscaleslider.addEventListener("input", config.handle.change);
      test.addEventListener("click", function () {background.send("popup:test")});
      options.addEventListener("click", function () {background.send("popup:options")});
      support.addEventListener("click", function () {background.send("popup:support")});
      donation.addEventListener("click", function () {background.send("popup:donation")});
      addwhitelist.addEventListener("click", function () {background.send("popup:add-whitelist")});
      removewhitelist.addEventListener("click", function () {background.send("popup:remove-whitelist")});
    }
  }
};

var load = function () {
  config.add.listeners();
  background.send("popup:load");
  window.removeEventListener("load", load, false);
};

window.addEventListener("load", load, false);
