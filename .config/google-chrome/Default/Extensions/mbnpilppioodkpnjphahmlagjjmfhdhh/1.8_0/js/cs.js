async function start_download_routine()
{

function waitforelementxpath(xpath)
{
  return new Promise(resolve => {
  var existCondition1 = setInterval(function() {
    if (document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue!=null){
       clearInterval(existCondition1);
        resolve();
    }
   }, 100);
  });
}

await waitforelementxpath("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[3]/button[2]");
$('#mat-select-0').click();
$('#mat-option-1').click();
document.evaluate("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[3]/button[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
await waitforelementxpath("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[4]/a[1]");
if(document.evaluate("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[4]/a[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent=="RESULT - 100% ")
{
  waitforelementxpath("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[4]/a[2]");
  document.evaluate("/html/body/app-root/div/app-student-solve/div[2]/app-solve-question/div/div/div[2]/mat-card/div[4]/a[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
  chrome.runtime.sendMessage(
    "download",
    function (response) {
        // console.log(response);
    }
);
}
else
{
  chrome.runtime.sendMessage(
    "error",
    function (response) {
        // console.log(response);
    }
);
}

}
start_download_routine();
