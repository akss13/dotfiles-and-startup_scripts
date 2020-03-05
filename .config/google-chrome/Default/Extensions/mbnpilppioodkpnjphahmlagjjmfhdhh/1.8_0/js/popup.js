
startTheExtensions();

function startTheExtensions(){
    var currentUrl;
    document.addEventListener('DOMContentLoaded', function() {
        
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            currentUrl = tabs[0].url;
        });

        $('.radio').click(function() {
            var value = $("input[type='radio']:checked").val();
            $("#download").attr('level', value);
        });

        $("#open").click(function(event) {
            goToDownload();
    });
        $("#download").click(function(event) {
                if (navigator.onLine) {
                    reqUrl="http://care.srmuniv.ac.in";
                    if(currentUrl.indexOf(reqUrl) !== -1 && currentUrl.indexOf("solve/") !== -1){
                        $("#download").html('Starting Download');
                        setTimeout(function() {
                            $("#download").html('<i class="now-ui-icons loader_gear spin"></i>');
                        }, 1000);
                        // setTimeout(function (){
                        $("#buttons").css('display', 'none');
                        $("#process").css('display', 'block');
                        // }, 1000);
                        l = $("#download").attr('level');
                        $("#download").attr('disabled', '');
                        startfun(l);
                    }else{
                        $("#download").html('Open your 1st question');
                    }
                } else {
                    $("#download").html('Internet Not Connected!');
                }
        });
    });
};
                       
  function change_url(tab, url) {
    chrome.tabs.update(tab.id, {url});
    return new Promise(resolve => {
      chrome.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(onUpdated);
          resolve();
        }
      });
    });
  }
  function goToDownload() {
    chrome.downloads.showDefaultFolder()
  }


async function startfun(level) { 
  chrome.tabs.getSelected(null,async function(tab)
  {    var counter=1;
      var link=tab.url.slice(0,tab.url.length-5);
      var i;
      const c_tab=tab;
      for (j=11;j<21;j++)
      {
      for (i=11;i<21;i++)
      {
          await change_url(c_tab, link+j+level+ i);
          $(".progress-bar").css('width', counter + '%');
          $(".progress-value").text(counter + '%');
          chrome.tabs.executeScript(tab.id, {file: "js/cs.js"});
          await wait_for_response();
          counter++;
      }
    }

    $("#downloadcomplete").css('display', 'block');
    $("#imgg").css('display', 'none');
    $("#download").removeAttr('disabled', '');
    $("#download").css('display', 'none');
    $(".footer").css('margin-top', '50px');

  });
}
 function wait_for_response() {
     return new Promise(resolve => {
         chrome.runtime.onMessage.addListener(
             async function (request, sender, sendResponse) {
                 if (request == "download") {
                     await d_start();
                     resolve();
                 } else {
                     resolve();
                 }
                 sendResponse("got response");
             }
         )
     });
 }

function d_start() {
    return new Promise(resolve => {
        chrome.downloads.onCreated.addListener(function (item) {
            if (item.state == "in_progress") {
                clearTimeout(checktimer);
                 resolve();
            }
        });
        checktimer = setTimeout(async ()=>{
                resolve();
        },3000);
    });
}
