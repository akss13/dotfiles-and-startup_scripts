var connect = function (elem, pref) {
  var att = "value";
  if (elem) {
    if (elem.type === "checkbox") att = "checked";
    if (elem.localName === "span") att = "textContent";
    if (elem.localName === "select") att = "selectedIndex";
    /*  */
    var pref = elem.getAttribute("data-pref");
    background.send("options:get", pref);
    elem.addEventListener("change", function () {background.send("options:changed", {"pref": pref, "value": this[att]})});
  }
  /*  */
  return {
    get value () {return elem[att]},
    set value (val) {
      if (elem.type === "file") return;
      elem[att] = val;
    }
  }
};

var load = function () {
  var whiteList = [];
  var fill = function (arr) {
    whiteList = arr;
    /*  */
    var count = 1;
    var table = document.getElementById('white-list-table');
    table.textContent = '';
    for (var i = arr.length - 1; i >= 0; i--) {
      var a = document.createElement('a');
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      /*  */
      td1.textContent = count;
      td1.setAttribute('type', 'number');
      td2.appendChild(a);
      a.href = arr[i];
      a.textContent = arr[i];
      a.setAttribute("target", "_blank");
      a.setAttribute("style", "text-decoration: none; color: #555");
      td2.setAttribute('type', 'item');
      td3.setAttribute('type', 'close');
      td1.setAttribute("style", "color: #555");
      td2.setAttribute("style", "color: #555");
      td3.setAttribute("style", "color: #555");
      /*  */
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      table.appendChild(tr);
      count++;
    }
  };
  /*  */
  var store = function () {
    fill(whiteList);
    background.send("options:storeOptionsData", {"whiteList": whiteList});
  };
  /*  */
  var addInputFieldItem = function (e) {
    var value = document.getElementById('input-field').value;
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (value && regexp.test(value)) {
      /*  */
      var a = document.createElement('a');
      a.href = value;
      value = a.host;
      whiteList = whiteList.filter(function (e) {return e !== value});
      whiteList.push(value);
      store();
      /*  */
      document.getElementById('input-field').value = '';
    }
  };
  /*  */
  var prefs = document.querySelectorAll("*[data-pref]");
  [].forEach.call(prefs, function (elem) {
    var pref = elem.getAttribute("data-pref");
    window[pref] = connect(elem, pref);
  });
  /*  */
  document.getElementById('white-list-table').addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() === 'td' || e.target.nodeName.toLowerCase() === 'td') {
      if (e.target.getAttribute('type') === 'close') {
        var url = e.target.parentNode.childNodes[1].textContent;
        whiteList = whiteList.filter(function (e) {return e && e !== url});
        /*  */
        store();
      }
    }
  });
  /*  */
  background.send("options:load");
  window.removeEventListener("load", load, false);
  background.receive("options:storagedata", function (o) {fill(o.whitelist)});
  document.getElementById('input-field-add').addEventListener("click", addInputFieldItem);
  document.getElementById('input-field').addEventListener('keypress', function (e) {if ((e.which || e.keyCode) === 13) addInputFieldItem(e)});
};

window.addEventListener("load", load, false);
background.receive("options:set", function (o) {if (window[o.pref]) {window[o.pref].value = o.value}});
