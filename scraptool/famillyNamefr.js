var request = require('request');
var jsdom = require('jsdom');


var letters = "qertyuiopasdfghjklzxcvbnm";
letters = letters.split("");

var INDEX = 1;
function getNextPage() {
  if (!letters.length) {
    return;
  }
  var url = 
  request("http://www.nom-famille.com/commencant-par-" +  letters[0]+"/tous-" + INDEX + ".html", function(e,r, body) {
  jsdom.env(
    body,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      var items = window.$('.pagecentrale a.nom');
      if (items && items.length) {
        INDEX++;
      }
      else {
        letters.shift();
        INDEX = 1;
      }
      for (var i = 0;items && i < items.length; ++i) {
        console.log(items[i].innerHTML);
      }
      getNextPage();
    }
);
  })
}

getNextPage();